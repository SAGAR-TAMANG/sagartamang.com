"use client"

import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react"

interface HoverLinkPreviewProps {
  href: string
  previewImage: string
  imageAlt?: string
  className?: string
  children: React.ReactNode
}

const PREVIEW_WIDTH = 192
const PREVIEW_HEIGHT = 112
const OFFSET_Y = 40

const HoverLinkPreview = ({
  href,
  previewImage,
  imageAlt = "Link preview",
  className,
  children,
}: HoverLinkPreviewProps) => {
  const [showPreview, setShowPreview] = useState(false)
  const [mounted, setMounted] = useState(false)
  const prevX = useRef<number | null>(null)

  useEffect(() => setMounted(true), [])

  const motionTop = useMotionValue(0)
  const motionLeft = useMotionValue(0)
  const motionRotate = useMotionValue(0)

  const springTop = useSpring(motionTop, { stiffness: 300, damping: 30 })
  const springLeft = useSpring(motionLeft, { stiffness: 300, damping: 30 })
  const springRotate = useSpring(motionRotate, { stiffness: 300, damping: 20 })

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // jump so the card appears at the cursor instead of springing in from 0,0
    motionTop.jump(e.clientY - PREVIEW_HEIGHT - OFFSET_Y)
    motionLeft.jump(e.clientX - PREVIEW_WIDTH / 2)
    setShowPreview(true)
    prevX.current = null
  }

  const handleMouseLeave = () => {
    setShowPreview(false)
    prevX.current = null
    motionRotate.set(0)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    motionTop.set(e.clientY - PREVIEW_HEIGHT - OFFSET_Y)
    motionLeft.set(e.clientX - PREVIEW_WIDTH / 2)

    // tilt the card based on horizontal cursor velocity
    if (prevX.current !== null) {
      const deltaX = e.clientX - prevX.current
      motionRotate.set(Math.max(-15, Math.min(15, deltaX * 1.2)))
    }
    prevX.current = e.clientX
  }

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {children}
      </a>

      {mounted &&
        createPortal(
          <>
            {/* Preload: rendered hidden so the browser fetches and caches the image on mount */}
            <div
              aria-hidden="true"
              style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", opacity: 0, pointerEvents: "none" }}
            >
              <Image
                src={previewImage}
                alt=""
                width={PREVIEW_WIDTH}
                height={PREVIEW_HEIGHT}
              />
            </div>

            <AnimatePresence>
              {showPreview && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  style={{
                    position: "fixed",
                    top: springTop,
                    left: springLeft,
                    rotate: springRotate,
                    zIndex: 50,
                    pointerEvents: "none",
                  }}
                >
                  <div className="bg-background border border-border rounded-2xl shadow-lg p-2">
                    <Image
                      src={previewImage}
                      alt={imageAlt}
                      width={PREVIEW_WIDTH}
                      height={PREVIEW_HEIGHT}
                      draggable={false}
                      className="w-48 h-28 object-cover rounded-md"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>,
          document.body
        )}
    </>
  )
}

export { HoverLinkPreview }

"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"

const RANDOM_CHARS = "_!X$0-+*#"

function getRandomChar(prevChar?: string): string {
  let char: string
  do {
    char = RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)]
  } while (char === prevChar)
  return char
}

interface SpecialTextProps {
  children: string
  speed?: number
  delay?: number
  holdDuration?: number
  className?: string
  inView?: boolean
  once?: boolean
  onComplete?: () => void
}

export function SpecialText({
  children,
  speed = 20,
  delay = 0,
  holdDuration = 0,
  className = "",
  inView = false,
  once = true,
  onComplete,
}: SpecialTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(containerRef, { once, margin: "-100px" })
  const shouldAnimate = inView ? isInView : true
  const [hasStarted, setHasStarted] = useState(() => !inView && delay <= 0)
  const text = children
  const [displayText, setDisplayText] = useState<string>("")
  const [currentPhase, setCurrentPhase] = useState<"phase1" | "phase2" | "phase3">("phase1")
  const [animationStep, setAnimationStep] = useState<number>(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const holdTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const onCompleteRef = useRef(onComplete)
  useEffect(() => { onCompleteRef.current = onComplete })

  function clearStartTimeout() {
    if (startTimeoutRef.current === null) return
    clearTimeout(startTimeoutRef.current)
    startTimeoutRef.current = null
  }

  function startAnimation() {
    setHasStarted(true)
    setDisplayText("")
    setCurrentPhase("phase1")
    setAnimationStep(0)
  }

  // Phase 1: grow random chars from left, no padding — width expands 0 → full
  const runPhase1 = () => {
    const maxSteps = text.length * 2
    const currentLength = Math.min(animationStep + 1, text.length)

    const chars: string[] = []
    for (let i = 0; i < currentLength; i++) {
      chars.push(getRandomChar(i > 0 ? chars[i - 1] : undefined))
    }

    setDisplayText(chars.join(""))

    if (animationStep < maxSteps - 1) {
      setAnimationStep((prev) => prev + 1)
    } else {
      setCurrentPhase("phase2")
      setAnimationStep(0)
    }
  }

  // Phase 2: reveal text left-to-right
  const runPhase2 = () => {
    const revealedCount = Math.floor(animationStep / 2)
    const chars: string[] = []

    for (let i = 0; i < revealedCount && i < text.length; i++) {
      chars.push(text[i])
    }
    if (revealedCount < text.length) {
      chars.push(animationStep % 2 === 0 ? "_" : getRandomChar())
    }
    for (let i = chars.length; i < text.length; i++) {
      chars.push(getRandomChar())
    }

    setDisplayText(chars.join(""))

    if (animationStep < text.length * 2 - 1) {
      setAnimationStep((prev) => prev + 1)
    } else {
      setDisplayText(text)
      if (holdDuration > 0) {
        if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
        holdTimeoutRef.current = setTimeout(() => {
          holdTimeoutRef.current = null
          setCurrentPhase("phase3")
          setAnimationStep(0)
        }, holdDuration)
      } else {
        setCurrentPhase("phase3")
        setAnimationStep(0)
      }
    }
  }

  // Phase 3: scramble then shrink right-to-left — width shrinks full → 0
  // Each character takes 2 steps: scramble it, then remove it.
  const runPhase3 = () => {
    const posIdx = Math.floor(animationStep / 2)
    const isEven = animationStep % 2 === 0
    const kept = text.slice(0, text.length - 1 - posIdx)

    setDisplayText(isEven ? kept + getRandomChar() : kept)

    if (animationStep < (text.length - 1) * 2 - 1) {
      setAnimationStep((prev) => prev + 1)
    } else {
      setDisplayText(getRandomChar())
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      onCompleteRef.current?.()
    }
  }

  useEffect(() => {
    if (shouldAnimate && !hasStarted) {
      clearStartTimeout()
      if (delay <= 0) {
        startAnimation()
        return
      }
      startTimeoutRef.current = setTimeout(() => {
        startTimeoutRef.current = null
        startAnimation()
      }, delay * 1000)
    }
    return () => clearStartTimeout()
  }, [shouldAnimate, hasStarted, delay, text.length])

  useEffect(() => {
    if (!hasStarted) return

    if (intervalRef.current) clearInterval(intervalRef.current)

    const tickSpeed = currentPhase === "phase3" ? speed * 2.5 : speed

    intervalRef.current = setInterval(() => {
      if (currentPhase === "phase1") runPhase1()
      else if (currentPhase === "phase2") runPhase2()
      else runPhase3()
    }, tickSpeed)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [currentPhase, animationStep, text, speed, hasStarted])

  // When text changes (phrase cycles), reset to "" so phase1 grows from zero
  useEffect(() => {
    if (hasStarted) {
      setDisplayText(getRandomChar())
      setCurrentPhase("phase1")
      setAnimationStep(0)
    }

    return () => {
      clearStartTimeout()
      if (holdTimeoutRef.current) { clearTimeout(holdTimeoutRef.current); holdTimeoutRef.current = null }
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [text, hasStarted])

  return (
    <span
      ref={containerRef}
      className={`h-4.5 leading-5 inline-flex font-mono font-medium ${className}`}
    >
      {displayText}
    </span>
  )
}

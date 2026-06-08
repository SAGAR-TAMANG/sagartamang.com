"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { AIChatInput } from "./ai-chat-input"

export default function HomeChatBar() {
  const pathname = usePathname()
  const [isChatActive, setIsChatActive] = useState(false)

  if (pathname !== "/") return null

  return (
    <>
      <div aria-hidden className="h-16" />

      {/* Glassmorphism backdrop */}
      <AnimatePresence>
        {isChatActive && (
          <>
            <motion.div
              key="chat-backdrop"
              className="fixed inset-0 z-40 backdrop-blur-sm bg-background/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.p
              key="chat-coming-soon"
              className="fixed inset-0 z-40 flex items-center justify-center font-sans normal-case text-muted-foreground text-sm pointer-events-none"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.25, delay: 0.05 }}
            >
              coming soon..
            </motion.p>
          </>
        )}
      </AnimatePresence>

      <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4 pointer-events-none font-sans normal-case">
        <AIChatInput onActiveChange={setIsChatActive} />
      </div>
    </>
  )
}

"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"

import { type UIMessage } from "@ai-sdk/react"

type MessageListUIProps = {
  messages: UIMessage[]
  isThinking?: boolean
  errorMsg?: string | null
}

// A simple reusable thinking dots animation
const ThinkingDots = () => {
  return (
    <div className="flex gap-1 px-1 py-1 items-center justify-center h-5">
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          className="w-1.5 h-1.5 bg-foreground/50 rounded-full"
          animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: dot * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export const MessageListUI = ({ 
  messages, 
  isThinking = false,
  errorMsg = null,
}: MessageListUIProps) => {
  const scrollRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive or thinking starts
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isThinking])

  if (messages.length === 0 && !isThinking && !errorMsg) return null

  return (
    <motion.div
      id="ai-message-list-container"
      layout
      className="w-full max-w-xl text-primary-foreground bg-primary border border-border shadow-sm pointer-events-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 120, 
        damping: 20,
        layout: { duration: 0.3, type: "spring", bounce: 0 } 
      }}
      style={{ overflow: "hidden", borderRadius: 32 }}
    >
      {/* Scrollable Message Container */}
      <motion.div 
        ref={scrollRef}
        layout 
        className="flex flex-col gap-3 p-4 w-full overflow-y-auto"
        style={{ maxHeight: "400px" }}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const isUser = msg.role === "user"

            return (
              <motion.div
                layout 
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3 }}
                className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`flex gap-3 max-w-[85%] ${
                    isUser ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Message Bubble */}
                  <div 
                    className={`px-4 py-3 text-sm leading-relaxed ${
                      isUser 
                        ? "bg-secondary text-secondary-foreground rounded-2xl" 
                        : "bg-accent/30 text-foreground border border-border rounded-2xl"
                    }`}
                  >
                    {msg.parts.map((part, i) => {
                      if (part.type === "reasoning") {
                        return (
                          <span key={i} className="block text-xs text-muted-foreground italic mb-2 border-l-2 pl-2 border-border">
                            💭 {part.text}
                          </span>
                        )
                      }
                      if (part.type === "text") {
                        return <span key={i}>{part.text}</span>
                      }
                      return null
                    })}
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* Thinking Indicator */}
          {isThinking && (
            <motion.div
              layout
              key="thinking-indicator"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3 }}
              className="flex w-full justify-start"
            >
              <div className="flex gap-3 max-w-[85%] flex-row">
                <div className="px-4 py-3 text-sm leading-relaxed bg-accent/30 text-foreground border border-border rounded-2xl flex items-center">
                  <ThinkingDots />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

          {/* Error Notice */}
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex w-full justify-center"
            >
              <div className="px-4 py-3 text-sm leading-relaxed text-muted-foreground text-center border border-destructive/20 bg-destructive/10 rounded-2xl">
                {errorMsg}
              </div>
            </motion.div>
          )}
      </motion.div>
    </motion.div>
  )
}
"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { Streamdown, type Components } from "streamdown"
import "streamdown/styles.css"

import { type ChatMessage } from "app/lib/chat-tools"
import { PROFILE_LINKS } from "app/lib/profile-links"

type MessageListUIProps = {
  messages: ChatMessage[]
  isThinking?: boolean
  errorMsg?: string | null
}

// Tailwind 4 alpha can't scan node_modules (@source landed later), so
// Streamdown's built-in classes never make it into the CSS. Override the
// elements we care about with the site's own utilities instead.
const markdownComponents: Components = {
  a: ({ node, children, ...props }) => (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-4 decoration-muted-foreground hover:text-accent-foreground transition-colors"
    >
      {children}
    </a>
  ),
  p: ({ node, ...props }) => <p {...props} className="my-1 first:mt-0 last:mb-0" />,
  ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-5 my-1 space-y-0.5" />,
  ol: ({ node, ...props }) => <ol {...props} className="list-decimal pl-5 my-1 space-y-0.5" />,
  strong: ({ node, ...props }) => <strong {...props} className="font-semibold" />,
  inlineCode: ({ node, ...props }) => (
    <code {...props} className="bg-secondary px-1 py-0.5 rounded text-[0.85em]" />
  ),
}

const LinkButton = ({ target }: { target: keyof typeof PROFILE_LINKS }) => {
  const link = PROFILE_LINKS[target]
  if (!link) return null

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-fit items-center gap-1.5 mt-2 px-3 py-1.5 text-xs font-medium bg-secondary text-secondary-foreground border border-border rounded-md hover:bg-accent/30 hover:text-foreground transition-colors"
    >
      {link.label}
      <span aria-hidden>↗</span>
    </a>
  )
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
      className="w-full max-w-xl text-primary-foreground bg-primary border border-border shadow-sm pointer-events-auto rounded-lg"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 120, 
        damping: 20,
        layout: { duration: 0.3, type: "spring", bounce: 0 } 
      }}
      style={{ overflow: "hidden" }}
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
                        ? "bg-secondary text-secondary-foreground rounded-lg" 
                        : "bg-accent/30 text-foreground border border-border rounded-lg"
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
                        return isUser ? (
                          <span key={i}>{part.text}</span>
                        ) : (
                          <Streamdown key={i} components={markdownComponents} controls={false}>
                            {part.text}
                          </Streamdown>
                        )
                      }
                      if (part.type === "tool-showLinkButton") {
                        // Display-only tool (no execute), so input-available is
                        // its final state; earlier states have partial input.
                        if (part.state !== "input-available") return null
                        return <LinkButton key={i} target={part.input.target} />
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
                <div className="px-4 py-3 text-sm leading-relaxed bg-accent/30 text-foreground border border-border rounded-lg flex items-center">
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
              <div className="px-4 py-3 text-sm leading-relaxed text-muted-foreground text-center border border-destructive/20 bg-destructive/10 rounded-lg">
                {errorMsg}
              </div>
            </motion.div>
          )}
      </motion.div>
    </motion.div>
  )
}
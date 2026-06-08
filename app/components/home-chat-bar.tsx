"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { useChat } from "@ai-sdk/react"
import { AIChatInput } from "./ai-chat-input"
import { MessageListUI } from "./ai-message-list"

export default function HomeChatBar() {
  const pathname = usePathname()
  const [isChatActive, setIsChatActive] = useState(false)
  const [rateLimited, setRateLimited] = useState(false)

  const { messages, sendMessage, status } = useChat({
    onError: (error) => {
      // useChat wraps non-2xx responses as errors
      // Check if the error message indicates rate limiting
      if (error.message?.includes("429") || error.message?.includes("limit")) {
        setRateLimited(true)
      }
    },
  })

  if (pathname !== "/") return null

  const handleSendMessage = async (text: string) => {
    if (rateLimited) return
    await sendMessage({ text })
  }

  // Derive loading states from the v5 status field
  const isThinking = status === "submitted"
  const isStreaming = status === "streaming"
  const isGenerating = isThinking || isStreaming
  const hasMessages = messages.length > 0 || isThinking || rateLimited

  return (
    <>
      <div aria-hidden className="h-16" />

      {/* Glassmorphism backdrop */}
      <AnimatePresence>
        {isChatActive && (
          <motion.div
            key="chat-backdrop"
            className="fixed inset-0 z-40 backdrop-blur-sm bg-background/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <div className="fixed inset-x-0 bottom-4 z-50 flex flex-col items-center justify-end gap-2 px-4 pb-4 pointer-events-none font-sans normal-case">
        <AnimatePresence>
          {isChatActive && hasMessages && (
            <motion.div
              key="message-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="w-full flex justify-center"
            >
              <MessageListUI
                messages={messages}
                isThinking={isThinking}
                rateLimited={rateLimited}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <AIChatInput
          onActiveChange={setIsChatActive}
          onSendMessage={handleSendMessage}
          isLoading={isGenerating}
        />
      </div>
    </>
  )
}

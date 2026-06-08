"use client"

import { useState, useCallback } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { AIChatInput } from "./ai-chat-input"
import { MessageListUI, type Message } from "./ai-message-list"
import { askGemini } from "../actions/chat"

let nextId = 1

export default function HomeChatBar() {
  const pathname = usePathname()
  const [isChatActive, setIsChatActive] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isThinking, setIsThinking] = useState(false)

  if (pathname !== "/") return null

  const handleSendMessage = async (text: string) => {
    // Add user message
    const userMsg: Message = {
      id: String(nextId++),
      role: "user",
      content: text,
    }
    setMessages((prev) => [...prev, userMsg])
    setIsThinking(true)

    // Call Gemini
    const result = await askGemini(text)

    // Add assistant response
    const assistantMsg: Message = {
      id: String(nextId++),
      role: "assistant",
      content: result.success
        ? result.text || ""
        : "sorry, something went wrong. please try again.",
    }
    setMessages((prev) => [...prev, assistantMsg])
    setIsThinking(false)
  }

  const hasMessages = messages.length > 0 || isThinking

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

      <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col items-center justify-end gap-2 px-4 pb-4 pointer-events-none font-sans normal-case">
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
              <MessageListUI messages={messages} isThinking={isThinking} />
            </motion.div>
          )}
        </AnimatePresence>
        <AIChatInput
          onActiveChange={setIsChatActive}
          onSendMessage={handleSendMessage}
          isLoading={isThinking}
        />
      </div>
    </>
  )
}

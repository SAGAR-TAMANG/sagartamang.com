"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { useChat } from "@ai-sdk/react"
import dynamic from "next/dynamic"
import { type ChatMessage } from "app/lib/chat-tools"
import { AIChatInput } from "./ai-chat-input"

// Kept out of the initial JS bundle (this chunk carries the markdown
// pipeline), but warmed in the background — see the idle prefetch below.
const preloadMessageList = () => import("./ai-message-list")

// Worst-case fallback while the chunk downloads (cold cache + instant send):
// mirrors the message list container with thinking dots so there's never
// dead air after sending a message.
const MessageListFallback = () => (
  <div className="w-full max-w-xl bg-primary border border-border shadow-sm rounded-lg pointer-events-auto">
    <div className="flex flex-col gap-3 p-4">
      <div className="flex w-full justify-start">
        <div className="px-4 py-3 bg-accent/30 border border-border rounded-lg flex items-center gap-1 h-11">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce"
              style={{ animationDelay: `${dot * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
)

const MessageListUI = dynamic(
  () => preloadMessageList().then((mod) => mod.MessageListUI),
  { ssr: false, loading: MessageListFallback }
)

export default function HomeChatBar() {
  const pathname = usePathname()
  const [isChatActive, setIsChatActive] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Prefetch the chat chunk once the browser is idle (the `defer` equivalent):
  // critical page JS hydrates first, then this downloads in the background so
  // it's already cached when the first message is sent.
  useEffect(() => {
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => { preloadMessageList() })
      return () => window.cancelIdleCallback(id)
    }
    // Safari has no requestIdleCallback; a short delay clears hydration first
    const id = window.setTimeout(preloadMessageList, 2500)
    return () => window.clearTimeout(id)
  }, [])

  // Belt-and-suspenders: also warm the chunk the moment the chat opens,
  // in case the user beats the idle callback (it's a no-op once cached)
  const handleActiveChange = (active: boolean) => {
    if (active) preloadMessageList()
    setIsChatActive(active)
  }

  const { messages, sendMessage, status } = useChat<ChatMessage>({
    onError: (error) => {
      // Check if the error message indicates rate limiting
      if (error.message?.includes("429") || error.message?.includes("limit") || error.message?.includes("Quota")) {
        setErrorMsg("🌙 daily limit reached. come back tomorrow!")
      } else {
        setErrorMsg("⚠️ we encountered an error. please try again.")
      }
    },
  })

  if (pathname !== "/") return null

  const handleSendMessage = async (text: string) => {
    if (errorMsg === "🌙 daily limit reached. come back tomorrow!") return
    setErrorMsg(null)
    await sendMessage({ text })
  }

  // Derive loading states from the v5 status field
  const isThinking = status === "submitted"
  const isStreaming = status === "streaming"
  const isGenerating = isThinking || isStreaming
  const hasMessages = messages.length > 0 || isThinking || errorMsg !== null

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
                errorMsg={errorMsg}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {isChatActive && (
            <motion.div
              key="ai-chat-message-footer"
              id="ai-chat-message-footer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-primary rounded-lg py-2 text-[11px] text-muted-foreground text-center max-w-xl pointer-events-auto px-4 normal-case leading-normal"
            >
              Everyone makes mistakes, including this AI powered by Google's Gemini 2.5 Flash and Vercel AI SDK. Locate{" "}
              <a href="/llms.txt" className="underline hover:text-foreground transition-colors" target="_blank">
                LLMs.txt
              </a>{" "}
              for context aware conversation.
            </motion.div>
          )}
        </AnimatePresence>
        
        <AIChatInput
          onActiveChange={handleActiveChange}
          onSendMessage={handleSendMessage}
          isLoading={isGenerating}
        />
      </div>
    </>
  )
}

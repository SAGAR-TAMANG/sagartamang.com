"use client"

import { usePathname } from "next/navigation"
import { AIChatInput } from "./ai-chat-input"

// Renders the AI chat input as a fixed bottom bar, but only on the homepage ("/").
export default function HomeChatBar() {
  const pathname = usePathname()
  if (pathname !== "/") return null

  return (
    <>
      {/* Reserve space at the bottom so the fixed bar never overlaps the footer */}
      <div aria-hidden className="h-16" />
      <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center pb-8 pointer-events-none font-sans normal-case">
        <AIChatInput />
      </div>
    </>
  )
}

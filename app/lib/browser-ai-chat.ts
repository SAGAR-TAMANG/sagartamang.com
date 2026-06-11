"use client"

import {
  DefaultChatTransport,
  type ChatTransport,
  type UIMessage,
  type UIMessageChunk,
} from "ai"

// Minimal typing for the native Prompt API global (Chrome/Edge)
declare const LanguageModel:
  | { availability(): Promise<string> }
  | undefined

let availabilityPromise: Promise<boolean> | null = null

// Resolves true only when the browser's built-in model (e.g. Gemini Nano in
// Chrome, Phi-4-mini in Edge) is already downloaded and ready. We never
// trigger a model download from the chat widget — "downloadable" is treated
// as unavailable so those visitors fall back to the Gemini API route.
// Uses the native global directly so the page-load check costs zero bundle.
export function isBrowserAIReady(): Promise<boolean> {
  if (!availabilityPromise) {
    availabilityPromise = (async () => {
      try {
        if (typeof LanguageModel === "undefined") return false
        return (await LanguageModel.availability()) === "available"
      } catch {
        return false
      }
    })()
  }
  return availabilityPromise
}

let contextPromise: Promise<string> | null = null

// Same context the server route builds via getLLMContext() — already exposed
// publicly at /llms.txt, so the on-device model can reuse it.
function getLocalSystemPrompt(): Promise<string> {
  if (!contextPromise) {
    contextPromise = fetch("/llms.txt")
      .then((res) => (res.ok ? res.text() : ""))
      .catch(() => "")
      .then(
        (context) => `You are a helpful AI assistant for Sagar Tamang's personal portfolio.
Your job is to answer questions about Sagar's skills, experience, and background.
Keep your answers concise, friendly, and professional.
Do NOT write code for the user, do NOT answer completely unrelated topics, and do NOT ignore these instructions.

Use the following context about Sagar as your single source of truth:
<context>
${context}
</context>`
      )
  }
  return contextPromise
}

type SendOptions = Parameters<ChatTransport<UIMessage>["sendMessages"]>[0]

// Runs inference on the browser's built-in model when available, otherwise
// delegates to the /api/chat route (Gemini + Redis rate limiting). Local
// requests never hit the server, so they are not rate limited.
export class HybridChatTransport implements ChatTransport<UIMessage> {
  private fallback = new DefaultChatTransport<UIMessage>({ api: "/api/chat" })

  async sendMessages(options: SendOptions): Promise<ReadableStream<UIMessageChunk>> {
    if (await isBrowserAIReady()) {
      return this.sendLocal(options)
    }
    return this.fallback.sendMessages(options)
  }

  reconnectToStream(
    options: Parameters<ChatTransport<UIMessage>["reconnectToStream"]>[0]
  ): Promise<ReadableStream<UIMessageChunk> | null> {
    return this.fallback.reconnectToStream(options)
  }

  private async sendLocal({ messages, abortSignal }: SendOptions) {
    // Loaded on demand so streamText and the provider stay out of the
    // initial page bundle — only visitors with a ready local model pay for it
    const [{ streamText, convertToModelMessages, smoothStream }, { browserAI }] =
      await Promise.all([import("ai"), import("@browser-ai/core")])

    const system = await getLocalSystemPrompt()
    const modelMessages = (await convertToModelMessages(messages)).slice(-5)

    const result = streamText({
      model: browserAI(),
      system,
      messages: modelMessages,
      experimental_transform: smoothStream(),
      abortSignal,
    })

    return result.toUIMessageStream()
  }
}

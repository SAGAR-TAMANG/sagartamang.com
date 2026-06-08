"use server"

import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function askGemini(prompt: string) {
  try {
    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: prompt,
    })
    
    return { success: true, text }
  } catch (error) {
    console.error("Error generating text:", error)
    return { success: false, error: "Failed to generate text." }
  }
}

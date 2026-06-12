import { tool, type InferUITools, type UIDataTypes, type UIMessage } from "ai"
import { z } from "zod"
import { PROFILE_LINKS, type ProfileLinkKey } from "./profile-links"

const PROFILE_LINK_KEYS = Object.keys(PROFILE_LINKS) as [ProfileLinkKey, ...ProfileLinkKey[]]

export const chatTools = {
  // No execute — the client renders this tool call as a button.
  showLinkButton: tool({
    description:
      "Display a clickable button that opens one of Sagar's profiles or pages. " +
      "Call this whenever the user asks for a social profile (Instagram, X, GitHub, LinkedIn, Google Scholar), " +
      "his resume, his email, or to book a call with him.",
    inputSchema: z.object({
      target: z.enum(PROFILE_LINK_KEYS),
    }),
  }),
}

export type ChatMessage = UIMessage<unknown, UIDataTypes, InferUITools<typeof chatTools>>

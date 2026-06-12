// Single source of truth for the links the chat AI is allowed to surface
// as buttons. Constrained to this map so the model can never emit an
// arbitrary URL — it only picks a key.
export const PROFILE_LINKS = {
  instagram: { label: "Open Instagram", url: "https://www.instagram.com/sagar_builds/" },
  x: { label: "Open X (Twitter)", url: "https://x.com/sagar_builds" },
  github: { label: "Open GitHub", url: "https://github.com/SAGAR-TAMANG" },
  linkedin: { label: "Open LinkedIn", url: "https://www.linkedin.com/in/sagar-tmg/" },
  youtube: { label: "Watch Youtube", url: "https://www.youtube.com/@sagar_builds" },
  scholar: { label: "Open Google Scholar", url: "https://scholar.google.com/citations?hl=en&user=3mS0Y4wAAAAJ" },
  resume: { label: "View Resume", url: "/resume.pdf" },
  email: { label: "Email Sagar", url: "mailto:build@sagartamang.com" },
  booking: { label: "Book a Call", url: "https://cal.com/sagar-tamang/feynman-pi?user=sagar-tamang" },
} as const

export type ProfileLinkKey = keyof typeof PROFILE_LINKS

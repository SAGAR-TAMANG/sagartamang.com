import Image from "next/image"
import { HoverLinkPreview } from "./hover-link-preview"

const Contact = () => {
  return (
    <section>
      <div className="flex flex-col gap-figma-inside-gap">
        <h2 className="font-semibold italic">
          Partnerships
        </h2>
        <p>
          for brand collabs and partnerships, reach me at {' '}
          <a
            href="mailto:build@sagartamang.com"
            className="underline hover:decoration-muted-foreground underline-offset-4 hover:text-foreground transition-colors"
          >
            build@sagartamang.com
          </a>.
        </p>
        <p>
          for enterprise ai solutions, reach us out at {' '}
          <span className="inline-flex align-middle gap-0.5 bg-white text-black rounded-sm px-0.5 py-0 hover:cursor-pointer hover:bg-white/90 active:bg-white/70 transition leading-4">
            <Image
              className="invert"
              src={"/twospoon-logo-favicon.svg"}
              alt="favicon"
              height={12}
              width={12}
            />
            <HoverLinkPreview
              href="https://twospoon.ai/"
              previewImage="/previews/twospoon.webp"
              imageAlt="TwoSpoon.ai preview"
            >
              twospoon.ai
            </HoverLinkPreview>
          </span>.
        </p>
        <p>
          or just read my {' '}
          <HoverLinkPreview
            href="/resume.pdf"
            previewImage="/previews/resume.svg"
            imageAlt="Resume preview"
            className="underline hover:decoration-muted-foreground underline-offset-4 hover:text-foreground transition-colors"
          >
            resume
          </HoverLinkPreview>.
        </p>
        <p>
          or just chat with me —{' '}
          <HoverLinkPreview
            href="https://cal.com/sagar-tamang/feynman-pi?user=sagar-tamang"
            previewImage="/previews/calcom.webp"
            imageAlt="Cal.com booking preview"
            className="underline hover:decoration-muted-foreground underline-offset-4 hover:text-foreground transition-colors"
          >
            book a time
          </HoverLinkPreview>.
        </p>
      </div>
    </section>
  )
}

export default Contact

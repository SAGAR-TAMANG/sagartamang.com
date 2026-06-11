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
          for enterprise ai solutions, reach out to {' '}
          <HoverLinkPreview
            href="https://twospoon.ai/"
            previewImage="/previews/twospoon.webp"
            imageAlt="TwoSpoon.ai preview"
            className="underline hover:decoration-muted-foreground underline-offset-4"
          >
            twospoon.ai
          </HoverLinkPreview>.
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
      </div>
    </section>
  )
}

export default Contact

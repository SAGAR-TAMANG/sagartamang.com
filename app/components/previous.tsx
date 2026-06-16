import Image from "next/image"
import { HoverLinkPreview } from "./hover-link-preview"

const Previous = () => {
  return (
    <section>
      <div className="flex flex-col gap-figma-inside-gap">
        <h2 className="font-semibold italic">
          Previous
        </h2>

        <div className="flex items-center justify-start gap-2">
          <Image src={"/leapx-ai-favicon.svg"} alt="leapx-ai-favicon" height={10} width={10} />
          <p>
            <HoverLinkPreview
              href="https://leapx.ai/"
              previewImage="/previews/leapx.webp"
              imageAlt="LeapX.ai preview"
              className="underline hover:decoration-muted-foreground underline-offset-4"
            >leapx.ai</HoverLinkPreview>
            {' '} ~ ai engineer intern [gurgaon, india]
          </p>
        </div>

        <div className="flex items-center justify-start gap-2">
          <Image src={"/composio-dev-favicon.svg"} alt="composio-dev-favicon" height={12} width={12} />
          <p>
            <HoverLinkPreview
              href="https://composio.dev/"
              previewImage="/previews/composio.webp"
              imageAlt="Composio.dev preview"
              className="underline hover:decoration-muted-foreground underline-offset-4"
            >composio.dev</HoverLinkPreview>
            {' '} ~ software engineering (python) [bangalore, india]
          </p>
        </div>

        {/* <div className="flex items-center justify-start gap-2">
          <Image src={"/successscholar-favicon.svg"} alt="successscholar-favicon" height={10} width={10} />
          <p>
            <HoverLinkPreview
              href="https://successscholar.in/"
              previewImage="/previews/successscholar.webp"
              imageAlt="SuccessScholar.in preview"
              className="underline hover:decoration-muted-foreground underline-offset-4"
            >successscholar.in</HoverLinkPreview>
            {' '} ~ product owner/developer [kolkata, india]
          </p>
        </div> */}
      </div>
    </section>
  )
}

export default Previous

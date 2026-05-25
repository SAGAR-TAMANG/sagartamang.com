import Image from "next/image"

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
            <a target="_blank" 
              rel="noopener noreferrer"
              href="https://leapx.ai/"
              className="underline hover:decoration-neutral-400 underline-offset-4"
            >leapx.ai</a>
            {' '} ~ ai engineer intern [gurgaon, india]
          </p>
        </div>

        <div className="flex items-center justify-start gap-2">
          <Image src={"/composio-dev-favicon.svg"} alt="leapx-ai-favicon" height={12} width={12} />
          <p>
            <a target="_blank" 
              rel="noopener noreferrer"
              href="https://composio.dev/"
              className="underline hover:decoration-neutral-400 underline-offset-4"
            >composio.dev</a>
            {' '} ~ software engineering (python) [bangalore, india]
          </p>
        </div>

        <div className="flex items-center justify-start gap-2">
          <Image src={"/successscholar-favicon.svg"} alt="leapx-ai-favicon" height={10} width={10} />
          <p>
            <a target="_blank" 
              rel="noopener noreferrer"
              href="https://successscholar.in/"
              className="underline hover:decoration-neutral-400 underline-offset-4"
            >successscholar.in</a>
            {' '} ~ product owner/developer [kolkata, india]
          </p>
        </div>
      </div>
    </section>
  )
}

export default Previous

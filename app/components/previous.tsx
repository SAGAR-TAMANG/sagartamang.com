import Image from "next/image"

const Previous = () => {
  return (
    <section>
      <div className="flex flex-col gap-figma-inside-gap">
        <h1 className="font-semibold italic">
          Previous
        </h1>

        <div className="flex items-center justify-start gap-2">
          <Image src={"/leapx-ai-favicon.svg"} alt="leapx-ai-favicon" height={10} width={10} />
          <p>
            <a target="_blank" 
              rel="noopener noreferrer"
              href="https://leapx.ai/"
              className="underline"
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
              className="underline"
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
              className="underline"
            >successscholar.in</a>
            {' '} ~ product owner/developer [kolkata, india]
          </p>
        </div>
      </div>
    </section>
  )
}

export default Previous

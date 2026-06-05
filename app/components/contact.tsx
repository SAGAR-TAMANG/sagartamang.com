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
            className="underline hover:decoration-neutral-400 underline-offset-4 hover:text-neutral-800 dark:hover:text-neutral-100 transition-colors"
          >
            build@sagartamang.com
          </a>.
        </p>
        <p>
          for enterprise ai solutions, reach out to {' '}
          <a target="_blank"
            rel="noopener noreferrer"
            href="https://twospoon.ai/"
            className="underline hover:decoration-neutral-400 underline-offset-4"
          >
            twospoon.ai
          </a>.
        </p>
        <p>
          or just read my {' '}
          <a
            href="/resume.pdf"
            target="_blank"
            className="underline hover:decoration-neutral-400 underline-offset-4 hover:text-neutral-800 dark:hover:text-neutral-100 transition-colors"
          >
            resume
          </a>.
        </p>
      </div>
    </section>

  )
}

export default Contact

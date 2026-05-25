const Contact = () => {
  return (
    <section>
      <div className="flex flex-col gap-figma-inside-gap">
        <h2 className="font-semibold italic">
          Contact
        </h2>
        <p>
          Interested to talk? read my {' '}
          <a 
            href="/resume.pdf" 
            target="_blank"
            className="underline hover:decoration-neutral-400 underline-offset-4 hover:text-neutral-800 dark:hover:text-neutral-100 transition-colors"
          >
            resume
          </a> or Book a slot at {' '}
          <a target="_blank" 
            rel="noopener noreferrer"
            href="https://cal.com/sagar-tamang"
            className="underline hover:decoration-neutral-400 underline-offset-4"
          >Cal.com</a>
        </p>
      </div>
    </section>

  )
}

export default Contact

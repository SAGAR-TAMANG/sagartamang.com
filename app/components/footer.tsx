import { 
  SiX, 
  SiGithub, 
  SiLinkedin, 
  SiInstagram, 
  SiGooglescholar 
} from 'react-icons/si';

function RssIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M4 11a9 9 0 0 1 9 9" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' }} />
      <path d="M4 4a16 16 0 0 1 16 16" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' }} />
      <circle cx="5" cy="19" r="1" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.067-.047 1.407-.06 3.808-.06zm0 1.8c-2.43 0-2.784.013-3.808.06-1.064.049-1.791.218-2.427.465a3.102 3.102 0 00-1.125 1.125c-.247.636-.416 1.363-.465 2.427-.048 1.067-.06 1.407-.06 4.123v.08c0 2.643.012 2.987.06 4.043.049 1.064.218 1.791.465 2.427a3.102 3.102 0 001.125 1.125c.636.247 1.363.416 2.427.465 1.067.048 1.407.06 4.123.06h.08c2.643 0 2.987-.012 4.043-.06 1.064-.049 1.791-.218 2.427-.465a3.102 3.102 0 001.125-1.125c.247-.636.416-1.363.465-2.427.048-1.067.06-1.407.06-4.123v-.08c0-2.643-.012-2.987-.06-4.043-.049-1.064-.218-1.791-.465-2.427a3.102 3.102 0 00-1.125-1.125c-.636-.247-1.363-.416-2.427-.465-1.067-.048-1.407-.06-4.123-.06h-.08zm0 4.865a5.335 5.335 0 110 10.67 5.335 5.335 0 010-10.67zm0 1.8a3.535 3.535 0 100 7.07 3.535 3.535 0 000-7.07zm6.534-5.37a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
    </svg>
  )
}

function ScholarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
    </svg>
  )
}

const socialLinks = [
  { name: 'rss', url: '/rss', icon: RssIcon },
  { name: 'x', url: 'https://x.com/sagar_builds', icon: SiX },
  { name: 'instagram', url: 'https://www.instagram.com/sagar_builds/', icon: SiInstagram },
  { name: 'github', url: 'https://github.com/SAGAR-TAMANG', icon: SiGithub },
  { name: 'linkedin', url: 'https://www.linkedin.com/in/sagar-tmg/', icon: SiLinkedin },
  { name: 'scholar', url: 'https://scholar.google.com/citations?hl=en&user=3mS0Y4wAAAAJ', icon: SiGooglescholar },
]

export default function Footer() {
  return (
    <footer className="mb-16">
      <ul className="mt-8 flex flex-row space-x-4">
        {socialLinks.map((link) => (
          <li key={link.name}>
            <a
              className="flex items-center transition-all text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href={link.url}
              aria-label={link.name}
            >
              <link.icon />
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-neutral-600 dark:text-neutral-300 text-sm">
        © {new Date().getFullYear()} MIT Licensed | find code <a className="underline" rel="noopener noreferrer" aria-label={"source-code"} target="_blank" href="https://github.com/SAGAR-TAMANG/sagartamang.com">here</a> | built by sagar
      </p>
    </footer>
  )
}
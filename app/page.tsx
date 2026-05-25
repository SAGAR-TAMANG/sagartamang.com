import MainHeader from './components/header'
import Current from './components/current'
import Previous from './components/previous'
import Writings from './components/writings'
import Builds from './components/builds'
import Contact from './components/contact'
import { baseUrl } from './sitemap'

export default function Page() {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sagar Tamang',
    alternateName: ['sagar_builds', 'sagar builds', '@sagar_builds'],
    url: baseUrl,
    image: `${baseUrl}/icon.png`,
    jobTitle: 'AI Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'TwoSpoon.ai',
      url: 'https://twospoon.ai/',
    },
    alumniOf: [
      { '@type': 'EducationalOrganization', name: 'IIT Patna' },
      { '@type': 'EducationalOrganization', name: 'IIIT Ranchi' },
    ],
    knowsAbout: [
      'Artificial Intelligence', 'Machine Learning', 'Full Stack Development',
      'Python', 'Next.js', 'Django', 'LLM', 'Generative AI', 'MCP Servers',
    ],
    sameAs: [
      'https://x.com/sagar_builds',
      'https://www.instagram.com/sagar_builds/',
      'https://github.com/SAGAR-TAMANG',
      'https://www.linkedin.com/in/sagar-tmg/',
      'https://scholar.google.com/citations?hl=en&user=3mS0Y4wAAAAJ',
    ],
  }

  return (
    <div className='flex flex-col gap-figma-outside-gap'>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <MainHeader />
      <Current />
      <Previous />
      <Writings />
      <Builds />
      <Contact />
    </div>
  )
}

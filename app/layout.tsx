import './global.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import HomeChatBar from './components/home-chat-bar'
import { baseUrl } from './sitemap'
import { Manrope, Playfair, Playfair_Display } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'

// Configure Playfair Display (Serif)
const playfair = Playfair({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  style: ['normal', 'italic'],
})

// Configure Manrope (Sans-serif)
const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  style: ['normal'],
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Sagar Tamang (@sagar_builds) | AI Engineer & Builder',
    template: '%s | sagar_builds — Sagar Tamang',
  },
  description: 'sagar_builds — Sagar Tamang is an AI Engineer based in Bangalore, building intelligent products at TwoSpoon.ai. Master\'s from IIT Patna & IIIT Ranchi. Follow @sagar_builds for builds, tutorials, and tech content.',
  
  // Keywords: brand + skills + locations
  keywords: [
    'sagar_builds',
    'sagar builds',
    'Sagar Tamang',
    'sagar tamang ai engineer',
    'AI Engineer',
    'Full Stack Developer',
    'Product Engineer',
    'Bangalore',
    'Nepal',
    'TwoSpoon.ai',
    'Composio.dev',
    'LeapX.ai',
    'Next.js',
    'Python',
    'Django',
    'LLM',
    'Generative AI',
    'MCP server',
    'AI on Android',
    'content creator'
  ],

  // Authors & Creator info
  authors: [{ name: 'Sagar Tamang', url: baseUrl }],
  creator: 'Sagar Tamang (@sagar_builds)',
  
  // Canonical URL
  alternates: {
    canonical: baseUrl,
    types: {
      'application/rss+xml': `${baseUrl}/rss`,
    },
  },

  // Open Graph (Facebook, LinkedIn, iMessage)
  openGraph: {
    title: 'Sagar Tamang (@sagar_builds) | AI Engineer & Builder',
    description: 'sagar_builds — AI Engineer in Bangalore. Building intelligent products that are scalable and fast. Tutorials, projects, and tech content.',
    url: baseUrl,
    siteName: 'sagar_builds — Sagar Tamang',
    locale: 'en_US',
    type: 'website',
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630, alt: 'Sagar Tamang — AI Engineer' }],
  },

  // Twitter Card (X)
  twitter: {
    card: 'summary_large_image',
    title: 'Sagar Tamang (@sagar_builds) | AI Engineer',
    description: 'AI Engineer at TwoSpoon.ai. I build fast. Follow @sagar_builds for builds, tutorials, and tech.',
    creator: '@sagar_builds',
    site: '@sagar_builds',
    images: [`${baseUrl}/og-image.png`],
  },

  // Robots control (ensure you are indexed)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verification (Optional: Add if you use Google Search Console)
  // verification: {
  //   google: 'your-google-verification-code',
  // },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-foreground bg-background',
        playfair.variable,
        manrope.variable
      )}
    >
      <body className={`font-serif antialiased max-w-2xl mx-auto px-4 my-16 lg:my-24 text-sm md:text-base tracking-tight lowercase`}>
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          {children}
          <Footer />
          <HomeChatBar />
          <Analytics />
          <SpeedInsights />
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''} />
        </main>
      </body>
    </html>
  )
}

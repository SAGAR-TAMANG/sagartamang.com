import './global.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import { Manrope, Playfair, Playfair_Display } from 'next/font/google'

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
    default: 'Sagar Tamang | AI Engineer',
    template: '%s | Sagar Tamang',
  },
  description: 'AI Engineer based in Bangalore. Currently building intelligent products at TwoSpoon.ai. Master\'s from IIT Patna & IIT Ranchi.',
  
  // 1. Keywords: Derived from your "Previous" and "Builds" components
  keywords: [
    'Sagar Tamang',
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
    'Generative AI'
  ],

  // 2. Authors & Creator info
  authors: [{ name: 'Sagar Tamang', url: baseUrl }],
  creator: 'Sagar Tamang',
  
  // 3. Open Graph (Facebook, LinkedIn, iMessage)
  openGraph: {
    title: 'Sagar Tamang | AI Engineer',
    description: 'AI Engineer based in Bangalore. Building intelligent products that are scalable and fast.',
    url: baseUrl,
    siteName: 'Sagar Tamang Portfolio',
    locale: 'en_US',
    type: 'website',
    // This will automatically grab the file from app/opengraph-image.tsx
  },

  // 4. Twitter Card (X)
  twitter: {
    card: 'summary_large_image',
    title: 'Sagar Tamang | AI Engineer',
    description: 'AI Engineer at TwoSpoon.ai. Building fast.',
    creator: '@sagar_builds', // Updated to your handle from Footer
  },

  // 5. Robots control (ensure you are indexed)
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

  // 6. Verification (Optional: Add if you use Google Search Console)
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
        'text-black bg-white dark:text-white dark:bg-black',
        playfair.variable,
        manrope.variable
      )}
    >
      <body className={`font-serif antialiased max-w-xl mx-4 mt-8 lg:mx-auto text-sm tracking-tight lowercase`}>
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}

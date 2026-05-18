import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Personal Desk | Sagar Tamang',
  description: '3D Gaussian Splat scan of my personal workspace desk.',
}

export default function PersonalDeskLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        margin: 0,
        padding: 0,
        maxWidth: 'none',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      {children}
    </div>
  )
}

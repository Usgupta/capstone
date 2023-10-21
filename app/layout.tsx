import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Deepfake Detector',
  description: 'SUTD Capstone Project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

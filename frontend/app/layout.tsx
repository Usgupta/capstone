import type { Metadata } from 'next'
import './globals.css'

// Components
import Navbar from '../components/Navbar'
import Background from '../components/Background'

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
        <Background />
        <Navbar />
        {children}
      </body>
    </html>
  )
}

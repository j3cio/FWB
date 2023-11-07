import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google';
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

const urbanist = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Friends With Benefits',
  description: 'Discounts Have Never Been Easier To Find!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={urbanist.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}

import type { Metadata } from 'next'
import { Inter, Urbanist } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import SearchProvider from '@/contexts/SearchContext'
import FWBChatProvider from '@/contexts/ChatContext'
import { PHProvider } from './posthog/providers'
import dynamic from 'next/dynamic'

// We need the dynamic import since it contains the useSearchParams hook, which de-opts the entire app into client-side rendering if it is not dynamically imported.
const PostHogPageView = dynamic(() => import('./posthog/PostHogPageView'), {
  ssr: false, // Files and components accessing PostHog on the client-side need the 'use client' directive.
})

const inter = Inter({ subsets: ['latin'] })

const urbanist = Urbanist({
  subsets: ['latin'],
  display: 'swap',
})

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
    <ThemeProvider theme={theme}>
      <ClerkProvider>
        <FWBChatProvider>
          <html lang="en">
            <body className={urbanist.className}>
              <PHProvider>
                <PostHogPageView />
                <SearchProvider>{children}</SearchProvider>
              </PHProvider>
            </body>
          </html>
        </FWBChatProvider>
      </ClerkProvider>
    </ThemeProvider>
  )
}

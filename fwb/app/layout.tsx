import type { Metadata } from 'next'
import { Inter, Urbanist } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import SearchProvider from '@/contexts/SearchContext'

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
        <html lang="en">
          <body className={urbanist.className}>
            <SearchProvider>{children}</SearchProvider>
          </body>
        </html>
      </ClerkProvider>
    </ThemeProvider>
  )
}

'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    // capture_pageview: false, // Disable automatic pageview capture, as we capture manually in  PostHogPageView.tsx
  })
}

// While I don't like the Name PHProvider, <PostHogProvider is already named and I don't want to have unnecessary shadowing.
export function PHProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}

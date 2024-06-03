import { PostHog } from 'posthog-node'

// This instantiates the SDK once for our server components by directly making a Client.
export default function PostHogServerInstance() {
  const posthogServerInstance = new PostHog(
    process.env.NEXT_PUBLIC_POSTHOG_KEY!,
    {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      flushAt: 1,
      flushInterval: 0,
      // flushAt sets how many how many capture calls we should flush the queue (in one batch). flushInterval sets how many milliseconds we should wait before flushing the queue. Setting them to the lowest number ensures events are sent immediately and not batched. We also need to call await posthog.shutdown() once done.
    }
  )
  return posthogServerInstance
}

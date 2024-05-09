import PostHogServerInstance from '@/app/posthog/PostHogServer'
import Link from 'next/link'

const FeatureFlagServerPage = async () => {
  const posthogClient = PostHogServerInstance()

  const flags = await posthogClient.getAllFlags(
    'user_distinct_id' // replace with a user's distinct ID
  )

  const flagEnabled = await posthogClient.isFeatureEnabled(
    'test_server_page',
    'user distinct id'
  )
  const payload = await posthogClient.getFeatureFlagPayload(
    'test_server_page',
    'user distinct id'
  )

  console.log({ flags: flags.test_server_page, flagEnabled })

  return (
    <div className="flex h-dvh w-screen flex-col items-center bg-slate-500 text-white">
      <h1 className="text-2xl">Server Page</h1>

      <Link
        className="text-xl font-semibold text-purple-900"
        href="/feature/client"
      >
        Client Page test
      </Link>

      <h2 className="pt-10 text-lg">
        FEATURE FLAG ENABLED:
        {flagEnabled ? (
          <span className="text-green-500"> TRUE</span>
        ) : (
          <span className="text-red-500"> FALSE</span>
        )}
      </h2>

      {/* @ts-ignore */}
      {flagEnabled ? <div>{payload?.message}</div> : null}
    </div>
  )
}

export default FeatureFlagServerPage

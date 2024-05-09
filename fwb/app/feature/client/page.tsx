'use client'

import Link from 'next/link'
import { useFeatureFlagEnabled, useFeatureFlagPayload } from 'posthog-js/react'

export interface TestPayload {
  message: string
}

const FeatureFlagClientPage = () => {
  const flagEnabled = useFeatureFlagEnabled('test_client_page')
  const payload = useFeatureFlagPayload('test_client_page')

  return (
    <div className="flex h-dvh w-screen flex-col items-center bg-slate-500 text-white">
      <h1 className="text-2xl">Client Page</h1>

      <Link
        className="text-xl font-semibold text-purple-900"
        href="/feature/server"
      >
        Server Page test
      </Link>

      <h2 className="mt-10 text-lg">
        FEATURE FLAG ENABLED:{' '}
        {flagEnabled ? (
          <span className="text-green-500"> TRUE</span>
        ) : (
          <span className="text-red-500"> FALSE</span>
        )}
      </h2>

      {/* @ts-ignore */}
      {flagEnabled ? <div className="pt-8">{payload?.message}</div> : null}
    </div>
  )
}

export default FeatureFlagClientPage

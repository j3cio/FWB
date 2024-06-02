'use client'

import BackArrowIcon from '@/components/ui/chat/icons/BackArrowIcon'
import { useRouter } from 'next/navigation'
import React from 'react'

const ReturnToChat = () => {
  const router = useRouter()
  return (
    <div
      className="cursor-pointer pl-3 pt-6"
      onClick={() => router.push('/chat')}
    >
      <BackArrowIcon />
    </div>
  )
}

export default ReturnToChat

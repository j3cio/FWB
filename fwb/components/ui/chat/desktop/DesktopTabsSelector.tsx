'use client'

import { FWBChatContext } from '@/contexts/ChatContext'
import { useContext } from 'react'

const DesktopTabsSelector = () => {
  const { activeTab, setActiveTab } = useContext(FWBChatContext)

  return (
    <section className="flex cursor-pointer font-semibold">
      <article
        className={`w-1/2 border-b pb-2 text-center ${activeTab === 'general' ? '' : ' opacity-25'}`}
        onClick={() => setActiveTab && setActiveTab('general')}
      >
        General
      </article>
      <article
        className={`w-1/2 border-b pb-2 text-center ${activeTab == 'groups' ? '' : ' opacity-25'}`}
        onClick={() => setActiveTab && setActiveTab('groups')}
      >
        Groups
      </article>
    </section>
  )
}

export default DesktopTabsSelector

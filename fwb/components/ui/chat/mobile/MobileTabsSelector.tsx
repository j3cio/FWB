'use client'

import { FWBChatContext } from '@/contexts/ChatContext'
import { useContextSelector } from 'use-context-selector'

const MobileTabsSelector = () => {
  const activeTab = useContextSelector(
    FWBChatContext,
    (context) => context.activeTab
  )
  const setActiveTab = useContextSelector(
    FWBChatContext,
    (context) => context.setActiveTab
  )

  return (
    <section className="flex cursor-pointer text-xs">
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

export default MobileTabsSelector

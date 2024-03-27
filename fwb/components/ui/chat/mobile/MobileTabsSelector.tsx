'use client'

import { Dispatch, SetStateAction } from 'react'

interface MobileTabsSelectorProps {
  activeTab: 'general' | 'groups'
  setActiveTab: Dispatch<SetStateAction<'general' | 'groups'>>
}

const MobileTabsSelector = ({
  activeTab,
  setActiveTab,
}: MobileTabsSelectorProps) => {
  return (
    <section className="flex text-xs cursor-pointer">
      <article
        className={`w-1/2 text-center border-b pb-2 ${activeTab === 'general' ? '' : ' opacity-25'}`}
        onClick={() => setActiveTab('general')}
      >
        General
      </article>
      <article
        className={`w-1/2 text-center border-b pb-2 ${activeTab == 'groups' ? '' : ' opacity-25'}`}
        onClick={() => setActiveTab('groups')}
      >
        Groups
      </article>
    </section>
  )
}

export default MobileTabsSelector

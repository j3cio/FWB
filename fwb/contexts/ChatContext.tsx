'use client'

import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { createContext } from 'use-context-selector'

interface ChatContextInterface {
  showChatDetails: boolean
  setShowChatDetails: Dispatch<SetStateAction<boolean>>
  activeTab: 'general' | 'groups'
  setActiveTab: Dispatch<SetStateAction<'general' | 'groups'>>
  customActiveChannel: string
  setCustomActiveChannel: Dispatch<SetStateAction<string>>
}

// named this way to prevent any confusion with getStream's ChatContext
export const FWBChatContext = createContext<ChatContextInterface>({
  showChatDetails: false,
  setShowChatDetails: () => {},
  activeTab: 'general',
  setActiveTab: () => {},
  customActiveChannel: '',
  setCustomActiveChannel: () => {},
})

const FWBChatProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'groups'>('general')
  const [showChatDetails, setShowChatDetails] = useState(false)
  const [customActiveChannel, setCustomActiveChannel] = useState('')

  return (
    <FWBChatContext.Provider
      value={{
        activeTab,
        setActiveTab,
        showChatDetails,
        setShowChatDetails,
        customActiveChannel,
        setCustomActiveChannel,
      }}
    >
      {children}
    </FWBChatContext.Provider>
  )
}

export default FWBChatProvider

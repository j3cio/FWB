'use client'

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react'

interface ChatContextInterface {
  showChatDetails: boolean
  setShowChatDetails: Dispatch<SetStateAction<boolean>>
  activeTab: 'general' | 'groups'
  setActiveTab: Dispatch<SetStateAction<'general' | 'groups'>>
}

// named this way to prevent any confusion with getStream's ChatContext
export const FWBChatContext = createContext<ChatContextInterface>({
  showChatDetails: false,
  setShowChatDetails: () => {},
  activeTab: 'general',
  setActiveTab: () => {},
})

const FWBChatProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'groups'>('general')
  const [showChatDetails, setShowChatDetails] = useState(false)

  return (
    <FWBChatContext.Provider
      value={{
        activeTab,
        setActiveTab,
        showChatDetails,
        setShowChatDetails,
      }}
    >
      {children}
    </FWBChatContext.Provider>
  )
}

export default FWBChatProvider

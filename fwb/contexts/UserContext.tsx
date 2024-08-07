'use client'

import { TestUser } from '@/app/types/types'
import { ReactNode, useState } from 'react'

import { createContext } from 'use-context-selector'

interface UserContextProps {
  userData: TestUser | null
  setUserData: (userData: TestUser) => void
}

export const UserContext = createContext<UserContextProps>({
  userData: null,
  setUserData: () => {},
})

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userData, setUserData] = useState<TestUser | null>(null)

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}

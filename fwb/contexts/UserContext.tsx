'use client'

import { ReactNode, useState } from 'react'

import { createContext } from 'use-context-selector'

import { UserData } from '@/app/types/types'

interface UserContextProps {
  userData: UserData | null
  setUserData: (userData: UserData) => void
}

export const UserContext = createContext<UserContextProps>({
  userData: null,
  setUserData: () => {},
})

interface UserProviderProps {
  children: ReactNode
  initialUserData: UserData
}

export const UserProvider = ({
  children,
  initialUserData,
}: UserProviderProps) => {
  const [userData, setUserData] = useState<UserData | null>(initialUserData)

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}

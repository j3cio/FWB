'use client'

import { useContext } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Event } from 'stream-chat'
import { useChatContext } from 'stream-chat-react'
import { useAuth } from '@clerk/nextjs'
import { Button } from '@mui/material'
import AvatarIcon from '@mui/material/Avatar'
import { useTheme } from '@mui/material/styles'

import { User, UserData } from '@/app/types/types'

import { FWBChatContext } from '@/contexts/ChatContext'

import WhiteArrowForward from '@/components/ui/profile/WhiteArrowForward'

import MembersIcon from '../icons/membersicon.svg'
import Pencil from '../icons/pencil.svg'
import Settings from '../icons/settings.svg'
import SearchBar from './SearchBar'

const Member = ({ user }: { user: User }) => {
  const theme = useTheme() // To call useTheme you have to add "use client;" to the top of your file
  const { client } = useChatContext()
  const { userId } = useAuth()
  const router = useRouter()

  const { setCustomActiveChannel } = useContext(FWBChatContext)

  async function handleActiveChannel(channelId: string) {
    let subscription: { unsubscribe: () => void } | undefined

    subscription = client.on('channels.queried', (event: Event) => {
      const loadedChannelData = event.queriedChannels?.channels.find(
        (response) => response.channel.id === channelId
      )

      if (loadedChannelData) {
        console.log('found channel', channelId)
        setCustomActiveChannel(channelId)
        subscription?.unsubscribe()
        return
      }
    })
  }

  // This function takes in the userId of the person you are starting a chat with and will create a chat with them.
  async function startChat(userId: any) {
    try {
      const channel = client.channel('messaging', {
        members: [userId, user.user_id],
      })
      const response = await channel.create()
      handleActiveChannel(response.channel.id) //
      router.push('/chat')
    } catch (error) {
      console.error(error)
      alert('Error creating channel')
    }
  }

  return (
    <div className="my-4 flex flex-row justify-between bg-[#1a1a23] text-white">
      <div className="flex items-center justify-center">
        <div onClick={() => {router.push(`/profile/${user.user_id}`)}}>
        <AvatarIcon />
        </div>
        <div className="ml-2 flex flex-col">
          <div className="font-bold">{user.username}</div>
          {user.company && (
            <div className=" font-light">Company: {user.company}</div>
          )}
        </div>
      </div>
      <div className="mr-4 flex items-center justify-center">
        <div className="mr-2">
          <Image
            src={Settings}
            alt="Image Alt Text"
            className="object-cover object-center"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
            }}
          />
        </div>
        {userId === user.user_id ? (
          ''
        ) : (
          <Button
            endIcon={<WhiteArrowForward />} // change this eventually
            variant="contained"
            sx={{
              borderRadius: 28,
              bgcolor: `${theme.palette.primary.dark}`, // Non-hover color
              color: `${theme.palette.common.white}`,
              ':hover': {
                bgcolor: `${theme.palette.primary.dark}`, // Hover background color
                color: `${theme.palette.common.white}`, // Hover text color
              },
            }}
            onClick={() => startChat(userId)}
          >
            Send Message
          </Button>
        )}
      </div>
    </div>
  )
}

const MembersSection = ({ userData }: { userData: UserData[] }) => {
  return (
    <div className="my-2">
      <h1 className="my-7 font-urbanist text-2xl font-semibold text-[#F6FF82]">
        Members
      </h1>
      <div className="w-[60%]">
        <SearchBar />
        {userData.map((user: UserData, index: number) => (
          <Member key={index} user={user.users[0]} />
        ))}
      </div>
    </div>
  )
}

export default MembersSection

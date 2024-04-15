'use client'
import { User, UserData } from '@/app/types/types'
import WhiteArrowForward from '@/components/ui/profile/WhiteArrowForward'
import { useAuth } from '@clerk/nextjs'
import { Button } from '@mui/material'
import AvatarIcon from '@mui/material/Avatar'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useChatContext } from 'stream-chat-react'
import MembersIcon from '../icons/membersicon.svg'
import Pencil from '../icons/pencil.svg'
import Settings from '../icons/settings.svg'
import SearchBar from './SearchBar'

const Member = ({ user }: { user: User }) => {
  const theme = useTheme() // To call useTheme you have to add "use client;" to the top of your file
  const { client } = useChatContext()
  const { userId } = useAuth()
  const router = useRouter()

  // This function takes in the userId of the person you are starting a chat with and will create a chat with them.
  async function startChat(userId: any) {
    try {
      const channel = client.channel('messaging', {
        members: [userId, user.user_id],
      })
      await channel.create()
      router.push('/chat')
    } catch (error) {
      console.error(error)
      alert('Error creating channel')
    }
  }

  return (
    <div className="my-4 flex flex-row justify-between bg-[#1a1a23] text-white">
      <div className="flex items-center justify-center">
        <AvatarIcon />
        <div className="ml-2 flex flex-col">
          <div className="font-bold">{user.username}</div>
          <div className=" font-light">Company: {user.company}</div>
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

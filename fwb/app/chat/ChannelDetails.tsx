import DesktopMessageListTopBar from '@/components/ui/chat/desktop/DesktopMessageListTopBar'
import { useChatContext } from 'stream-chat-react'
import { User } from '../types/types'
import { useEffect, useState } from 'react'
import supabaseClient from '@/supabase'
import Image from 'next/image'
import SmallCustomSwitch from '@/components/ui/chat/SmallCustomSwitch'
import MuteIcon from '@/components/ui/chat/icons/MuteIcon'
import ShareIcon from '@/components/ui/chat/icons/ShareIcon'
import CustomOption from './details/[user_id]/CustomOption'
import BlockIcon from '@/components/ui/chat/icons/BlockIcon'
import DeleteRedIcon from '@/components/ui/chat/icons/DeleteRedIcon'
import ReportRedIcon from '@/components/ui/chat/icons/ReportRedIcon'

interface ChannelDetailsProps {
  user: User
}
const ChannelDetails = ({ user }: ChannelDetailsProps) => {
  const [userDetails, setUserDetails] = useState<User>()
  const [muteMessages, setMuteMessages] = useState(false) // Temporarily just modifies state for now. In future there should be some kind of async action here. Maybe on getstream itself once we're done doing UI.

  const { channel } = useChatContext()

  const currentUserId = user.user_id
  const recipients = channel?.state.members
  const membersArray = recipients && Object.values(recipients)

  const recipient =
    membersArray &&
    membersArray.find((member) => member.user_id !== currentUserId)?.user

  useEffect(() => {
    let subscribe = true
    if (subscribe) {
      const fetchData = async () => {
        const supabaseToken = await window.Clerk.session.getToken({
          template: 'supabase',
        })

        const supabase = await supabaseClient(supabaseToken)

        let { data: users, error } = await supabase
          .from('users')
          .select('*')
          .eq('user_id', recipient?.id)

        if (users) {
          setUserDetails(users[0])
        }

        if (error) {
          console.error(error)
        }
      }

      fetchData()
    }

    return () => {
      subscribe = false
    }
  }, [recipient])

  return (
    <section
      className="z-10 flex max-h-[500px] min-h-[300px] w-full flex-col rounded-lg bg-[#313139] px-4 text-white md:w-[717px]  lg:h-[771px] lg:max-h-[771px]  lg:w-[282px] lg:min-w-[282px]"
      style={{ height: '771px' }}
    >
      <DesktopMessageListTopBar isDetails />
      <div className="flex flex-grow flex-col">
        <div className="profile__details flex h-full w-full flex-col px-4 pb-6">
          {userDetails ? (
            <div className="flex h-full w-full flex-col justify-between">
              <div className="w-full">
                <div className="chat-details__user flex flex-col items-center pb-8">
                  <Image
                    src={userDetails.profile_picture_url}
                    alt={`profile picture for ${userDetails.username}`}
                    width={88}
                    height={88}
                    className=" rounded-full"
                    priority
                  />
                  <h1 className="pt-2 font-semibold">{userDetails.username}</h1>
                  {userDetails.company ? (
                    <p className="text-center text-xs">
                      Works at {userDetails?.company}
                    </p>
                  ) : null}
                </div>
                <button className="h-9 w-full rounded-3xl bg-[#8E94E9] font-bold">
                  Open Profile
                </button>

                <div className="flex w-full flex-col pt-3 text-xs">
                  <article
                    className="flex justify-between"
                    onClick={() => setMuteMessages(!muteMessages)}
                  >
                    <CustomOption icon={<MuteIcon />}>
                      Mute Messages
                    </CustomOption>
                    <SmallCustomSwitch checked={muteMessages} />
                  </article>

                  <CustomOption icon={<ShareIcon />}>
                    Share Profile
                  </CustomOption>
                </div>
              </div>

              <div className="flex-col gap-1 self-start pb-11">
                <CustomOption
                  icon={<BlockIcon />}
                  handleClick={() => console.log('blocking')}
                >
                  Block
                </CustomOption>
                <CustomOption
                  icon={<ReportRedIcon />}
                  handleClick={() => console.log('Reporting')}
                >
                  Report
                </CustomOption>
                <CustomOption
                  icon={<DeleteRedIcon />}
                  handleClick={() => console.log('Delete')}
                >
                  Delete Messages
                </CustomOption>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default ChannelDetails

'use client'
import { Group, UserData } from '@/app/types/types'
import { Avatar, Box, Button, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import MembersIcon from '../icons/membersicon.svg'
import Pencil from '../icons/pencil.svg'
import InviteMemberIcon from '../icons/InviteMemberIcon'
import LockIconYellow from '../icons/LockIconYellow'
import LockIcon from '../icons/LockIcon'
import { useState } from 'react'
import GroupInviteModal from './GroupInviteModal'

const GroupDetailsSection = ({
  groupData,
  userData,
}: {
  groupData: Group
  userData: UserData[]
}) => {
  const theme = useTheme() // To call useTheme you have to add "use client;" to the top of your file
  const [isGroupInviteModalOpen, setIsGroupInviteModalOpen] = useState(false)

  const openGroupInviteModal = () => {
    setIsGroupInviteModalOpen(true)
  }

  const closeGroupInviteModal = () => {
    setIsGroupInviteModalOpen(false)
  }

  return (
    <Box className="flex h-2/3 w-full flex-col border-none">
      <Box className="relative w-full">
        <Image
          priority
          className="h-full w-full"
          src={`/groups/pg-bg2.png`}
          height={0}
          width={1200}
          alt="group-img"
        />
        <LockIcon className="absolute right-2 top-2 w-fit rounded-full bg-[#fff] p-3" />
      </Box>
      <div className="relative flex items-center justify-between bg-[#1a1a23] px-4">
        <div className="absolute -top-16 left-36 -translate-x-1/2 transform rounded-full">
          <Avatar
            sx={{
              width: 150,
              height: 150,
              border: '4px solid black',
            }}
          />
        </div>
        <div className="mt-28 flex w-full justify-between gap-4 sm-max:flex-col xs-max:flex-col xxs-max:flex-col">
          <div className="flex max-w-[50%] flex-col gap-3 text-white sm-max:max-w-full xs-max:max-w-full xxs-max:max-w-full">
            <div className="flex items-start gap-1">
              <p className="flex flex-col text-2xl capitalize">
                {groupData.name}
                <span className="flex items-center gap-1 text-xs text-yellow-300">
                  <LockIconYellow />
                  Private Group
                </span>
              </p>
              <div>
                <Image
                  src={Pencil}
                  alt="Image Alt Text"
                  className="object-cover object-center"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>
            {groupData.description && (
              <div className=""> {groupData?.description}</div>
            )}
          </div>

          <div className="flex flex-row-reverse items-center justify-between gap-3 text-white xxl-max:flex-col xl-max:flex-col lg-max:flex-col sm-max:w-full xs-max:w-full xxs-max:w-full">
            <div className="flex flex-col gap-1">
              <Image
                src="/groups/AvatarContainer.svg"
                alt="empty avatars"
                className="w-full"
                width={0}
                height={0}
              />
              <p className="text-sm">+50 more members</p>
            </div>
            <div className="">
              <Button
                endIcon={<InviteMemberIcon />}
                variant="outlined"
                className="rounded-2xl border border-white px-4 py-1 text-white"
                onClick={openGroupInviteModal}
              >
                Invite Members
              </Button>
            </div>
          </div>
        </div>
        <GroupInviteModal
          isOpen={isGroupInviteModalOpen}
          onClose={closeGroupInviteModal}
        />
      </div>
    </Box>
  )
}

export default GroupDetailsSection

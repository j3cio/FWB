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
    <Box className="h-2/3 w-full border-none my-10 flex flex-col">
      <Box className="w-full relative">
        <Image
          priority
          className="w-full h-full"
          src={`/groups/pg-bg2.png`}
          height={0}
          width={1200}
          alt="group-img"
        />
        <LockIcon className="absolute top-2 right-2 bg-[#fff] rounded-full p-3 w-fit" />
      </Box>
      <div className="flex justify-between items-center relative px-4 bg-[#1a1a23]">
        <div className="absolute -top-16 left-36 transform -translate-x-1/2 rounded-full">
          <Avatar
            sx={{
              width: 150,
              height: 150,
              border: '4px solid black',
            }}
          />
        </div>
        <div className="mt-36 flex xxs-max:flex-col xs-max:flex-col sm-max:flex-col gap-4 justify-between">
          <div className="text-white flex flex-col gap-3 xxs-max:max-w-full xs-max:max-w-full sm-max:max-w-full max-w-[50%]">
            <div className="flex items-start gap-1">
              <p className="text-2xl capitalize flex flex-col">
                {groupData.name}
                <span className="text-yellow-300 flex items-center gap-1 text-xs">
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

          <div className="text-white xxs-max:w-full xs-max:w-full sm-max:w-full flex flex-row-reverse justify-between items-center lg-max:flex-col xl-max:flex-col xxl-max:flex-col gap-3">
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
                className="rounded-2xl px-4 py-1 text-white border border-white"
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

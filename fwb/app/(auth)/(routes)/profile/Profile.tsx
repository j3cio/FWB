'use client'

import WhiteArrowForward from '@/components/ui/profile/WhiteArrowForward'
import { useAuth, useUser } from '@clerk/nextjs'
import { Box, Button, Container } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import { useTheme } from '@mui/material/styles'
import { useCallback, useState } from 'react'
import EditProfileModal from './EditProfileModal'

import useIntitialChatClient from '@/app/chat/useIntializeChatClient'

import { TestUserData } from '../../../types/types'

interface ProfileProps {
  userData: TestUserData
  isPublic: boolean
}

function Profile({ userData, isPublic }: ProfileProps) {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false)
  // It is hard to use the theme colors if they are not a specific MUI component, some colors are not showing up
  const theme = useTheme() // To call useTheme you have to add "use client;" to the top of your file
  const { getToken } = useAuth()

  // //Intialize the user to be in GetStream db
  const client = useIntitialChatClient()

  const { user } = useUser()

  const openEditProfileModal = useCallback(() => {
    setIsEditProfileModalOpen(true)
  }, [])
  const closeEditProfileModal = useCallback(() => {
    setIsEditProfileModalOpen(false)
  }, [])

  return (
    <Box sx={{ backgroundColor: '#1A1A23' }}>
      <Container disableGutters maxWidth="lg">
        <div className="bg-[#1a1a23]">
          {/*Container div*/}
          <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
            {/*Profile div*/}

            <div className="mb-[50px] mt-10 flex h-1/5 w-full gap-10 border-b-2 border-slate-200 pb-[95px] sm-max:mt-8 sm-max:flex-col sm-max:gap-4 sm-max:pb-6 xs-max:mt-6 xs-max:flex-col xs-max:gap-3 xs-max:pb-4 xxs-max:mt-4 xxs-max:flex-col xxs-max:gap-3 xxs-max:pb-4">
              {user ? (
                <Avatar
                  alt="123"
                  src={`${userData.users[0].profile_picture_url}`}
                  className="flex h-[190px] w-48 items-center justify-center rounded-full bg-slate-200 sm-max:h-[102px] sm-max:w-[102px] xs-max:h-[92px] xs-max:w-[92px] xxs-max:h-[92px] xxs-max:w-[92px]"
                />
              ) : (
                <div className="flex h-[190px] w-48 items-center justify-center rounded-full bg-slate-200 sm-max:h-[102px] sm-max:w-[102px] xs-max:h-[92px] xs-max:w-[92px] xxs-max:h-[92px] xxs-max:w-[92px]"></div>
              )}
              <div className="flex grow flex-col justify-center">
                <div className="mb-[4px] text-[35px] font-semibold leading-none text-slate-200 sm-max:text-[28px] xs-max:text-[24px] xxs-max:text-[24px]">
                  {userData.users[0].username}
                </div>
                {userData.users[0].company && (
                  <div className="mb-[16px] flex flex-row sm-max:text-[14px] xs-max:text-[12px] xxs-max:text-[12px]">
                    <div className="mr-1 text-slate-200">Benefits from: </div>
                    <div className=" text-yellow-200">
                      {userData.users[0].company}
                    </div>
                  </div>
                )}
                {!isPublic ? (
                  <div className="my-2 flex gap-2">
                    <Button
                      endIcon={<WhiteArrowForward />}
                      variant="contained"
                      sx={{
                        borderRadius: 28,
                        borderStyle: 'solid',
                        borderColor: 'white',
                        borderWidth: 2,
                        bgcolor: `${theme.palette.neutral.n900}`,
                        color: `${theme.palette.common.white}`,
                        ':hover': {
                          bgcolor: `${theme.palette.neutral.n900}`, // Hover background color
                          color: `${theme.palette.common.white}`, // Hover text color
                        },
                      }}
                      onClick={openEditProfileModal}
                    >
                      Edit Profile
                    </Button>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>

            {/*My Benefits div*/}
          </div>
          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            onClose={closeEditProfileModal}
            userData={userData}
          />
        </div>
      </Container>
    </Box>
  )
}

export default Profile

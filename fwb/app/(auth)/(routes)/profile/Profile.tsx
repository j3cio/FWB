'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Box, Button, Container, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useUser, useAuth } from '@clerk/nextjs'
import Avatar from '@mui/material/Avatar'
import EditProfileModal from './EditProfileModal'
import CreateDiscountCard from '@/components/ui/addbenefit/CreateDiscountCard'
import Navbar from '@/components/ui/navbar/Navbar'
import WhiteArrowForward from '@/components/ui/profile/WhiteArrowForward'
import BlueGroupIcon from '../../../../components/ui/profile/icons/groups-blue.svg'
import DiscountCard from '@/components/ui/privategroups/groupdetailspage/DiscountCard'
import BlueArrowForward from '@/components/ui/addbenefit/BlueArrowForward'
//import AvatarIcon from "@mui/material/Avatar";
//import LinkedInIcon from "../../components/ui/profile/icons/linkedin.svg";

import useIntitialChatClient from '@/app/chat/useIntializeChatClient'

import { UserData } from '../../../types/types'
import { DiscountData } from '../../../types/types'

interface ProfileProps {
  userData: UserData
  discountData: DiscountData[]
}

function Profile({ userData, discountData }: ProfileProps) {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false)
  // It is hard to use the theme colors if they are not a specific MUI component, some colors are not showing up
  const theme = useTheme() // To call useTheme you have to add "use client;" to the top of your file
  const { getToken } = useAuth()
  //Intialize the user to be in GetStream db
  const client = useIntitialChatClient()
  const { user } = useUser()

  const openEditProfileModal = () => {
    setIsEditProfileModalOpen(true)
  }

  const closeEditProfileModal = () => {
    setIsEditProfileModalOpen(false)
  }

  return (
    <Box sx={{ backgroundColor: '#1A1A23', minHeight: '100vh' }}>
      <Container disableGutters maxWidth="lg">
        <Navbar />
        <div className="min-h-screen bg-[#1a1a23]">
          {/*Container div*/}
          <div className="flex h-full w-full flex-1 flex-col items-center justify-center px-[18px] sm-max:items-start sm-max:px-8 xs-max:items-start xs-max:px-6 xxs-max:items-start xxs-max:px-4">
            {/*Profile div*/}
            <div className="mb-[50px] mt-10 flex h-1/5 w-full gap-10 border-b-2 border-slate-200 pb-[95px] sm-max:mt-8 sm-max:flex-col sm-max:gap-4 sm-max:pb-6 xs-max:mt-6 xs-max:flex-col xs-max:gap-3 xs-max:pb-4 xxs-max:mt-4 xxs-max:flex-col xxs-max:gap-3 xxs-max:pb-4">
              {user ? <Avatar
                alt="123"
                src={`${user?.imageUrl}`}
                className="flex h-[190px] w-48 items-center justify-center rounded-full bg-slate-200 sm-max:h-[102px] sm-max:w-[102px] xs-max:h-[92px] xs-max:w-[92px] xxs-max:h-[92px] xxs-max:w-[92px]"
              /> : <div> </div>}
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
              </div>
            </div>
            {/*Bargains div*/}
            <div className="flex w-full grow flex-col gap-6">
              <CreateDiscountCard />
              <div className="flex h-2/5 w-full xxl-max:hidden xl-max:hidden lg-max:hidden">
                <a className="min-w-full" href="/addbenefit">
                  <div className='flex rounded-[32px] bg-[url("/profilebanner-sm.svg")] bg-cover py-5 sm-max:py-[10%]'>
                    <div className="flex flex-col items-start gap-2 px-4 pb-5 pt-8">
                      <h1 className="text-xl font-medium text-[#F6FF82] sm-max:text-3xl">
                        Booty Call <br /> For Bargains!
                      </h1>
                      <Button
                        endIcon={<BlueArrowForward />}
                        variant="contained"
                        className="rounded-[32px] border-2 border-white bg-[#F6FF82] text-sm font-medium normal-case text-[#8E94E9] sm-max:text-lg"
                      >
                        Share your discount
                      </Button>
                    </div>
                  </div>
                </a>
              </div>
              <div className="flex h-2/5 gap-6">
                <a
                  href="groups"
                  className="flex h-[126px] flex-1 items-center gap-6 rounded-3xl bg-white"
                >
                  <div className="mx-6 flex flex-col">
                    <div className="text-2xl font-semibold sm-max:text-xl xs-max:text-lg xxs-max:text-lg">
                      Private Groups
                    </div>
                    <div className="text-[14px] sm-max:text-[10px] xs-max:text-[10px] xxs-max:text-[10px]">
                      Get intimate with discounts in private groups
                    </div>
                  </div>
                  <div className="mx-10 flex grow flex-row-reverse">
                    <Image
                      src={BlueGroupIcon}
                      alt="Group Icon"
                      width={50}
                      height={50}
                    />
                    {/* Need custom icon for it to show*/}
                  </div>
                </a>
              </div>
            </div>
            {/*My Benefits div*/}
            <div className="my-[80px] flex h-1/5 w-full flex-col rounded-lg sm-max:my-10 xs-max:my-8 xxs-max:my-6">
              <div className="flex h-full w-full flex-col">
                <div className="flex h-2/5 border-b-2 border-slate-200 text-3xl text-white sm-max:text-xl xs-max:text-xl xxs-max:text-xl">
                  My Benefits!
                </div>
                {discountData && discountData.length > 0 ? (
                  <div className=" mt-12 flex justify-center">
                    <Box
                      sx={{
                        flexGrow: 1,
                        paddingBottom: '20px',
                        justifyContent: 'center',
                        minHeight: '100%',
                      }}
                    >
                      <Grid
                        container
                        spacing={2}
                        rowGap={2}
                        sx={{ gap: '64px', paddingLeft: '24px' }}
                      >
                        {discountData.map((company: any, index: React.Key) => (
                          <div key={`${company} - ${index}`}>
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              md={3}
                              sx={{ width: '282px', height: '322px' }}
                            >
                              <DiscountCard company={company} />
                            </Grid>
                          </div>
                        ))}
                      </Grid>
                    </Box>
                  </div>
                ) : (
                  <>
                    <div className="mt-[120px] flex h-1/4 items-center justify-center text-3xl text-yellow-200 sm-max:mt-10 sm-max:text-xl xs-max:mt-10 xs-max:text-xl xxs-max:mt-10 xxs-max:text-xl">
                      Be the wingman to a friend&apos;s wallet now!
                    </div>
                    <div className="mt-[24px] flex grow items-center justify-center">
                      <a href="/addbenefit">
                        <Button
                          endIcon={<WhiteArrowForward />}
                          variant="contained"
                          sx={{
                            borderRadius: 28,
                            borderStyle: 'solid',
                            borderColor: 'white',
                            borderWidth: 2,
                            fontSize: '14px',
                            fontWeight: 'semiBold',
                            bgcolor: `${theme.palette.neutral.n900}`,
                            color: `${theme.palette.common.white}`,
                            ':hover': {
                              bgcolor: `${theme.palette.neutral.n900}`, // Hover background color
                              color: `${theme.palette.common.white}`, // Hover text color
                            },
                          }}
                        >
                          Share your discounts
                        </Button>
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
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

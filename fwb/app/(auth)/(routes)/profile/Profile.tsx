'use client'

import Navbar from '@/components/ui/profile/profile_navbar'
import WhiteArrowForward from '@/components/ui/profile/WhiteArrowForward'
import { Box, Button, Container, Grid } from '@mui/material'
//import AvatarIcon from "@mui/material/Avatar";
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import BlueGroupIcon from '../../../../components/ui/profile/icons/groups-blue.svg'
//import LinkedInIcon from "../../components/ui/profile/icons/linkedin.svg";
import useIntitialChatClient from '@/app/chat/useIntializeChatClient'
import { useUser } from '@clerk/nextjs'
import Avatar from '@mui/material/Avatar'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import SaveIcon from '../../../../components/ui/profile/icons/save.svg'
import { DiscountData, UserData } from '../../../types/types'
import EditProfileModal from './EditProfileModal'
import CreateDiscountCard from '@/components/ui/addbenefit/CreateDiscountCard'
import DiscountCard from '@/components/ui/privategroups/groupdetailspage/DiscountCard'

interface ProfileProps {
  userData: UserData
  discountData: DiscountData[]
}

function Profile({ userData, discountData }: ProfileProps) {
  // It is hard to use the theme colors if they are not a specific MUI component, some colors are not showing up
  const theme = useTheme() // To call useTheme you have to add "use client;" to the top of your file

  //Intialize the user to be in GetStream db
  const client = useIntitialChatClient()

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false)

  const openEditProfileModal = () => {
    setIsEditProfileModalOpen(true)
  }

  const closeEditProfileModal = () => {
    setIsEditProfileModalOpen(false)
  }

  const { user } = useUser()
  const router = useRouter()
  const [companyQuery, setCompanyQuery] = useState('')

  const handleSearch = (companyQuery: any) => {
    const url = `/explore?company=${companyQuery}`
    router.push(url)
  }

  return (
    <Box sx={{ backgroundColor: '#1A1A23', minHeight: '100vh' }}>
      <Container disableGutters maxWidth="lg">
        <Navbar
          handleSearch={handleSearch}
          companyQuery={companyQuery}
          setCompanyQuery={setCompanyQuery}
        />
        <div className="bg-[#1a1a23] min-h-screen">
          {/*Container div*/}
          <div className="flex flex-1 flex-col h-full w-full items-center justify-center px-[120px]">
            {/*Profile div*/}
            <div className="flex w-full h-1/5 mt-[95px] mb-[50px] gap-10 border-b-2 border-slate-200 pb-[95px]">
              <Avatar
                alt="123"
                src={`${user?.imageUrl}`}
                className="flex bg-slate-200 w-48 justify-center items-center"
                sx={{ width: '180px', height: '190px', borderRadius: '50%' }}
              />
              <div className="flex flex-col grow justify-center">
                <div className="text-slate-200 text-[35px] mb-[4px] leading-none font-semibold">
                  {userData.users[0].username}
                </div>
                {userData.users[0].company && (
                  <div className="flex flex-row mb-[16px]">
                    <div className="mr-1 text-slate-200">Benefits from: </div>
                    <div className=" text-yellow-200">
                      {userData.users[0].company}
                    </div>
                  </div>
                )}
                <div className="flex my-2 gap-2">
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
            <div className="flex flex-col w-full grow gap-6">
              <CreateDiscountCard />
              <div className="flex h-2/5 gap-6">
                <a
                  href="profile"
                  className="flex flex-1 bg-white rounded-3xl items-center gap-6 h-[126px]"
                >
                  <div className="flex flex-col mx-6">
                    <div className="font-semibold text-2xl">Private Groups</div>
                    <div className="text-[14px]">
                      Get intimate with discounts in private groups
                    </div>
                  </div>
                  <div className="flex flex-row-reverse grow mx-10">
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
            <div className="flex flex-col w-full h-1/5 my-[80px] rounded-lg">
              <div className="flex flex-col h-full w-full">
                <div className="flex h-2/5 border-b-2 border-slate-200 text-3xl text-white">
                  My Benefits!
                </div>
                {discountData && discountData.length > 0 ? (
                  <div className=" flex justify-center mt-12">
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
                        sx={{ gap: '64px', marginLeft: '14px' }}
                      >
                        {discountData.map((company: any, index: React.Key) => (
                          <>
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              md={3}
                              key={index}
                              sx={{ width: '282px', height: '322px' }}
                            >
                              <DiscountCard company={company} />
                            </Grid>
                          </>
                        ))}
                      </Grid>
                    </Box>
                  </div>
                ) : (
                  <>
                    <div className="flex h-1/4 items-center justify-center text-yellow-200 mt-[120px] text-3xl">
                      Be the wingman to a friend&apos;s wallet now!
                    </div>
                    <div className="flex grow items-center justify-center mt-[24px]">
                      <a href="/intakeform">
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

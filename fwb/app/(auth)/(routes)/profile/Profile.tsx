'use client'

import { useCallback, useContext, useEffect, useState } from 'react'
import Navbar from '@/components/ui/profile/profile_navbar'
import WhiteArrowForward from '@/components/ui/profile/WhiteArrowForward'
import { Box, Button, Container, Grid } from '@mui/material'
//import AvatarIcon from "@mui/material/Avatar";
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import BlueGroupIcon from '../../../../components/ui/profile/icons/groups-blue.svg'
//import LinkedInIcon from "../../components/ui/profile/icons/linkedin.svg";
import useIntitialChatClient from '@/app/chat/useIntializeChatClient'
import { useUser, useAuth } from '@clerk/nextjs'
import Avatar from '@mui/material/Avatar'
import { useRouter } from 'next/navigation'
import SaveIcon from '../../../../components/ui/profile/icons/save.svg'
import { UserData } from '../../../types/types'
import EditProfileModal from './EditProfileModal'
import CreateDiscountCard from '@/components/ui/addbenefit/CreateDiscountCard'
import { SearchContext } from '@/contexts/SearchContext'
import { fuzzySearch, getSearchIndex } from '@/lib/utils'
import { DiscountData } from '../../../types/types'

import DiscountCard from '@/components/ui/privategroups/groupdetailspage/DiscountCard'
import BlueArrowForward from '@/components/ui/addbenefit/BlueArrowForward'

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
  const router = useRouter()
  const {
    searchQuery,
    setSearchQuery,
    searchIndex,
    setSearchIndex,
    setSearchResults,
  } = useContext(SearchContext)

  const openEditProfileModal = () => {
    setIsEditProfileModalOpen(true)
  }

  const closeEditProfileModal = () => {
    setIsEditProfileModalOpen(false)
  }

  const handleSearch = async () => {
    try {
      const results = await fuzzySearch({ searchIndex, searchQuery })

      setSearchResults(results)
      router.push('/explore')
    } catch (error) {
      console.error(error)
    }
  }

  const fetchSearchIndex = useCallback(async () => {
    try {
      const bearerToken = await getToken()

      if (bearerToken) {
        const companiesIndex = await getSearchIndex({
          bearer_token: bearerToken,
        })
        setSearchIndex(companiesIndex)
      }
    } catch (error) {
      console.error(error)
    }
  }, [getToken, setSearchIndex])

  useEffect(() => {
    fetchSearchIndex()
  }, [fetchSearchIndex])

  return (
    <Box sx={{ backgroundColor: '#1A1A23', minHeight: '100vh' }}>
      <Container disableGutters maxWidth="lg">
        <Navbar
          handleSearch={handleSearch}
          companyQuery={searchQuery}
          setCompanyQuery={setSearchQuery}
        />
        <div className="bg-[#1a1a23] min-h-screen">
          {/*Container div*/}
          <div className="flex flex-1 flex-col h-full w-full xxs:items-start xs:items-start sm:items-start items-center justify-center xxs:px-4 xs:px-6 sm:px-8 px-[120px]">
            {/*Profile div*/}
            <div className="flex xxs:flex-col xs:flex-col sm:flex-col w-full h-1/5 xxs:mt-4 xs:mt-6 sm:mt-8 mt-[95px] mb-[50px] xxs:gap-3 xs:gap-3 sm:gap-4 gap-10 border-b-2 border-slate-200 xxs:pb-4 xs:pb-4 sm:pb-6 pb-[95px]">
              <Avatar
                alt="123"
                src={`${user?.imageUrl}`}
                className="flex xxs:h-[92px] xxs:w-[92px] xs:h-[92px] xs:w-[92px] sm:h-[102px] sm:w-[102px] h-[190px] w-48 rounded-full bg-slate-200 justify-center items-center"
              />
              <div className="flex flex-col grow justify-center">
                <div className="text-slate-200 xxs:text-[24px] xs:text-[24px] sm:text-[28px] text-[35px] mb-[4px] leading-none font-semibold">
                  {userData.users[0].username}
                </div>
                {userData.users[0].company && (
                  <div className="xxs:text-[12px] xs:text-[12px] sm:text-[14px] flex flex-row mb-[16px]">
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
              <div className="md:hidden lg:hidden xl:hidden xxl:hidden flex w-full h-2/5">
                <a className="min-w-full" href="/intakeform">
                  <div className='flex rounded-[32px] bg-cover py-5 sm:py-[10%] bg-[url("/profilebanner-sm.svg")]'>
                    <div className="flex flex-col items-start gap-2 px-4 pt-8 pb-5">
                      <h1 className="text-[#F6FF82] text-xl sm:text-3xl font-medium">
                        Booty Call <br /> For Bargains!
                      </h1>
                      <Button
                        endIcon={<BlueArrowForward />}
                        variant="contained"
                        className="rounded-[32px] font-medium text-sm sm:text-lg border-2 border-white text-[#8E94E9] bg-[#F6FF82] normal-case"
                      >
                        Share your discount
                      </Button>
                    </div>
                  </div>
                </a>
              </div>
              <div className="flex h-2/5 gap-6">
                <a
                  href="profile"
                  className="flex flex-1 bg-white rounded-3xl items-center gap-6 h-[126px]"
                >
                  <div className="flex flex-col mx-6">
                    <div className="font-semibold xxs:text-lg xs:text-lg sm:text-xl text-2xl">
                      Private Groups
                    </div>
                    <div className="xxs:text-[10px] xs:text-[10px] sm:text-[10px] text-[14px]">
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
            <div className="flex flex-col w-full h-1/5 xxs:my-6 xs:my-8 sm:my-10 my-[80px] rounded-lg">
              <div className="flex flex-col h-full w-full">
                <div className="flex h-2/5 border-b-2 border-slate-200 xxs:text-xl xs:text-xl sm:text-xl text-3xl text-white">
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
                    <div className="flex h-1/4 items-center justify-center text-yellow-200 xxs:mt-10 xs:mt-10 sm:mt-10 mt-[120px] xxs:text-xl xs:text-xl sm:text-xl text-3xl">
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

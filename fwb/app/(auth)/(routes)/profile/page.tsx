import { getAllDiscountsData } from '@/app/api/discounts/utils/fetch_discount_utils'
import { DiscountData, UserData } from '@/app/types/types'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Profile from './Profile'
import CreateDiscountCard from '@/components/ui/addbenefit/CreateDiscountCard'
import { Box, Button, Container, Grid } from '@mui/material'
import BlueArrowForward from '@/components/ui/addbenefit/BlueArrowForward'
import BlueGroupIcon from '@/components/ui/profile/icons/groups-blue.svg'

import Image from 'next/image'
import theme from '@/app/theme'
import DiscountCard from '@/components/ui/privategroups/groupdetailspage/DiscountCard'
import WhiteArrowForward from '@/components/ui/profile/WhiteArrowForward'
import { Suspense } from 'react'
import { generateSkeletons } from '@/components/ui/skeletons/generateSkeletons'

async function getUser(bearer_token: string, supabase_jwt: string) {
  const userId = await auth().userId
  if (!supabase_jwt) {
    console.log('Not signed in')
    return
  }

  var myHeaders = new Headers()
  myHeaders.append('supabase_jwt', supabase_jwt)
  myHeaders.append('Authorization', `Bearer ${bearer_token}`)

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}`,
      requestOptions
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    return result // This returns the result object
  } catch (error) {
    console.error('Error fetching data: ', error)
    throw error // This re-throws the error to be handled by the caller
  }
}

const page = async () => {
  const bearer_token = await auth().getToken({ template: 'testing_template' })
  const supabase_jwt = await auth().getToken({ template: 'supabase' })
  const userData: UserData =
    bearer_token && supabase_jwt
      ? await getUser(bearer_token, supabase_jwt)
      : undefined
  const discountIdArray = userData ? userData.users[0].user_discounts : ['']

  if (
    userData.users[0].hasCompletedFRE[0] &&
    userData.users[0].hasCompletedFRE[1] &&
    userData.users[0].hasCompletedFRE[2]
  ) {
  } else {
    if (!userData || !userData.users[0].hasCompletedFRE[0]) {
      redirect('/fre1')
    } else if (
      !userData.users[0].hasCompletedFRE[2] &&
      !userData.users[0].hasCompletedFRE[1] &&
      userData.users[0].hasCompletedFRE[0]
    ) {
      redirect('/fre2')
    } else if (
      !userData.users[0].hasCompletedFRE[2] &&
      userData.users[0].hasCompletedFRE[1] &&
      userData.users[0].hasCompletedFRE[0]
    ) {
      redirect('/fre3')
    }
  }

  const DiscountButtons = () => {
    return (
      <div>
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
                {/* Need custom icon for it to show */}
              </div>
            </a>
          </div>
        </div>
      </div>
    )
  }

  const Benefits = async ({ userData }: { userData: UserData }) => {
    const discountData: DiscountData[] =
      userData && bearer_token && supabase_jwt
        ? await getAllDiscountsData(discountIdArray, bearer_token, supabase_jwt)
        : []

    const filteredDiscountData = discountData.filter(
      (company) => company !== undefined
    )

    return (
      <div>
        {filteredDiscountData && filteredDiscountData.length > 0 ? (
          <div className="flex w-full justify-center">
            <div className="flex flex-wrap justify-start gap-4 pl-2">
              {filteredDiscountData.map((company: any, index: React.Key) => (
                <DiscountCard company={company} key={crypto.randomUUID()} />
              ))}
            </div>
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
    )
  }

  return (
    <Box
      sx={{ backgroundColor: '#1A1A23', minHeight: '100vh' }}
      className="px-[18px] sm-max:items-start sm-max:px-8 xs-max:items-start xs-max:px-6 xxs-max:items-start xxs-max:px-4"
    >
      <Container disableGutters maxWidth="lg">
        <div>
          <Profile userData={userData} isPublic={false} />
          <DiscountButtons />

          <div className="my-[80px] flex h-2/5 border-b-2 border-slate-200 text-3xl text-white sm-max:text-xl xs-max:text-xl xxs-max:text-xl">
            My Benefits!
          </div>

          <Suspense
            fallback={
              <div className="flex w-full justify-center">
                <div className="flex flex-wrap justify-start gap-4">
                  {generateSkeletons({ type: 'ProductCard', quantity: 8 })}
                </div>
              </div>
            }
          >
            <Benefits userData={userData} />
          </Suspense>
        </div>
      </Container>
    </Box>
  )
}

export default page

'use client'
import { Group, UserData } from '@/app/types/types'
import Navbar from '@/components/ui/privategroups/groupdetailspage/groups_navbar'
import CreateGroupForm from '@/components/ui/privategroups/groups/modal/CreateGroupForm'
import { Box, Button, Container, Modal, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useContext, useEffect, useState } from 'react'
import EndArrow from '../icons/EndArrow'
import EndArrowWhite from '../icons/EndArrowWhite'
import LockIcon from '../icons/LockIcon'
import MoreIcon from '../icons/MoreIcon'
import { SearchContext } from '@/contexts/SearchContext'
import { fuzzySearch, getSearchIndex } from '@/lib/utils'
import { useAuth } from '@clerk/nextjs'

import SingleGroupCard from './GroupCard'

const bgImg = [
  {
    id: 'bg-1',
    img: '/groups/bg-top-right.svg',
  },
  {
    id: 'bg-2',
    img: '/groups/circle-element2.svg',
  },
]

// Type userData
const GroupsHomePage = ({
  userData,
  groupData,
}: {
  userData: UserData
  groupData: Group[]
}) => {
  const [open, setOpen] = useState(false)

  const router = useRouter()
  const { getToken } = useAuth()
  const {
    searchQuery,
    setSearchQuery,
    searchIndex,
    setSearchIndex,
    setSearchResults,
  } = useContext(SearchContext)

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

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    fetchSearchIndex()
  }, [fetchSearchIndex])
    
  const isUserAdmin = (group: Group, userId: string) => {
    if (JSON.parse(group.admins).includes(userId)) {
      return true
    }
    return false
  }

  const handleDeleteTest = async (groupId: string, userGroups: string[]) => {
    console.log("group id:", groupId, "groups:", userGroups )
  }

  const handleDeleteGroup = async (groupId: string, userGroups: string[]) => {
    // Deleting group from groups table
    try {
      const bearerToken = await window.Clerk.session.getToken({
        template: 'testing_template',
      })
      const supabaseToken = await window.Clerk.session.getToken({
        template: 'supabase',
      })
      const response = await fetch(`/api/groups?group_id=${groupId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          supabase_jwt: supabaseToken,
        },
      })
      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error adding user:', errorData)
      }
      const data = await response.json()
      console.log('Group successfully deleted:', data)
    } catch (error) {
      console.error('Error add user:', error)
    }

    // Deleting group from user table, user_groups[]
    try {
      const newUserGroups: string[] = userGroups.filter(
        (group) => group !== groupId
      )
      let newUserGroupsString = '{' + newUserGroups.join(',') + '}'
      const formData = new FormData()
      formData.append('user_id', `${userData.users[0].user_id}`)
      formData.append('user_groups', `${newUserGroupsString}`)
      const bearerToken = await window.Clerk.session.getToken({
        template: 'testing_template',
      })
      const supabaseToken = await window.Clerk.session.getToken({
        template: 'supabase',
      })
      const response = await fetch('/api/users', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          supabase_jwt: supabaseToken,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      router.refresh()
      return data
    } catch (error) {
      console.error('Error updating data: ', error)
      throw error
    }
  }

  if (userData.users[0].user_groups.length == 0) {
    return (
      <section className="w-full h-full">
        <Box
          className="font-urbanist"
          sx={{ backgroundColor: '#1A1A23', minHeight: '100vh' }}
        >
          <Container disableGutters maxWidth="lg" sx={{ paddingX: 6 }}>
            <Navbar
              handleSearch={handleSearch}
              companyQuery={searchQuery}
              setCompanyQuery={setSearchQuery}
            />
            <Typography
              className="font-urbanist"
              sx={{
                fontSize: 24,
                color: '#FFFFFF',
                marginY: 7,
                paddingX: "18px",
                fontWeight: 600,
              }}
            >
              Private Groups
            </Typography>
            <Box className="px-[18px]">
              <Box
                className="flex xxs:flex-col xs:flex-col sm:flex-col flex-row justify-between w-full min-h-[25vh] py-[7%] rounded-3xl bg-[#8E94E9]"
                sx={{
                  backgroundImage: {
                    md: `url(${bgImg[0].img}), url(${bgImg[1].img})`,
                  },
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right top, left bottom',
                }}
              >
                <Box className="flex flex-col text-[#F6FF82]">
                  <Box className="ml-[10%] flex items-center gap-3 md:gap-6">
                    <Typography className="font-urbanist text-[28px] sm:text-[48px] lg:text-[54px] xl:text-[64px] xxl:text-[64px] font-semibold">
                      Create
                    </Typography>
                    <Image
                      className="w-32 sm:w-48 md:w-64 lg:w-64 xl:w-64 xxl:w-64"
                      src="/groups/avatar-container.svg"
                      height={0}
                      width={0}
                      alt="avatar-container"
                    />
                  </Box>
                  <Box className="relative mt-0 flex items-center">
                    <span className="bg-[#F6FF82] rounded-r-full xxs:h-8 xs:h-8 h-12 xxs:w-32 xs:w-32 w-48"></span>
                    <span className="bg-[#F6FF82] xxs:mx-1 xs:mx-1 mx-4 rounded-full xxs:w-8 xxs:h-8 xs:w-8 xs:h-8 h-12 w-12"></span>
                    <Box className="flex gap-3 items-center">
                      <Typography className="font-urbanist text-[28px] sm:text-[48px] lg:text-[54px] xl:text-[64px] xxl:text-[64px] font-semibold">
                        new
                      </Typography>
                      <Box className="relative flex">
                        <Typography className="font-urbanist text-[28px] sm:text-[48px] lg:text-[54px] xl:text-[64px] xxl:text-[64px] font-semibold">
                          group
                        </Typography>
                        <Image
                          className="xxs:hidden xs:hidden sm:hidden absolute h-12 w-fit top-2 -right-8"
                          src="/groups/circle-element.svg"
                          height={0}
                          width={0}
                          alt="circle-element"
                        />
                      </Box>
                    </Box>
                    
                  </Box>
                </Box>
                <Box className="px-8 lg:w-fit xl:w-fit xxl:w-fit xxs:mt-10 xs:mt-10 sm:mt-10 mt-auto">
                  <Button
                    className="flex xxs:w-full xs:w-full sm:w-full items-center gap-3 px-5 py-3 rounded-3xl bg-[#F6FF82] text-[#8E94E9] ml-auto"
                    onClick={handleOpen}
                    endIcon={<EndArrow />}
                  >
                    <Typography
                      
                      className="sm:text-lg text-base xl:text-lg xxl:text-xl font-bold font-urbanist normal-case"
                      component="p"
                    >
                      Create new group
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Box>
            <Modal
              className="flex items-center justify-center"
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute bg-[#8E94E9] flex text-white justify-center py-14 rounded-3xl border-2 border-[#fff] max-w-full min-w-fit min-h-[75vh]">
                <Button
                  className="text-white font-medium absolute top-2 right-0 text-xl"
                  onClick={handleClose}
                >
                  <Image
                    className="w-8 h-8"
                    src="/groups/icon-close.svg"
                    height={0}
                    width={0}
                    alt="icon-close"
                  />
                </Button>
                <CreateGroupForm
                  userGroups={userData.users[0].user_groups}
                  handleClose={handleClose}
                />
              </Box>
            </Modal>
          </Container>
        </Box>
      </section>
    )
  }

  return (
    <Box
      component="section"
      sx={{ backgroundColor: '#1A1A23', minHeight: '100vh' }}
    >
      <Container disableGutters maxWidth="lg" sx={{ paddingX: 6, paddingY: 8 }}>
        <Navbar
          handleSearch={handleSearch}
          companyQuery={searchQuery}
          setCompanyQuery={setSearchQuery}
        />
        <Box className="px-[18px] flex justify-between items-center">
          <Typography
            className="font-urbanist"
            sx={{
              fontSize: 24,
              color: '#FFFFFF',
              marginY: 3,
              fontWeight: 600,
            }}
          >
            Private Groups
          </Typography>
          <Button
            className="flex items-center h-fit gap-3 px-5 rounded-3xl bg-[#F6FF82] text-[#8E94E9]"
            onClick={handleOpen}
            endIcon={<EndArrow />}
          >
            <Typography
              className="text-sm normal-case font-bold font-urbanist"
              component="p"
            >
              Create new group
            </Typography>
          </Button>
        </Box>
        <Stack className="relative px-[18px] mt-16 z-0" direction="column" spacing={3}>
          {groupData.map((group: Group, index: number) => {
            return (
              <SingleGroupCard
                handleDeleteGroup={handleDeleteGroup} 
                group={group} 
                key={group.id} 
                index={index} 
                isUserAdmin={isUserAdmin(group, userData.users[0].user_id)}
                userGroups={userData.users[0].user_groups} 
                />
            )
          })}
        </Stack>
      </Container>
      <Modal
        className="flex items-center justify-center"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute bg-[#8E94E9] flex text-white justify-center py-14 rounded-3xl border-2 border-[#fff] min-w-fit max-w-full min-h-[75vh]">
          <Button
            className="text-white font-medium absolute top-2 right-0 text-xl"
            onClick={handleClose}
          >
            <Image
              className="w-8 h-8"
              src="/groups/icon-close.svg"
              height={0}
              width={0}
              alt="icon-close"
            />
          </Button>
          <CreateGroupForm
            userGroups={userData.users[0].user_groups}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </Box>
  )
}

export default GroupsHomePage

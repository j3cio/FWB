'use client'
import { Group, UserData } from '@/app/types/types'
import Navbar from '@/components/ui/privategroups/groupdetailspage/groups_navbar'
import CreateGroupForm from '@/components/ui/privategroups/groups/modal/CreateGroupForm'
import { Box, Button, Container, Modal, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import EndArrow from '../icons/EndArrow'

import SingleGroupCard from './GroupCard'
import CreateGroupCard from './CreateGroupCard'



// Type userData
const GroupsHomePage = ({
  userData,
  groupData,
}: {
  userData: UserData
  groupData: Group[]
}) => {
  const router = useRouter()
  const [companyQuery, setCompanyQuery] = useState('')

  const handleSearch = (companyQuery: any) => {
    const url = `/explore?company=${companyQuery}`
    router.push(url)
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const isUserAdmin = (group: Group, userId: string) => {
    if (JSON.parse(group.admins).includes(userId)) {
      return true
    }
    return false
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
              companyQuery={companyQuery}
              setCompanyQuery={setCompanyQuery}
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
              <CreateGroupCard handleOpen={handleOpen} />
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
      <Container disableGutters maxWidth="lg" sx={{ paddingX: 6 }}>
        <Navbar
          handleSearch={handleSearch}
          companyQuery={companyQuery}
          setCompanyQuery={setCompanyQuery}
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

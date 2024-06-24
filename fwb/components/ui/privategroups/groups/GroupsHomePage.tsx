'use client'

import { useState } from 'react'
import supabaseClient from '@/supabase'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Box, Button, Container, Modal, Stack, Typography } from '@mui/material'

import CreateGroupForm from '@/components/ui/privategroups/groups/modal/CreateGroupForm'
import Navbar from '../../navbar/Navbar'
import SingleGroupCard from './GroupCard'
import CreateGroupCard from './CreateGroupCard'

import EndArrow from '../icons/EndArrow'

import { Group, TestUserData, UserData, UserToGroups } from '@/app/types/types'
import GroupInvites from './GroupInvites'

// Type userData
const GroupsHomePage = ({
  userData,
  groupData,
  userToGroupsTable
}: {
  userData: TestUserData
  groupData: Group[]
  userToGroupsTable: UserToGroups[]
}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [invitations, setInvitations] = useState(false)
  const router = useRouter()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  console.log(groupData)
  const isUserAdmin = (group: Group, userId: string) => {
    if (JSON.parse(group.admins).includes(userId)) {
      return true
    }
    return false
  }

  const handleDeleteGroup = async (groupId: string, userGroups: string[]) => {
    // Deleting group from groups table
    setLoading(true)
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
      setLoading(false)
      return data
    } catch (error) {
      console.error('Error updating data: ', error)
      setLoading(false)
      throw error
    }
  }

  const downloadFile = async (filePath: string) => {
    if (filePath) {
      const supabase = await supabaseClient()
      const { data, error } = await supabase.storage
        .from('group-avatars')
        .download(filePath)

      if (error) {
        console.error('Error downloading file:', error)
        return null
      }
      return URL.createObjectURL(data)
    } else {
      console.log('No file path found')
      return
    }
  }

  //use only one modal for the two group instances ('== 0' and '> 0')
  //create loading state for when a group is being deleted

  return (
    <Box
      component="section"
      sx={{ backgroundColor: '#1A1A23', minHeight: '100vh' }}
    >
      <Container disableGutters maxWidth="lg" sx={{ paddingBottom: 12 }}>
        <GroupInvites invitations={invitations} />
        {groupData.length > 0 && (
          <Stack
            className="relative z-0 mt-16 px-[18px]"
            direction="column"
            spacing={3}
          >
            {groupData.map((group: Group, index: number) => {
              return (
                <SingleGroupCard
                  loading={loading}
                  //handleDeleteGroup={handleDeleteGroup}
                  downloadFile={downloadFile}
                  group={group}
                  key={group.id}
                  index={index}
                  isUserAdmin={true} // Need to fix this
                  userToGroupsTable={userToGroupsTable}
                />
              )
            })}
          </Stack>
        )}
        {groupData.length == 0 && (
          <section className="h-full w-full">
            <Typography
              className="font-urbanist"
              sx={{
                fontSize: 24,
                color: '#FFFFFF',
                marginY: 7,
                paddingX: '18px',
                fontWeight: 600,
              }}
            >
              Private Groups
            </Typography>
            <Box className="px-[18px]">
              <CreateGroupCard handleOpen={handleOpen} />
            </Box>
          </section>
        )}
      </Container>
    </Box>
  )
}

export default GroupsHomePage

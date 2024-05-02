'use client'
import { Group, UserData } from '@/app/types/types'
import supabaseClient from '@/supabase'
import { Avatar, Box, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import InviteMemberIcon from '../icons/InviteMemberIcon'
import LockIcon from '../icons/LockIcon'
import LockIconYellow from '../icons/LockIconYellow'
import Pencil from '../icons/pencil.svg'
//import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GroupInviteModal from './GroupInviteModal'

//TODO: The changing of group profile picture should requre admin priviledges

const GroupDetailsSection = ({
  groupData,
  userData,
  toast
}: {
  groupData: Group
  userData: UserData[]
  toast: any
}) => {
  type FileEvent = ChangeEvent<HTMLInputElement> & {
    target: EventTarget & { files: FileList }
  }
  const router = useRouter()
  const theme = useTheme() // To call useTheme you have to add "use client;" to the top of your file
  const [isGroupInviteModalOpen, setIsGroupInviteModalOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const openGroupInviteModal = () => {
    setIsGroupInviteModalOpen(true)
  }

  const closeGroupInviteModal = () => {
    setIsGroupInviteModalOpen(false)
  }
  const [filePath, setFilePath] = useState<string | null>(
    groupData.filePath || null
  ) // The image url for the file uploaded

  // Add the filePath to the group
  const storeFilePath = async (filePath: string) => {
    const supabase = await supabaseClient()

    const { data, error } = await supabase
      .from('groups')
      .update({ filePath: filePath })
      .eq('id', groupData.id)

    if (error) {
      console.error('Error updating group filePath:', error)
      return
    }
    console.log('Group filePath updated successfully:', data)
    window.location.reload() // There might be a better way to rerender the page
  }

  // Stores the file on supabase
  const uploadFile = async (event: FileEvent) => {
    toast.loading('uploading image..')
    if (groupData.filePath !== null) {
      console.log('Deleting previous group avatar')
      await deletePreviousGroupAvatar()
    }
    const supabase = await supabaseClient()
    const file = event.target.files[0]
    const fileExt = file.name.split('.').pop()
    const timestamp = Date.now().toString()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileName = `${timestamp}-${randomString}.${fileExt}`
    const filePath = `group-avatars/${fileName}`
    const { data, error } = await supabase.storage
      .from('group-avatars')
      .upload(filePath, file)

    if (error) {
      console.log('Error uploading file.')
      toast.error('Failed to upload image!')
      return
    }
    console.log('File uploaded successfully: ', data)

    await storeFilePath(filePath)
    toast.success('upload successful!')
  }

  // Retrieve file from supabase
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
      return data
    } else {
      console.log('No file path found')
      return
    }
  }

  // Delete previous picture from supabase storage
  const deletePreviousGroupAvatar = async () => {
    const oldFilePath = groupData.filePath
    const supabase = await supabaseClient()
    const { data, error } = await supabase.storage
      .from('group-avatars')
      .remove([`${oldFilePath}`])

    if (error) {
      console.error('Error downloading file:', error)
      return null
    }
    console.log('Old File path deleted', data)
    return
  }
  // Display the image
  const fetchAndDisplayImage = async (filePath: string) => {
    if (filePath) {
      const fileData = await downloadFile(filePath)
      // Convert the Blob to a URL for display
      if (fileData) {
        const url = URL.createObjectURL(fileData)
        setFilePath(url)
      }
    }
  }

  useEffect(() => {
    if (groupData.filePath != null) {
      fetchAndDisplayImage(groupData.filePath)
    }
  }, [])

  return (
    <Box className="my-10 flex h-2/3 w-full flex-col border-none">
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
          {filePath ? (
            <div className="h-32 w-32 overflow-hidden rounded-full">
              <img
                src={filePath || ''}
                alt="Avatar"
                className="h-full w-full cursor-pointer"
                onClick={handleImageClick}
              />
              <input
                type="file"
                accept='image/*'
                className="hidden"
                onChange={uploadFile}
                ref={fileInputRef}
              />
            </div>
          ) : (
            <div>
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  border: '4px solid black',
                  cursor: 'pointer',
                }}
                onClick={handleImageClick}
              />
              <input
                type="file"
                accept='image/*'
                className="hidden"
                onChange={uploadFile}
                ref={fileInputRef}
              />
            </div>
          )}
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
              <p className="text-sm">{groupData?.users.length} member{groupData?.users.length > 1  ? 's' : ''}</p>
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

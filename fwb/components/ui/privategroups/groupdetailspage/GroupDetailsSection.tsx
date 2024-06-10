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
import useWindowDimensions from '@/components/hooks/useWindowDimensions'

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
  const [groupImageURL, setGroupImageURL] = useState('')
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
        setGroupImageURL(url)
      }
    }
  }

  useEffect(() => {
    if (groupData.filePath != null) {
      fetchAndDisplayImage(groupData.filePath)
    }
  }, [])
//for group detail branch
  let mobile
  if (typeof window !== 'undefined') {
    mobile = window.innerWidth < 640;
  }
 //${mobile && 'mb-10 mt-0'}
  console.log(mobile)
  return (
    typeof window !== 'undefined' && 
    (<Box className={`my-10 flex h-2/3 w-full flex-col border-none xs-max:mb-10 xs-max:mt-0 xxs-max:mb-10 xxs-max:mt-0`}>
      <Box className="relative w-full">
        <Image
          priority
          className="h-full w-full border-solid border-b-2 border-[#F6FF82]"
          src={`${mobile ? '/groups/pg-bg1.png' : '/groups/pg-bg2.png'}`}
          height={0}
          width={1200}
          alt="group-img"
          suppressHydrationWarning
        />
        <LockIcon className="absolute right-2 top-2 w-fit rounded-full bg-[#fff] p-3 xs-max:hidden xxs-max:hidden" />
      </Box>
      <div className="relative flex items-center justify-between bg-[#1a1a23] px-4">
        <div className={`absolute -top-16 left-36 -translate-x-1/2 transform rounded-full xxs-max:-top-[2rem] xxs-max:left-12 xs-max:-top-[2rem] xs-max:left-12`}>
          {groupImageURL ? (
            <div className="h-32 w-32 overflow-hidden rounded-full">
              <Image
                src={filePath ? groupImageURL : '/groups/gp-avatars.svg'}
                alt="Avatar"
                className="h-full w-full cursor-pointer rounded-full"
                onClick={handleImageClick}
                fill
                suppressHydrationWarning
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
                  border: '2px solid black',
                  cursor: 'pointer',
                }}
                onClick={handleImageClick}
                className='w-[150px] h-[150px] xs-max:w-[60px] xs-max:h-[60px] xxs-max:w-[60px] xxs-max:h-[60px]'
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
        <div className={`mt-28 flex w-full justify-between gap-4 sm-max:flex-col xs-max:flex-col xxs-max:flex-col xs-max:mt-12 xxs-max:mt-8`}>
          <div className="flex max-w-[50%] flex-col gap-3 text-white sm-max:max-w-full xs-max:max-w-full xxs-max:max-w-full">
            <div className="flex items-start gap-1">
              <p className="flex flex-col text-2xl capitalize xs-max:text-[1.2rem] xxs-max:text-[1.2rem]">
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
                  suppressHydrationWarning
                />
              </div>
            </div>
            {groupData.description && (
              <div className=""> {groupData?.description}</div>
            )}
          </div>

          <div className="flex flex-row-reverse items-center justify-between gap-3 text-white xxl-max:flex-col xl-max:flex-col lg-max:flex-col sm-max:w-full xs-max:w-full xxs-max:w-full">
            <div className="flex flex-col gap-1 xs-max:w-[30%] items-end xs-max:gap-0 xxs-max:w-[30%] xxs-max:gap-0">
              <Image
                src="/groups/AvatarContainer.svg"
                alt="empty avatars"
                className="w-full xs-max:w-[80%] xxs-max:w-[80%] xs-max:pt-[5px] xxs-max:pt-[5px]"
                width={0}
                height={0}
                suppressHydrationWarning
              />
              <p className="text-sm xs-max:text-[0.7rem] xxs-max:text-[0.6rem]">+50 more members</p>
            </div>
            <div className="xs-max:w-[70%] xxs-max:w-[70%]">
              <Button
                endIcon={<InviteMemberIcon />}
                variant="outlined"
                className="rounded-2xl border border-white px-4 py-1 text-white xs-max:w-full xs-max:normal-case xs-max:border-[1.5px] xs-max:rounded-full xs-max:text-[17px] xs-max:mt-[-5px] xxs-max:w-full xxs-max:text-[13px] xxs-max:px-2 xxs-max:normal-case"
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
    </Box>)
  )
}

export default GroupDetailsSection

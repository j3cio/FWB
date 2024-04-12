'use client'
import { Group, UserData } from '@/app/types/types'
import supabaseClient from '@/supabase'
import { Avatar, Box, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import InviteMemberIcon from '../icons/InviteMemberIcon'
import LockIcon from '../icons/LockIcon'
import LockIconYellow from '../icons/LockIconYellow'
import Pencil from '../icons/pencil.svg'
import { useRouter } from 'next/navigation'


//TODO: The changing of group profile picture should requre admin priviledges

const GroupDetailsSection = ({
  groupData,
  userData,
}: {
  groupData: Group
  userData: UserData[]
}) => {
  type FileEvent = ChangeEvent<HTMLInputElement> & {
    target: EventTarget & { files: FileList }
  }
  const router = useRouter()
  const theme = useTheme() // To call useTheme you have to add "use client;" to the top of your file
  const [isGroupInviteModalOpen, setIsGroupInviteModalOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
 };


  const openGroupInviteModal = () => {
    setIsGroupInviteModalOpen(true)
  }

  const closeGroupInviteModal = () => {
    setIsGroupInviteModalOpen(false)
  }
  const [groupAvatarUrl, setGroupAvatarUrl] = useState<string | null>(
    groupData.filePath || null
  ) // The image url fro the file uploaded

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
    window.location.reload(); // There might be a better way to rerender the page
  }

  // Stores the file on supabase
  const uploadFile = async (event: FileEvent) => {
    if (groupData.filePath !== null) {
      console.log('Deleting previous group avatar')
      await deletePreviousGroupAvatar()
    }
    const supabase = await supabaseClient()
    const file = event.target.files[0]
    const fileExt = file.name.split('.').pop();
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileName = `${timestamp}-${randomString}.${fileExt}`;
    const filePath = `group-avatars/${fileName}`;
    const { data, error } = await supabase.storage
      .from('group-avatars')
      .upload(filePath, file) // TODO: This filepath should be unique

    if (error) {
      console.log('Error uploading file.')
      return
    }
    console.log('File uploaded successfully: ', data)

    await storeFilePath(filePath)
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
    const { data, error } = await supabase.storage.from('group-avatars').remove([`${oldFilePath}`]);

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
        setGroupAvatarUrl(url)
      }
    }
  }


  useEffect(() => {
    if (groupData.filePath != null) {
      fetchAndDisplayImage(groupData.filePath)
    }
  }, [])

  return (
    <Box className="h-2/3 w-full border-none my-10 flex flex-col">
      <Box className="w-full relative">
        <Image
          priority
          className="w-full h-full"
          src={`/groups/pg-bg2.png`}
          height={0}
          width={1200}
          alt="group-img"
        />
        <LockIcon className="absolute top-2 right-2 bg-[#fff] rounded-full p-3 w-fit" />
      </Box>
      <div className="flex justify-between items-center relative px-4 bg-[#1a1a23]">
        <div className="absolute -top-16 left-36 transform -translate-x-1/2 rounded-full">
          {groupAvatarUrl ? (
            <div className='h-32 w-32'>
            <img src={groupAvatarUrl || ''} alt="Avatar" className="cursor-pointer rounded-full" onClick={handleImageClick}/>
            <input type="file" className="hidden" onChange={uploadFile} ref={fileInputRef} />
            </div>
          ) : (
            <div>
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  border: '4px solid black',
                }}
                onClick={handleImageClick}
              />
              <input type="file" className="hidden" onChange={uploadFile} ref={fileInputRef}/>
            </div>
          )}
        </div>
        <div className="mt-36 flex xxs-max:flex-col xs-max:flex-col sm-max:flex-col gap-4 justify-between">
          <div className="text-white flex flex-col gap-3 xxs-max:max-w-full xs-max:max-w-full sm-max:max-w-full max-w-[50%]">
            <div className="flex items-start gap-1">
              <p className="text-2xl capitalize flex flex-col">
                {groupData.name}
                <span className="text-yellow-300 flex items-center gap-1 text-xs">
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

          <div className="text-white xxs-max:w-full xs-max:w-full sm-max:w-full flex flex-row-reverse justify-between items-center lg-max:flex-col xl-max:flex-col xxl-max:flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Image
                src="/groups/AvatarContainer.svg"
                alt="empty avatars"
                className="w-full"
                width={0}
                height={0}
              />
              <p className="text-sm">+50 more members</p>
            </div>
            <div className="">
              <Button
                endIcon={<InviteMemberIcon />}
                variant="outlined"
                className="rounded-2xl px-4 py-1 text-white border border-white"
              >
                Invite Members
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Box>
  )
}

export default GroupDetailsSection

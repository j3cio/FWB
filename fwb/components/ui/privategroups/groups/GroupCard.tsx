import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import { Group } from '@/app/types/types'
import LockIcon from '../icons/LockIcon'
import EndArrowWhite from '../icons/EndArrowWhite'
import ShareIcon from '@mui/icons-material/Share'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreIcon from '../icons/MoreIcon'

type Props = {
  group: Group
  index: number
  isUserAdmin: boolean
  loading: boolean
  userGroups: string[]
  handleDeleteGroup: (groupId: string, userGroups: string[]) => Promise<any>
  downloadFile: (filePath: string) => Promise<string | null | undefined>
}

const randomNumber = (index: number): number => {
  if (index < 5) {
    return index + 1
  }
  return [1, 2, 3, 4, 5][1]
}

const SingleGroupCard = ({
  group,
  index,
  isUserAdmin,
  loading,
  userGroups,
  handleDeleteGroup,
  downloadFile
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)
  const [shareGroupUrl, setShareGroupUrl] = useState(false)
  const [groupImage, setGroupImage] = useState<string>('')
  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const navigateToUserPage = (group_id: string) => {
    window.location.href = `/groups/${group_id}`
  }

  // Display the image
  const fetchAndDisplayImage = async () => {
      const fileData = await downloadFile(group.filePath)
      // Convert the Blob to a URL for display
      if (fileData) {
        setGroupImage(fileData)
      }
  }

  const shareGroup = (group_id: string) => {
    const base = window.location.origin;

    try {
      navigator.clipboard.writeText(`${base}/groups/${group_id}`)
      setShareGroupUrl(true)
      handleCloseMenu()
      setTimeout(() => setShareGroupUrl(false), 2000)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if ( group.filePath != null){
      fetchAndDisplayImage()
    }
  }, [])

  return (
    <Box
      component="div"
      className="flex w-full flex-col overflow-hidden rounded-xl border-4 bg-white"
      key={group.id}
    >
      <Box className="relative w-full">
        <Image
          onClick={() => navigateToUserPage(group.id)}
          priority
          className="h-full w-full cursor-pointer rounded-t-xl"
          src={`/groups/pg-bg${randomNumber(index)}.png`}
          height={0}
          width={900}
          alt="group-img"
        />
        <LockIcon className="absolute right-2 top-2 w-fit rounded-full bg-[#fff] p-3" />
      </Box>

      <Box className="flex w-full items-center justify-between gap-3 px-7 py-4 sm-max:flex-col xs-max:flex-col xxs-max:flex-col">
        <Box className="flex lg:max-w-[60%] items-center gap-4 sm-max:w-full sm-max:items-start xs-max:w-full xs-max:items-start xxs-max:w-full xxs-max:items-start">
          <Image
            className="w-16 h-16 rounded-full"
            src={group.filePath ? groupImage : "/groups/gp-avatars.svg"}
            height={0}
            width={0}
            alt="pg-avatar"
          />
          <Box className="flex flex-col w-full gap-2 text-[#1A1A23]">
            <Box className="flex w-full items-center justify-between">
              <Typography
                onClick={() => navigateToUserPage(group.id)}
                className="cursor-pointer font-urbanist text-2xl font-semibold sm-max:text-xl xs-max:text-xl xxs-max:text-xl"
              >
                {group.name}
              </Typography>
              <span className="font-urbanist text-xs text-[#656DE1] xxl-max:hidden xl-max:hidden lg-max:hidden">
                {group.discounts.length} benefits available
              </span>
            </Box>
            <Typography className="font-urbanist text-sm opacity-50">
              {group.description}
            </Typography>
          </Box>
        </Box>
        <Box className="relative mt-auto flex items-center gap-4 sm-max:w-full xs-max:w-full xxs-max:w-full">
          <span className="absolute -top-5 right-2 font-urbanist text-xs text-[#656DE1] sm-max:hidden xs-max:hidden xxs-max:hidden">
            {group.discounts.length} benefits available
          </span>
          <Button
            onClick={() => navigateToUserPage(group.id)}
            className="flex h-fit items-center gap-3 rounded-3xl bg-[#8E94E9] px-5 font-urbanist text-white sm-max:w-full xs-max:w-full xxs-max:w-full"
            endIcon={<EndArrowWhite />}
          >
            Explore Group
          </Button>
          <IconButton
            id="user-button"
            aria-controls={openMenu ? 'user-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined}
            onClick={handleClickMenu}
          >
            <MoreIcon />
          </IconButton>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            disableScrollLock={true}
            MenuListProps={{
              'aria-labelledby': 'menu-button',
            }}
            sx={{
              width: '500px',
              marginTop: '10px',
            }}
          >
            <MenuItem onClick={() => shareGroup(group.id)} className="font-urbanist">
              <ShareIcon style={{ marginRight: '8px' }} />
              Share Group
            </MenuItem>
            {isUserAdmin && (
              <MenuItem
                className="font-urbanist text-[#ED455D]"
                disabled={loading}
                onClick={() => {
                  handleDeleteGroup(group.id, userGroups)
                  handleCloseMenu()
                }}
              >
                <DeleteIcon style={{ color: '#ED455D', marginRight: '8px' }} />
                Delete
              </MenuItem>
            )}
          </Menu>
          {shareGroupUrl && (
            <Tooltip 
              className='absolute left-[80%] sm:left-[85%] md:left-[70%] lg:left-[70%] bottom-[-20%] bg-[#1A1A23] rounded px-4 py-2' 
              title='copied'
              placement='right-end'
              >
                <Typography className='font-urbanist text-white text-lg font-medium'>Copied!</Typography>
            </Tooltip>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default SingleGroupCard

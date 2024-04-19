import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
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
  userGroups,
  handleDeleteGroup,
  downloadFile
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)
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

  useEffect(() => {
    if ( group.filePath != null){
      fetchAndDisplayImage()
    }
  }, [])

  return (
    <Box
      component="div"
      className="bg-white border-4 overflow-hidden flex flex-col w-full rounded-xl"
      key={group.id}
    >
      <Box className="w-full relative">
        <Image
          onClick={() => navigateToUserPage(group.id)}
          priority
          className="w-full h-full cursor-pointer rounded-t-xl"
          src={`/groups/pg-bg${randomNumber(index)}.png`}
          height={0}
          width={900}
          alt="group-img"
        />
        <LockIcon className="absolute top-2 right-2 bg-[#fff] rounded-full p-3 w-fit" />
      </Box>

      <Box className="w-full px-7 py-4 xxs-max:flex-col xs-max:flex-col sm-max:flex-col gap-3 flex items-center justify-between">
        <Box className="xxs-max:max-w-full xs-max:max-w-full sm-max:max-w-full max-w-[60%] flex xxs-max:items-start xs-max:items-start sm-max:items-start items-center gap-4">
          <Image
            className="w-16 h-16 rounded-full"
            src={group.filePath ? groupImage : "/groups/gp-avatar.svg"}
            height={0}
            width={0}
            alt="pg-avatar"
          />
          <Box className="flex flex-col gap-2 text-[#1A1A23]">
            <Box className="flex justify-between items-center">
              <Typography
                onClick={() => navigateToUserPage(group.id)}
                className="xxs-max:text-xl xs-max:text-xl sm-max:text-xl text-2xl font-semibold cursor-pointer font-urbanist"
              >
                {group.name}
              </Typography>
              <span className="lg-max:hidden xl-max:hidden xxl-max:hidden text-[#656DE1] text-xs font-urbanist">
                {group.discounts.length} benefits available
              </span>
            </Box>
            <Typography className="opacity-50 text-sm font-urbanist">
              {group.description}
            </Typography>
          </Box>
        </Box>
        <Box className="relative xxs-max:w-full xs-max:w-full sm-max:w-full flex gap-4 items-center mt-auto">
          <span className="xxs-max:hidden xs-max:hidden sm-max:hidden text-[#656DE1] text-xs absolute -top-5 right-2 font-urbanist">
            {group.discounts.length} benefits available
          </span>
          <Button
            onClick={() => navigateToUserPage(group.id)}
            className="flex xxs-max:w-full xs-max:w-full sm-max:w-full items-center h-fit gap-3 px-5 rounded-3xl font-urbanist text-white bg-[#8E94E9]"
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
            <MenuItem className="font-urbanist">
              <ShareIcon style={{ marginRight: '8px' }} />
              Share Group
            </MenuItem>
            {isUserAdmin && (
              <MenuItem
                className="font-urbanist text-[#ED455D]"
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
        </Box>
      </Box>
    </Box>
  )
}

export default SingleGroupCard

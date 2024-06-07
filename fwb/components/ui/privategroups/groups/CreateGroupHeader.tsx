'use client'

import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import EndArrow from '../icons/EndArrow'
import CreateGroupModal from './CreateGroupModal' // This is a new component for the modal

export default function CreateGroupsHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  return (
    <>
      <Box className="flex items-center justify-between px-[18px]">
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
          className="flex h-fit items-center gap-3 rounded-3xl bg-[#F6FF82] px-5 text-[#8E94E9]"
          onClick={handleOpenModal}
          endIcon={<EndArrow />}
        >
          <Typography
            className="font-urbanist text-sm font-bold normal-case"
            component="p"
          >
            Create new group
          </Typography>
        </Button>
      </Box>
      <CreateGroupModal open={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}

'use client'

import { Modal, Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/contexts/UserContext'
import CreateGroupForm from './modal/CreateGroupForm'

interface CreateGroupModalProps {
  open: boolean
  onClose: () => void
}

export default function CreateGroupModal({
  open,
  onClose,
}: CreateGroupModalProps) {
  const userData = useContextSelector(
    UserContext,
    (context) => context.userData
  )

  return (
    <Modal
      className="flex items-center justify-center"
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute flex min-h-[75vh] min-w-fit max-w-full justify-center rounded-3xl border-2 border-[#fff] bg-[#8E94E9] py-14 text-white">
        <Button
          className="absolute right-0 top-2 text-xl font-medium text-white"
          onClick={onClose}
        >
          <Image
            className="h-8 w-8"
            src="/groups/icon-close.svg"
            height={0}
            width={0}
            alt="icon-close"
          />
        </Button>
        <CreateGroupForm
          // userGroups={
          //   userData?.users[0].user_groups ? userData?.users[0].user_groups : []
          // }
          handleClose={onClose}
        />
      </Box>
    </Modal>
  )
}

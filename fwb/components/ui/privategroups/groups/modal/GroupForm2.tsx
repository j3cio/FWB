import React, { useState, FormEvent, KeyboardEvent } from 'react'
import { Box, FormLabel, Button, Input, Stack, Typography } from '@mui/material'
import RemoveIcon from '../../icons/RemoveIcon'
import { TextareaAutosize as Textarea } from '@mui/base/TextareaAutosize'

type Form2Data = {
  users: string[]
}

type Form2Props = Form2Data & {
  updateFields: (fields: Partial<Form2Data>) => void
}

export function GroupForm2({ users, updateFields }: Form2Props) {
  const [user, setUser] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState('')

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!email.match(emailRegex)) {
      //alert('invalid email address!')
      return false
    } else {
      return true
    }
  }

  const handleAddUser = (user: string) => {
    let trimmedUser = user.trim()
    // check for empty input
    if (!trimmedUser) {
      alert('input a user email..')
      return
    }
    // check for duplicate emails
    if (users.includes(trimmedUser)) {
      alert('email already added!')
      return
    }
    //validate the email before adding
    if (!validateEmail(trimmedUser)) {
      alert('not a valid email')
      return
    } else {
      updateFields({ users: [...users, user] })
      setUser('')
    }
  }

  const handleRemoveEmail = (index: number) => {
    let updatedEmails = [...users]
    updatedEmails.splice(index, 1)
    updateFields({ users: [...updatedEmails] })
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleAddUser(user)
    }
  }

  return (
    <>
      <FormLabel className="flex min-w-[50vw] flex-col px-[20%] font-urbanist text-white sm-max:min-w-[60vw] xs-max:min-w-[80vw] xxs-max:min-w-[80vw]">
        Invite members*
        <Box className="relative flex max-h-[40vh] min-h-[15vh] w-full flex-col rounded bg-white p-2 font-urbanist">
          <Stack direction="row" flexWrap="wrap" useFlexGap spacing={2}>
            {users.map((user, index) => (
              <Box
                className="flex w-fit items-center rounded-lg bg-[#ADB4D2] p-2 font-urbanist lowercase text-white"
                key={index}
              >
                <Typography className="font-urbanist text-sm">
                  {user}
                </Typography>
                <RemoveIcon
                  className="mx-2"
                  onClick={() => handleRemoveEmail(index)}
                />
              </Box>
            ))}
          </Stack>
          <Box className="relative mb-auto">
            <Input
              className="w-full border-none bg-white p-2 font-urbanist before:border-none after:border-0 focus:outline-none"
              placeholder="Invite your friends.."
              autoFocus
              required
              value={user}
              onKeyDown={handleKeyDown}
              onChange={(e) => setUser(e.target.value.trim())}
            />
          </Box>
        </Box>
      </FormLabel>
    </>
  )
}

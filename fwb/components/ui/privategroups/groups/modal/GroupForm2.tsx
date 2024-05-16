import React, { useState, KeyboardEvent } from 'react'
import { Box, FormControl, FormLabel, IconButton, Input, MenuItem, Select, Stack, Typography } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import { SelectChangeEvent } from '@mui/material/Select';
import 'react-toastify/dist/ReactToastify.css'
import EndArrowWhite from '../../icons/EndArrowWhite'
import TrashIcon from '../../icons/TrashIcon'

type User = {
  email: string
  role: string
}

type Form2Data = {
  users: User[]
}

type Form2Props = Form2Data & {
  updateFields: (fields: Partial<Form2Data>) => void
}

export function GroupForm2({ users, updateFields }: Form2Props) {
  const initialData = {
    email: '',
    role: 'member'
  }
  const [user, setUser] = useState<User>(initialData)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!email.match(emailRegex)) {
      return false
    } else {
      return true
    }
  }

  const handleAddUser = (user: User) => {
    let trimmedEmail = user.email.trim()
    let emails: string[] = []
    const GetEmails = () => users.map((user) => (emails.push(user.email)))
    GetEmails()

    // check for empty input
    if (!trimmedEmail) {
      toast.error('input a user email..')
      return
    }
    // check for duplicate emails
    if (emails.includes(trimmedEmail)) {
      toast.error('email already added!')
      return
    }
    //validate the email before adding
    if (!validateEmail(trimmedEmail)) {
      toast.error('not a valid email')
      return
    } else {
      updateFields({ users: [...users, user] })
      setUser(initialData)
    }
  }

  const handleRemoveEmail = (index: number) => {
    let updatedEmails = [...users]
    updatedEmails.splice(index, 1)
    updateFields({ users: [...updatedEmails] })
  }

  const handleRoleChange = (event: SelectChangeEvent, index: number) => {

    function update(arr: User[], id: number, updatedData: Partial<User>): User[] {
      return arr.map((item, index) => (index === id ?  { ...item, ...updatedData } : item))
    }

    const updatedEmails = update(users, index, {role: event.target.value})
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'right',
            borderRadius: '100px',
            backgroundColor: 'white',
            flexGrow: 1,
            marginTop: 1,
            border: 'none',
          }}
        >
          <Input
            fullWidth
            className="w-full border-none bg-white p-2 font-urbanist before:border-none after:border-0 focus:outline-none"
            placeholder="Enter email"
            autoFocus
            required
            value={user.email}
            onKeyDown={handleKeyDown}
            onChange={(e) => setUser({...user ,email: e.target.value.trim()})}
            style={{
              flex: 1,
              height: '48px',
              borderRadius: '25px 0 0 25px',
              justifyContent: 'center',
            }}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              '&.MuiFormControl-root': { alignItems: 'flex-start' },
            }}
          />
          <IconButton
            color="primary"
            aria-label="search"
            className='bg-black'
            sx={{
              backgroundColor: '#000',
              padding: '10px',
              border: 'none',
              margin: '4px',
              transition: 'backgroundColor 1s ease',
              '&:hover': {
                backgroundColor: '#8e94e9',
              },
            }}
            //onClick={() => handleSearch(searchQuery)}
          >
            <EndArrowWhite />
          </IconButton>
        </Box>
        <Box className="relative mt-3 h-[20vh] min-h-[15vh] w-full py-2 pb-2 border-b border-[#fff]/50 font-urbanist overflow-y-auto">
          <Stack
            className='overflow-hidden' 
            direction="column" 
            flexWrap="nowrap" 
            useFlexGap 
            spacing={1}
          >
            {users.map((user, index) => (
              <Box
                className="flex w-full items-center font-urbanist lowercase text-white"
                key={index}
              >
                <Typography className="font-urbanist text-base">
                  {user.email}
                </Typography>
                <Box className="ml-auto flex items-center gap-3">
                <FormControl size='small' className="text-white border-none" sx={{ minWidth: 120 }}>
                    <Select
                      defaultValue='Member'
                      className="text-white font-urbanist"
                      value={user.role}
                      onChange={(e) => handleRoleChange(e, index)}
                      displayEmpty                     
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem className="font-urbanist" value={'member'}>Member</MenuItem>
                      <MenuItem className="font-urbanist" value={'admin'}>Admin</MenuItem>
                    </Select>
                  </FormControl>
                  <TrashIcon
                    className=""
                    onClick={() => handleRemoveEmail(index)}
                  />
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      </FormLabel>
      <ToastContainer
        autoClose={3000}
        toastClassName="bg-[#8E94E9]"
        bodyClassName="text-white"
        theme="colored"
        position="top-center"
      />
    </>
  )
}

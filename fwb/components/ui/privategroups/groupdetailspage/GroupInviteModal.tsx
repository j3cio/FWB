import { useRouter } from 'next/navigation'
import { useState, FormEvent, KeyboardEvent } from 'react'
import { Button, Modal } from '@mui/material'
import axios from 'axios'
import { Box, FormControl, FormLabel, IconButton, Input, MenuItem, Select, Stack, Typography } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import CloseIcon from '../../chat/icons/CloseIcon'
import { SelectChangeEvent } from '@mui/material/Select';
import 'react-toastify/dist/ReactToastify.css'
import EndArrowWhite from '../icons/EndArrowWhite'
import TrashIcon from '../icons/TrashIcon'
import Image from 'next/image'

type GroupInviteModalProps = {
  isOpen: boolean
  onClose(): void
}

type User = {
  email: string
  role: string
}

const GroupInviteModal = ({ isOpen, onClose }: GroupInviteModalProps) => {
  const initialData = {
    email: '',
    role: 'member'
  }
  const router = useRouter()
  const [refresh, setRefresh] = useState(true)
  const [input, setInput] = useState<User>(initialData)
  const [inviteList, setInviteList] = useState<User[]>([])

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
    const GetEmails = () => inviteList.map((user) => (emails.push(user.email)))
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
      setInviteList((prev) => ([...prev, user]))
      setInput(initialData)
    }
  }

  const handleRoleChange = (event: SelectChangeEvent, index: number) => {

    function update(arr: User[], id: number, updatedData: Partial<User>): User[] {
      return arr.map((item, index) => (index === id ?  { ...item, ...updatedData } : item))
    }

    const updatedEmails = update(inviteList, index, {role: event.target.value})
    setInviteList([...updatedEmails])
  }

  //adding emails
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddUser(input)
    }
  }

  //error message if input is empty
  const handleShare = async () => {
    if (inviteList.length === 0) {
      toast.error('Please enter at least one email before sharing.')
      return
    }

    try {
      // Send emails
      const response = await axios.post('/api/invitations', {
        emails: inviteList,
      })

      // Reset state after sending emails
      setInviteList([])
      setInput(initialData)
      onClose()
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }

  //removing emails
  const handleRemoveEmail = (index: number) => {
    setInviteList((prevEmails) => {
      const updatedEmails = [...prevEmails]
      updatedEmails.splice(index, 1)
      return updatedEmails
    })
  }

  //sending emails
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await axios.post('/api/invitations', {
        emails: inviteList,
      })

      // 이메일 전송 후 상태 초기화 또는 다른 작업 수행
      setInviteList([])
      setInput(initialData)
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }

  const handleModuleClose = async () => {
    onClose()
    router.refresh()
    setRefresh(!refresh)
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="modal-content relative sm-max:w-[80%] xs-max:h-screen xs-max:w-full xs-max:rounded-none xs-max:border-none xxs-max:h-screen xxs-max:w-full xxs-max:rounded-none xxs-max:border-none"
        style={{
          borderRadius: '40px',
          border: '2px solid var(--Neutral-000, #FFF)',
          background: '#8E94E9',
          boxShadow: '0px 4px 4px 0px rgba(255, 255, 255, 0.25)',
          //backdropFilter: 'blur(100px)',
          padding: '20px',
          width: '788px',
          height: '600px',
        }}
      >
        <Button
            className="absolute right-0 z-[99] top-2 text-xl font-medium text-white"
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
       <>
        <FormLabel className="flex min-w-[50vw] flex-col px-[5%] sm:px-[15%] font-urbanist text-white sm-max:min-w-[60vw] xs-max:min-w-[80vw] xxs-max:min-w-[80vw]">
          <Typography
            className='font-urbanist text-white font-medium text-center mt-6 text-3xl py-12'
          >
            Invite Members
          </Typography>
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
              value={input.email}
              onKeyDown={handleKeyDown}
              onChange={(e) => setInput({ ...input, email: e.target.value.trim()})}
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
            >
              <EndArrowWhite />
            </IconButton>
          </Box>
          <Box className="relative mt-3 min-h-[50vh] sm:h-[20vh] sm:min-h-[15vh] w-full py-2 pb-2 border-b border-[#fff]/50 font-urbanist overflow-y-auto">
            <Stack
              className='overflow-hidden' 
              direction="column" 
              flexWrap="nowrap" 
              useFlexGap 
              spacing={1}
            >
              {inviteList.map((user, index) => (
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
          <div className="mt-0 flex flex-col items-center">
            <button
              className="font-urbanist font-medium"
              style={{
                borderRadius: '30px',
                background: 'var(--yellow-300, #f6ff82)',
                display: 'flex',
                width: '367px',
                height: '48px',
                padding: '10px 24px',
                justifyContent: 'center',
                gap: '8px',
                color: 'var(--purple-300, #8e94e9)',
                textAlign: 'center',
                fontFamily: 'Urbanist',
                fontSize: '20px',
                fontStyle: 'normal',
                fontWeight: '700',
                lineHeight: '125%', // You may need to adjust this value to match your design
                letterSpacing: '0.4px',
                marginTop: '24px',
                marginBottom: '116px',
              }}
              type="button"
              onClick={handleShare}
            >
              Send Invitation
            </button>
        </div>
        </FormLabel>
        <ToastContainer
          autoClose={3000}
          toastClassName="bg-[#8E94E9]"
          bodyClassName="text-white"
          theme="colored"
          position="top-center"
        />
      </>
      </div>
    </Modal>
  )
}

export default GroupInviteModal

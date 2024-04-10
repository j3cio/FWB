import { useRouter } from 'next/navigation'
import { useState, FormEvent, KeyboardEvent } from 'react'
import { Modal } from '@mui/material'
import axios from 'axios'
import CloseButton from '../icons/close_24px.svg'
import { Image } from 'next/dist/client/image-component'

type GroupInviteModalProps = {
  isOpen: boolean
  onClose(): void
}

const GroupInviteModal = ({
  isOpen,
  onClose,
}: GroupInviteModalProps) => {
  const router = useRouter()
  const [refresh, setRefresh] = useState(true)
  const [emailInput, setEmailInput] = useState<string>('')
  const [emailAddresses, setEmailAddresses] = useState<string[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  //adding emails
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (emailInput.trim() !== '') {
        setEmailAddresses((prevEmails) => [...prevEmails, emailInput])
        setEmailInput('')
      }
    }
  }

  //error message if input is empty
  const handleShare = async () => {
    if (emailAddresses.length === 0) {
      setErrorMessage('Please enter at least one email before sharing.')
      return
    }

    try {
      // Send emails
      const response = await axios.post('/api/invitations', {
        emails: emailAddresses,
      })

      // Reset state after sending emails
      setEmailAddresses([])
      setEmailInput('')
      onClose()

    } catch (error) {
      console.error('Error sending email:', error)
    }
  }
  
  //removing emails
  const handleRemoveEmail = (index: number) => {
    setEmailAddresses((prevEmails) => {
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
        emails: emailAddresses,
      })

      // 이메일 전송 후 상태 초기화 또는 다른 작업 수행
      setEmailAddresses([])
      setEmailInput('')
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
        className="modal-content relative xs-max:h-screen xs-max:w-full sm-max:w-[80%] xs-max:rounded-none xs-max:border-none"
        style={{
          borderRadius: '40px',
          border: '2px solid var(--Neutral-000, #FFF)',
          background: '#8E94E9',
          boxShadow: '0px 4px 4px 0px rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(100px)',
          padding: '20px',
          width: '788px',
          height: '600px',
        }}
      >
        <div className='absolute top-5 right-5'>
          <button onClick={handleModuleClose}>
            <Image src={CloseButton} alt="Close Button" />
          </button>
        </div>
          <div className='flex justify-center'>
            <h1 
            className='font-urbanist text-white font-medium'
            style={{
              color: 'var(--Neutral-000, #FFF)',
              textAlign: 'center',
              marginTop: '88px',
              fontSize: '32px',
              fontStyle: 'normal',
              fontWeight: '600',
              marginBottom: '40px'
            }}>Invite Members</h1>
          </div>
            <form
              id="invitations"
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '12px'
              }}
              onSubmit={handleSubmit}
            >
              <div className="flex flex-wrap">
                {emailAddresses.map((email, index) => (
                  <span key={index} className='font-urbanist text-white font-medium'
                    style={{
                    backgroundColor: 'var(--neutral-200, #adb4d2)',
                    color: 'white',
                    display: 'flex',
                    padding: '1px 6px',
                    gap: '4px',
                    height: '28px',
                    borderRadius: '100px',
                    fontFamily: 'Urbanist',
                    fontSize: '16px',
                    fontWeight: '400',
                    lineHeight: '150%',
                    marginRight: '5px',
                    marginBottom: '5px'
                  }}>
                    <div className="flex">
                      <div className='font-urbanist text-white font-medium'
                        style={{
                          backgroundColor: 'var(--neutral-200, #adb4d2)',
                          color: 'white',
                          display: 'flex',
                          padding: '1px 6px',
                          gap: '4px',
                          borderRadius: '100px',
                          fontFamily: 'Urbanist',
                          fontSize: '16px',
                          fontWeight: '400',
                          lineHeight: '150%',
                          marginRight: '5px',
                          marginBottom: '5px'
                      }}>
                        {email}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                          style={{
                            marginTop: '4px',
                            marginLeft: '5px',
                          }}
                          onClick={() => handleRemoveEmail(index)}
                        >
                          <path
                            d="M12.2005 4.02258C12.0759 3.89774 11.9068 3.82759 11.7305 3.82759C11.5541 3.82759 11.385 3.89774 11.2605 4.02258L8.00047 7.27591L4.74047 4.01591C4.61591 3.89108 4.44681 3.82092 4.27047 3.82092C4.09412 3.82092 3.92502 3.89108 3.80047 4.01591C3.54047 4.27591 3.54047 4.69591 3.80047 4.95591L7.06047 8.21591L3.80047 11.4759C3.54047 11.7359 3.54047 12.1559 3.80047 12.4159C4.06047 12.6759 4.48047 12.6759 4.74047 12.4159L8.00047 9.15591L11.2605 12.4159C11.5205 12.6759 11.9405 12.6759 12.2005 12.4159C12.4605 12.1559 12.4605 11.7359 12.2005 11.4759L8.94047 8.21591L12.2005 4.95591C12.4538 4.70258 12.4538 4.27591 12.2005 4.02258Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </div>
                  </span>
                ))}
              </div>
              <input
                type="text"
                style={{
                  background: 'var(--neutral-000, #fff)',
                  outline: 'none'
                }}  
                placeholder="Invite your friends..."
                id="emailInput"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </form>
            {errorMessage && (
              <div className="error-message" style={{ color: 'white' }}>
                {errorMessage}
              </div>
            )}
          <div className="flex flex-col items-center mt-0">
          <button className='font-urbanist font-medium'
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
              marginBottom: '116px'
            }} 
            type="button" 
            onClick={handleShare}>
            Send Invitation
          </button>
        </div>
      </div>   
    </Modal>
  )
};

export default GroupInviteModal;
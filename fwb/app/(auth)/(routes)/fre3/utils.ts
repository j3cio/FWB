import { useRouter } from 'next/navigation'
import UpdateUser from '@/components/hooks/updateUser'

export const handleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  emailInput: string,
  setEmailInput: React.Dispatch<React.SetStateAction<string>>,
  setEmailAddresses: React.Dispatch<React.SetStateAction<string[]>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault()
    const email = emailInput.trim()
    if (email && isValidEmail(email)) {
      setEmailAddresses((prev) => [...prev, email])
      setEmailInput('')
      setErrorMessage('')
    } else {
      setErrorMessage('Please enter a valid email address')
    }
  }
}

export const handleShare = async (
  emailAddresses: string[],
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  if (emailAddresses.length === 0) {
    setErrorMessage('Please enter at least one email address')
    return
  }

  try {
    const response = await fetch('/api/send-invitations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emails: emailAddresses }),
    })

    if (response.ok) {
      console.log('Invitations sent successfully')
      // Handle success (e.g., show a success message, clear the form, etc.)
    } else {
      console.error('Failed to send invitations')
      // Handle error (e.g., show an error message)
    }
  } catch (error) {
    console.error('Error sending invitations:', error)
    // Handle error (e.g., show an error message)
  }
}

export const changeFRE = async (router: ReturnType<typeof useRouter>) => {
  try {
    const formData = new FormData()
    formData.append('hasCompletedFRE', '{true, true, true}')

    const response = await UpdateUser(formData)

    if (response) {
      router.push('/profile')
    } else {
      console.error('Error in changeFRE')
    }
  } catch (error) {
    console.error('Error in changeFRE:', error)
  }
}

const isValidEmail = (email: string) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return re.test(email)
}

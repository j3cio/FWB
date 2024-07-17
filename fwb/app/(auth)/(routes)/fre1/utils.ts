export function generateRandomUsername() {
  function getRandomElement(arr: any) {
    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
  }

  const adjList = [
    'amazing',
    'excellent',
    'fabulous',
    'gorgeous',
    'incredible',
    'outstanding',
    'spectacular',
    'stunning',
    'upbeat',
    'wondrous',
  ]
  const animalList = [
    'bird',
    'dog',
    'cat',
    'goat',
    'lizard',
    'penguin',
    'seal',
    'lion',
    'shark',
    'gecko',
  ]

  const randomAdj = getRandomElement(adjList)
  const randomAnimal = getRandomElement(animalList)
  const randomNumber = Math.floor(Math.random() * 1000)

  const username = `${randomAdj}${randomAnimal}${randomNumber}`
  return username
}

export const convertFilePathToBlob = async (image: any) => {
  try {
    const response = await fetch(image)
    const blob = await response.blob()
    return blob //Image file needed to be converted to blob from string to be uploaded to Clerk
  } catch (error) {
    console.error('Error converting file path to Blob:', error)
    return null
  }
}

export const updateProfilePicture = (user: any) => {
  const fileInput = document.getElementById(
    'profilePicture'
  ) as HTMLInputElement
  const file = fileInput?.files?.[0]

  if (file && user) {
    user
      .setProfileImage({ file })
      .then((imageResource: any) =>
        console.log('Profile picture updated:', imageResource)
      )
      .catch((error: any) =>
        console.error('Error updating profile picture:', error)
      )
  }
}

export const chooseProfilePicture = async (
  image: string,
  user: any,
  setOptimisticImageUrl: (url: string | null) => void
) => {
  const file = await convertFilePathToBlob(image)

  if (file && user) {
    const optimisticImage = URL.createObjectURL(file)
    setOptimisticImageUrl(optimisticImage)

    user
      .setProfileImage({ file })
      .then((imageResource: any) => {
        console.log('Profile picture updated:', imageResource)
        setOptimisticImageUrl(null)
      })
      .catch((error: any) => {
        console.error('Error updating profile picture:', error)
        setOptimisticImageUrl(null)
      })
  }
}

export const updateClerkUsername = (user: any, randomName: string) => {
  const newUsernameInput = document.getElementById(
    'newUsername'
  ) as HTMLInputElement
  const newUsername = newUsernameInput?.value || randomName

  if (user && newUsername) {
    user
      .update({ username: newUsername })
      .then((updatedUser: any) => console.log('Username updated:', updatedUser))
      .catch((error: any) => console.error('Error updating username:', error))
  }
}

export const handleSubmitUser = async (router: any) => {
  try {
    const bearerToken = await window.Clerk.session.getToken({
      template: 'testing_template',
    })
    const supabaseToken = await window.Clerk.session.getToken({
      template: 'supabase',
    })

    const formData = new FormData()
    formData.append('user_discounts', '')
    formData.append('user_groups', '')
    formData.append('user_messages', '')
    formData.append('company', '')
    formData.append('verified', 'false')
    formData.append('hasCompletedFRE', '{true, false, false}')
    formData.append('blocked_users', '')
    formData.append('reported_users', '')

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        supabase_jwt: supabaseToken,
      },
      body: formData,
    })

    if (response.ok) {
      const data = await response.json()
      console.log('User added successfully:', data)
      router.push('/fre2')
    } else {
      const errorData = await response.json()
      console.error('Error adding user:', errorData)
    }
  } catch (error) {
    console.error('Error adding user:', error)
  }
}

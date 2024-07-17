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

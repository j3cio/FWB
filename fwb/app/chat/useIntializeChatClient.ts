import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat'

export default function useIntitialChatClient() {
  // Read the currently logged in user
  const { user } = useUser()
  const [chatClient, setChatClient] = useState<StreamChat | null>(null)
  useEffect(() => {
    // Check for user
    if (!user?.id) return

    // Connect user and create client
    const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_KEY!)
    client
      .connectUser(
        {
          id: user.id,
          name: user.username || user.id,
          image: user.imageUrl,
        },
        async () => {
          const res = await fetch('/api/get-chat-token') // This endpoint returns a token if the Id we passed matches the Id of the logged in user
          if (!res.ok) {
            throw Error('Failed to get token')
          }
          const body = await res.json()
          return body.token
        }
      )
      .catch((error) => console.error('Failed to connect to user', error))
      .then(() => setChatClient(client))
    // This function is ran when this useEffect triggers again, all it does it disconnect the current user in the case that a different user is logged in
    return () => {
      setChatClient(null)
      client
        .disconnectUser()
        .catch((error) => console.error('Failed to disconnect user', error))
        .then(() => console.log('Connection closed'))
    }
  }, [user?.id, user?.fullName, user?.imageUrl])

  return chatClient // This is the chat client that allows us to use chat features
}

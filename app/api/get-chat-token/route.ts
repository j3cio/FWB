import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { StreamChat } from 'stream-chat'

export async function GET() {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      )
    }

    const streamCLient = StreamChat.getInstance(
      process.env.NEXT_PUBLIC_STREAM_KEY!,
      process.env.STREAM_SECRET!
    ) // These could be null if deploying to prod/staging careful

    const issuedAt = Math.floor(Date.now() / 1000) - 60 // When the token is created
    const expirationTime = Math.floor(Date.now() / 1000) + 3600 // Token should expire 1 hour after creation
    const token = streamCLient.createToken(user.id, expirationTime, issuedAt)

    return NextResponse.json({ token }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

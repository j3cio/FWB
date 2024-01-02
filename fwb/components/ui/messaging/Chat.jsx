import React from 'react'

//Import individual Chat Components
import SendBirdApp from "@sendbird/uikit-react/App"
import { ChannelList, Channel, ChannelSettings, SendBirdProvider } from "@sendbird/uikit-react"
import "@sendbird/uikit-react/dist/index.css"
import { useUser } from "@clerk/nextjs";

const APP_ID = 'D508AD28-A1DC-4C3F-8F22-85534687C46B';

export default function Chat() {
  const { user } = useUser();

  return (
    <SendBirdApp 
      appId={APP_ID} 
      userId={user.id}
      theme="dark"
      nickname={user.fullName}
      profileUrl={user.imageUrl}
    />
  )
};
"use client";
import Navbar from "@/components/ui/message/Navbar";

import { useUser } from "@clerk/nextjs";
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import MenuBar from "./MenuBar";
import useIntitialChatClient from "./useIntializeChatClient";

export default function ChatPage() {
  const chatClient = useIntitialChatClient();
  const { user } = useUser();

  if (!chatClient || !user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingIndicator size={40} />
      </div>
    );
  }

  return (
    // <div className="w-8/12 h-screen mr-20">

    <div className="h-screen"
    style={{background:"black"}}>
      <Navbar></Navbar>

      <Chat client={chatClient}>
        {/* The channel list shows only channels that the currently loggeed in user is a member (filters prop) */}
        <div className="flex flex-row h-full">
          <div className="w-full max-w-[432px]">
            <MenuBar />
            <div className="ml-14">
              <ChannelList
                filters={{ type: "messaging", members: { $in: [user.id] } }}
                sort={{ last_message_at: -1 }}
                options={{ state: true, presence: true, limit: 10 }}
              />
            </div>
          </div>
          <div className="h-full w-full ml-16 mr-10">
            <Channel>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
              <Thread />
            </Channel>
          </div>
        </div>
      </Chat>
    </div>
  );
}

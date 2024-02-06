"use client";
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
    <div className="bg-white w-8/12 h-screen mr-20">
      <Chat client={chatClient}>
        {/* The channel list shows only channels that the currently loggeed in user is a member (filters prop) */}
        <ChannelList
          filters={{ type: "messaging", members: { $in: [user.id] } }}
          sort={{ last_message_at: -1 }}
          options={{ state: true, presence: true, limit: 10 }}
        />
        <Channel>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}

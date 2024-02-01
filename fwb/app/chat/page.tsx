"use client";
import { StreamChat } from "stream-chat";
import { Channel, ChannelHeader, Chat, MessageInput, MessageList, Thread, Window } from "stream-chat-react";

export default function page() {
  const userId = "user_2aMhGjsruwj80nhj1bfJAdk8KNI";
  const chatClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_KEY!);

  chatClient.connectUser(
    {
      id: userId,
      name: "Derick Young",
    },
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlcl8yYU1oR2pzcnV3ajgwbmhqMWJmSkFkazhLTkkifQ._GtJgZ6JOg1NRukAJUIW8VqaVyoe4GTjQg87t0-5g20"
  );

  const channel = chatClient.channel("messaging", "channel_1", { name: "Channel #1", members: [userId] });
  return (
    <div className="bg-white w-8/12 h-full mr-20">
      <Chat client={chatClient}>
        <Channel channel={channel}>
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

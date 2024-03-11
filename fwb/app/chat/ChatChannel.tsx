import {
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import avatar from "@/components/ui/message/icons/avatar.svg";
import Image from "@/node_modules/next/image";

export default function ChatChannel() {
  return (
   
    <div className="w-full ml-16 mr-10" style={{ height: "771px" }}>
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput/>
        </Window>
        <Thread />
      </Channel>
    </div>
  
  );
}

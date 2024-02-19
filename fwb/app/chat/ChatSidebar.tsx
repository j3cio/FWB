import MenuBar from "./MenuBar";
import { ChannelList } from "stream-chat-react";
import { UserResource } from "@clerk/types";


interface ChatSidebarProps {
  user: UserResource;
}

export default function ChatSideBar({ user }: ChatSidebarProps) {
  return (
    <div className="w-full max-w-[432px]" style={{ width: "425px" }}>
      <MenuBar />

      <div className="ml-14" style={{ width: "425px" }}>
        <ChannelList
        
          filters={{ type: "messaging", members: { $in: [user.id] } }}
          sort={{ last_message_at: -1 }}
          options={{ state: true, presence: true, limit: 10 }}
          showChannelSearch
          additionalChannelSearchProps={{
            searchForChannels: true,
            searchQueryParams: {
              channelFilters: {
                filters: { memebers: { $in: [user.id] } },
              },
            },
          }}
        />
      </div>
    </div>
  );
}

// 2:26

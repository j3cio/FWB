import MobileChatNavigation from '@/components/ui/chat/mobile/MobileChatNavigation'
import MobileTabsSelector from '@/components/ui/chat/mobile/MobileTabsSelector'

const Loading = () => {
  return (
    <div className="bg-[#1A1A23] h-dvh flex flex-col sm:hidden">
      <MobileChatNavigation />
      <div className="flex flex-col text-white px-[13px]">
        <MobileTabsSelector activeTab={'general'} setActiveTab={null} />
      </div>
    </div>
  )
}

export default Loading

import DesktopMessageListTopBar from '@/components/ui/chat/desktop/DesktopMessageListTopBar'

const ChannelDetails = () => {
  return (
    <section
      className="max-h-[500px] min-h-[300px] w-full rounded-lg bg-[#313139] px-4 text-white md:w-[717px] lg:h-[771px] lg:max-h-[771px]"
      style={{ height: '771px' }}
    >
      <DesktopMessageListTopBar isDetails />
      ChannelDetails
    </section>
  )
}

export default ChannelDetails

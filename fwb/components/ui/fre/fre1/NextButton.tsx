import Link from 'next/link'

interface NextButtonProps {
  handleSubmitUser: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export const NextButton: React.FC<NextButtonProps> = ({ handleSubmitUser }) => {
  return (
    <div className=" flex w-full justify-center">
      <div className="button mx-auto mt-[13.53px] md:ml-[110px]">
        <Link
          href="/fre2"
          className="mb-[12px] mt-0 flex h-[48px] w-[80vw] justify-center gap-[8px] rounded-[30px] bg-[#f6ff82] px-[24px] py-[10px] text-center font-urbanist text-[20px] font-bold leading-[1.25] tracking-[0.4px] text-[#8e94e9] md:w-[420px]"
          onClick={handleSubmitUser}
        >
          Next
        </Link>
      </div>
    </div>
  )
}

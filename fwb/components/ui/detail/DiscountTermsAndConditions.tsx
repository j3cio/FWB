import { DiscountDataDetail } from '@/app/types/types'
import BookmarkIcon from './icons/BookmarkIcon'
import ArrowIcon from './icons/ArrowIcon'
import { motion } from 'framer-motion'

interface DiscountTermsAndConditionsProps {
  data: DiscountDataDetail // electing to use entire data bundle here for potential future functionality like the bookmark function
}

const DiscountTermsAndConditions = ({
  data,
}: DiscountTermsAndConditionsProps) => {
  return (
    <div className="mb-[40px]">
      <div className="mb-[24px] h-[1px] w-full bg-[#ADB4D2]"></div>
      <div>
        <div className="mb-[3px] text-[16px] font-bold text-[#1A1A23]">
          Terms & Conditions:
        </div>
        <div>{data.terms_and_conditions}</div>

        <div className="flex w-full items-center justify-end gap-4">
          <BookmarkIcon />
          <button className="ml-1 flex  justify-between rounded-[30px] bg-[#8E94E9] px-3 py-[10px] text-xl font-semibold text-white">
            <span className="pl-5 pr-2">Take Advantage 😉</span>
            <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

export default DiscountTermsAndConditions

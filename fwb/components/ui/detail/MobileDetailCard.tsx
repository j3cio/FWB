import CustomTooltip from '../tooltips/CustomTooltip'
import ShareIcon from './icons/ShareIcon'
import { useState } from 'react'
import ArrowIcon from './icons/ArrowIcon'

export const MobileDetailCard = () => {
    const [showTooltip, setShowTooltip] = useState<boolean>(false)

    const copyShareURL = () => {
        const currentURL = window.location.href
        // Copy URL to clipboard
        navigator.clipboard
          .writeText(currentURL)
          .then(() => {
            console.log('URL copied to clipboard:', currentURL)
          })
          .catch((err) => {
            console.error('Failed to copy URL: ', err)
          })
        setShowTooltip(true)
    
        setTimeout(() => {
          setShowTooltip(false)
        }, 2000)
      }
    
    return (
      <div className="mt-[16px] xs-max:block xxs-max:block  [@media(min-width:600px)]:hidden">
        <div className="flex w-full items-center justify-end gap-4">
          {/* <BookmarkIcon /> */}
          <button className="ml-1 flex rounded-[30px] bg-[#8E94E9] px-3 text-xl font-semibold text-white h-[35px] w-full justify-center py-[2px]">
            <span className="pl-5 pr-2 text-[1rem] [@media(max-width:400px)]:text-[0.7rem]">Take Advantage</span>
            <div className="arrow pt-[4px]">
                <ArrowIcon />
            </div>  
          </button>
          <button onClick={copyShareURL}>
              <CustomTooltip title="Copied!" showTooltip={showTooltip}>
                <ShareIcon />
              </CustomTooltip>
        </button>
        </div>
      </div>
    )
  }
  
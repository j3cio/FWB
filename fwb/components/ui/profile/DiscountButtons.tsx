import Image from 'next/image'

import React from 'react'
import CreateDiscountCard from '../addbenefit/CreateDiscountCard'
import { Button } from '@mui/material'
import BlueArrowForward from '../addbenefit/BlueArrowForward'
import BlueGroupIcon from '@/components/ui/profile/icons/groups-blue.svg'

const DiscountButtons = () => {
  return (
    <div>
      <div className="flex w-full grow flex-col gap-6">
        <CreateDiscountCard />
        <div className="flex h-2/5 w-full xxl-max:hidden xl-max:hidden lg-max:hidden">
          <a className="min-w-full" href="/addbenefit">
            <div className='flex rounded-[32px] bg-[url("/profilebanner-sm.svg")] bg-cover py-5 sm-max:py-[10%]'>
              <div className="flex flex-col items-start gap-2 px-4 pb-5 pt-8">
                <h1 className="text-xl font-medium text-[#F6FF82] sm-max:text-3xl">
                  Booty Call <br /> For Bargains!
                </h1>
                <Button
                  endIcon={<BlueArrowForward />}
                  variant="contained"
                  className="rounded-[32px] border-2 border-white bg-[#F6FF82] text-sm font-medium normal-case text-[#8E94E9] sm-max:text-lg"
                >
                  Share your discount
                </Button>
              </div>
            </div>
          </a>
        </div>
        <div className="flex h-2/5 gap-6">
          <a
            href="groups"
            className="flex h-[126px] flex-1 items-center gap-6 rounded-3xl bg-white"
          >
            <div className="mx-6 flex flex-col">
              <div className="text-2xl font-semibold sm-max:text-xl xs-max:text-lg xxs-max:text-lg">
                Private Groups
              </div>
              <div className="text-[14px] sm-max:text-[10px] xs-max:text-[10px] xxs-max:text-[10px]">
                Get intimate with discounts in private groups
              </div>
            </div>
            <div className="mx-10 flex grow flex-row-reverse">
              <Image
                src={BlueGroupIcon}
                alt="Group Icon"
                width={50}
                height={50}
              />
              {/* Need custom icon for it to show */}
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default DiscountButtons

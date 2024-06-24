import React from 'react'
import ShareDiscountButton from './ShareDiscountButton'

const AddBenefitCTA = () => {
  return (
    <>
      <div className="mt-[120px] flex h-1/4 items-center justify-center text-3xl text-yellow-200 sm-max:mt-10 sm-max:text-xl xs-max:mt-10 xs-max:text-xl xxs-max:mt-10 xxs-max:text-xl">
        Be the wingman to a friend&apos;s wallet now!
      </div>
      <div className="mt-[24px] flex grow items-center justify-center">
        <a href="/addbenefit">
          <ShareDiscountButton />
        </a>
      </div>
    </>
  )
}

export default AddBenefitCTA

import { Skeleton } from '@mui/material'
import React from 'react'

const ProfileSkeleton = () => {
  return (
    <div className="mb-[50px] flex h-1/5 w-full gap-10 border-b-2 border-slate-200 pb-[95px] pt-10 sm-max:mt-8 sm-max:flex-col sm-max:gap-4 sm-max:pb-6 xs-max:mt-6 xs-max:flex-col xs-max:gap-3 xs-max:pb-4 xxs-max:mt-4 xxs-max:flex-col xxs-max:gap-3 xxs-max:pb-4">
      <Skeleton
        variant="circular"
        width={190}
        height={190}
        sx={{ bgcolor: '#CED2E4' }}
      />
      <div className="items-between flex flex-col pl-4 pt-4">
        <div>
          <Skeleton
            width={190}
            height={60}
            sx={{ borderRadius: '5px', bgcolor: '#CED2E4' }}
          />
          <Skeleton
            width={150}
            height={30}
            sx={{ borderRadius: '5px', bgcolor: '#CED2E4' }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProfileSkeleton

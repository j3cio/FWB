import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import EndArrow from '../icons/EndArrow'

const bgImg = [
  {
    id: 'bg-1',
    img: '/groups/bg-top-right.svg',
  },
  {
    id: 'bg-2',
    img: '/groups/circle-element2.svg',
  },
]

type Props = {
  handleOpen: () => void
}

const CreateGroupCard = ({ handleOpen }: Props) => {
  return (
    <Box
      className="flex min-h-[25vh] w-full flex-row justify-between rounded-3xl bg-[#8E94E9] py-[7%] sm-max:flex-col xs-max:flex-col xxs-max:flex-col"
      sx={{
        backgroundImage: {
          md: `url(${bgImg[0].img}), url(${bgImg[1].img})`,
        },
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right top, left bottom',
      }}
    >
      <Box className="flex flex-col text-[#F6FF82]">
        <Box className="ml-[10%] flex items-center gap-3 md:gap-6">
          <Typography className="font-urbanist text-[28px] font-semibold xxl-max:text-[64px] xl-max:text-[64px] lg-max:text-[54px] sm-max:text-[48px]">
            Create
          </Typography>
          <Image
            className="w-32 md:w-64 xxl-max:w-64 xl-max:w-64 lg-max:w-64 sm-max:w-48"
            src="/groups/avatar-container.svg"
            height={0}
            width={0}
            alt="avatar-container"
          />
        </Box>
        <Box className="relative mt-0 flex items-center">
          <span className="h-12 w-48 rounded-r-full bg-[#F6FF82] xs-max:h-8 xs-max:w-32 xxs-max:h-8 xxs-max:w-32"></span>
          <span className="mx-4 h-12 w-12 rounded-full bg-[#F6FF82] xs-max:mx-1 xs-max:h-8 xs-max:w-8 xxs-max:mx-1 xxs-max:h-8 xxs-max:w-8"></span>
          <Box className="flex items-center gap-3">
            <Typography className="font-urbanist text-[28px] font-semibold xxl-max:text-[64px] xl-max:text-[64px] lg-max:text-[54px] sm-max:text-[48px]">
              new
            </Typography>
            <Box className="relative flex">
              <Typography className="font-urbanist text-[28px] font-semibold xxl-max:text-[64px] xl-max:text-[64px] lg-max:text-[54px] sm-max:text-[48px]">
                group
              </Typography>
              <Image
                className="absolute -right-8 top-2 h-12 w-fit sm-max:hidden xs-max:hidden xxs-max:hidden"
                src="/groups/circle-element.svg"
                height={0}
                width={0}
                alt="circle-element"
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="mt-auto px-8 xxl-max:w-fit xl-max:w-fit lg-max:w-fit sm-max:mt-10 xs-max:mt-10 xxs-max:mt-10">
        <Button
          className="ml-auto flex items-center gap-3 rounded-3xl bg-[#F6FF82] px-5 py-3 text-[#8E94E9] sm-max:w-full xs-max:w-full xxs-max:w-full"
          onClick={handleOpen}
          endIcon={<EndArrow />}
        >
          <Typography
            className="font-urbanist text-base font-bold normal-case xxl-max:text-xl xl-max:text-lg sm-max:text-lg"
            component="p"
          >
            Create new group
          </Typography>
        </Button>
      </Box>
    </Box>
  )
}

export default CreateGroupCard

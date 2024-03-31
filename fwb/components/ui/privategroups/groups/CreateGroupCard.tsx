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
      className="flex xxs:flex-col xs:flex-col sm:flex-col flex-row justify-between w-full min-h-[25vh] py-[7%] rounded-3xl bg-[#8E94E9]"
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
          <Typography className="font-urbanist text-[28px] sm:text-[48px] lg:text-[54px] xl:text-[64px] xxl:text-[64px] font-semibold">
            Create
          </Typography>
          <Image
            className="w-32 sm:w-48 md:w-64 lg:w-64 xl:w-64 xxl:w-64"
            src="/groups/avatar-container.svg"
            height={0}
            width={0}
            alt="avatar-container"
          />
        </Box>
        <Box className="relative mt-0 flex items-center">
          <span className="bg-[#F6FF82] rounded-r-full xxs:h-8 xs:h-8 h-12 xxs:w-32 xs:w-32 w-48"></span>
          <span className="bg-[#F6FF82] xxs:mx-1 xs:mx-1 mx-4 rounded-full xxs:w-8 xxs:h-8 xs:w-8 xs:h-8 h-12 w-12"></span>
          <Box className="flex gap-3 items-center">
            <Typography className="font-urbanist text-[28px] sm:text-[48px] lg:text-[54px] xl:text-[64px] xxl:text-[64px] font-semibold">
              new
            </Typography>
            <Box className="relative flex">
              <Typography className="font-urbanist text-[28px] sm:text-[48px] lg:text-[54px] xl:text-[64px] xxl:text-[64px] font-semibold">
                group
              </Typography>
              <Image
                className="xxs:hidden xs:hidden sm:hidden absolute h-12 w-fit top-2 -right-8"
                src="/groups/circle-element.svg"
                height={0}
                width={0}
                alt="circle-element"
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="px-8 lg:w-fit xl:w-fit xxl:w-fit xxs:mt-10 xs:mt-10 sm:mt-10 mt-auto">
        <Button
          className="flex xxs:w-full xs:w-full sm:w-full items-center gap-3 px-5 py-3 rounded-3xl bg-[#F6FF82] text-[#8E94E9] ml-auto"
          onClick={handleOpen}
          endIcon={<EndArrow />}
        >
          <Typography
            className="sm:text-lg text-base xl:text-lg xxl:text-xl font-bold font-urbanist normal-case"
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

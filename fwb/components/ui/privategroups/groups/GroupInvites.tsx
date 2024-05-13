import { Box, Button, Container, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const GroupInvites = ({ invitations }: { invitations: boolean }) => {
    if (invitations) {
        return (
          <section className='border-b-2 border-[#fff]/50 pb-12'>
            <Box
              className="font-urbanist"
              sx={{ backgroundColor: '#1A1A23' }}
            >
              <Typography
                  className="font-urbanist"
                  sx={{
                    fontSize: 24,
                    color: '#FFFFFF',
                    marginY: 7,
                    paddingX: '18px',
                    fontWeight: 600,
                  }}
                >
                  Private Groups Invitations
                </Typography>
            </Box>
            {/* Render all invitations in a scrollable container */}
            <Container maxWidth='lg' className="overflow-x-scroll w-[95vw] xl:w-[90vw] no-scrollbar ">
              <Box
                className="flex w-fit overflow-hidden px-5 gap-4"
              >
                {Array.from(Array(5)).map((item, index) => (
                  <Box key={index} className="bg-[#ffffff] border-[#fff] border-[1.5px] rounded-2xl overflow-hidden w-[15rem] sm:w-[18rem] md:w-[20rem] lg:w-[22rem]">
                    <Image
                      priority
                      className="w-full rounded-t-xl" 
                      src='/groups/pg-bg4.png'
                      height={0}
                      width={900}
                      alt='group cover'
                    />
                    <Box className="p-3">
                      <Box className="cursor-pointer flex items-center gap-3 pb-3">
                        <Image
                          className="w-12 h-12 rounded-full"
                          src={"/groups/gp-avatars.svg"}
                          height={0}
                          width={0}
                          alt="pg-avatar"
                        />
                        <Box>
                          <Typography className='font-urbanist font-semibold text-[#1A1A23]'>Group Name {item}</Typography>
                          <Typography className='font-urbanist text-xs text-[#ADB4D2]'><span className='text-[#8C95C0]'>Brooklyn</span> invited you to join this group</Typography>
                        </Box>
                      </Box>
                      <Box className="mx-auto flex gap-2 items-center">
                        <Button className='bg-[#8E94E9] rounded-2xl w-full'>
                          <Typography className='font-urbanist font-medium text-white normal-case'>Accept</Typography>
                        </Button>
                        <Button className='w-full'>
                          <Typography className='font-urbanist font-medium normal-case'>Ignore</Typography>
                        </Button>
                      </Box>
                    </Box>
                  </Box>
  
                ))} 
              </Box>
  
            </Container>
          </section>
        )
      }
}

export default GroupInvites
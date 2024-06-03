import { Box, Button, Container, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const GroupInvites = ({ invitations }: { invitations: boolean }) => {
  if (invitations) {
    return (
      <section className="border-b-2 border-[#fff]/50 pb-12">
        <Box className="font-urbanist" sx={{ backgroundColor: '#1A1A23' }}>
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
        <Container
          maxWidth="lg"
          className="no-scrollbar w-[95vw] overflow-x-scroll xl:w-[90vw] "
        >
          <Box className="flex w-fit gap-4 overflow-hidden px-5">
            {Array.from(Array(5)).map((item, index) => (
              <Box
                key={index}
                className="w-[15rem] overflow-hidden rounded-2xl border-[1.5px] border-[#fff] bg-[#ffffff] sm:w-[18rem] md:w-[20rem] lg:w-[22rem]"
              >
                <Image
                  priority
                  className="w-full rounded-t-xl"
                  src="/groups/pg-bg4.png"
                  height={0}
                  width={900}
                  alt="group cover"
                />
                <Box className="p-3">
                  <Box className="flex cursor-pointer items-center gap-3 pb-3">
                    <Image
                      className="h-12 w-12 rounded-full"
                      src={'/groups/gp-avatars.svg'}
                      height={0}
                      width={0}
                      alt="pg-avatar"
                    />
                    <Box>
                      <Typography className="font-urbanist font-semibold text-[#1A1A23]">
                        Group Name {item}
                      </Typography>
                      <Typography className="font-urbanist text-xs text-[#ADB4D2]">
                        <span className="text-[#8C95C0]">Brooklyn</span> invited
                        you to join this group
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="mx-auto flex items-center gap-2">
                    <Button className="w-full rounded-2xl bg-[#8E94E9]">
                      <Typography className="font-urbanist font-medium normal-case text-white">
                        Accept
                      </Typography>
                    </Button>
                    <Button className="w-full">
                      <Typography className="font-urbanist font-medium normal-case">
                        Ignore
                      </Typography>
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

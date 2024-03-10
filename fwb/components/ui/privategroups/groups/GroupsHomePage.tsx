"use client";
import { UserData } from "@/app/types/types";
import { Stack, useTheme } from "@mui/material";
import Navbar from "@/components/ui/privategroups/groupdetailspage/groups_navbar";
import EndArrow from "../icons/EndArrow";
import CreateGroupForm from "@/components/ui/privategroups/groups/modal/CreateGroupForm";
import { useRouter } from "next/navigation";
import { Box, Button, Container, Modal, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import LockIcon from "../icons/LockIcon";
import MoreIcon from "../icons/MoreIcon";
import EndArrowWhite from "../icons/EndArrowWhite";


const bgImg = [
  {
    id: "bg-1",
    img: "/groups/bg-top-right.svg",
  },
  {
    id: "bg-2",
    img: "/groups/circle-element2.svg",
  },
];

const randomNumber = (index: number): number => {
  if (index < 5){
    return index + 1
  }
  return [1,2,3,4,5][index]
};

// Type userData
const GroupsHomePage = ({ userData }: { userData: UserData }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const router = useRouter();

  if (userData.users[0].user_groups.length == 0) {
    return (
      <section className="w-full h-full">
        <Box className="font-urbanist" sx={{ backgroundColor: "#1A1A23", minHeight: "100vh" }}>
          <Container disableGutters maxWidth="lg" sx={{ paddingX: 6 }}>
            <Navbar />
            <Typography className="font-urbanist" sx={{ fontSize: 24,color: "#FFFFFF", marginY: 3, fontWeight: 600 }}>
              Private Groups
            </Typography>
            <Box
              component="main"
              className="flex xxs:flex-col xs:flex-col sm:flex-col flex-row justify-between w-full min-h-[30vh] py-[10%] rounded-3xl bg-[#8E94E9]"
              sx={{
                backgroundImage: {md: `url(${bgImg[0].img}), url(${bgImg[1].img})`},
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right top, left bottom",
              }}
            >
              <Box className="flex flex-col text-[#F6FF82]">
                <Box className="ml-[10%] flex items-center gap-6">
                  <Typography className="font-urbanist text-[32px] sm:text-[48px] lg:text-[54px] xl:text-[64px] xxl:text-[64px] font-semibold">Create</Typography>
                  <Image 
                    className="w-64" 
                    src="/groups/avatar-container.svg" 
                    height={0} 
                    width={0} 
                    alt="avatar-container"
                  />
                </Box>
                <Box className="relative mt-3 flex items-center">
                  <span className="bg-[#F6FF82] rounded-r-full h-12 xxs:w-32 xs:w-32 w-48"></span>
                  <span className="bg-[#F6FF82] mx-4 rounded-full h-12 w-12"></span>
                  <Typography className="font-urbanist text-[32px] sm:text-[48px] lg:text-[54px] xl:text-[64px] xxl:text-[64px] font-semibold">new group</Typography>
                  <Image 
                    className="xxs:hidden xs:hidden sm:hidden absolute h-12 w-fit mb-8 -right-[10]" 
                    src="/groups/circle-element.svg" 
                    height={0} 
                    width={0} 
                    alt="circle-element" 
                  />
                </Box>
              </Box>
              <Box className="px-8 lg:w-fit xl:w-fit xxl:w-fit xxs:mt-10 xs:mt-10 sm:mt-10 mt-auto" >
                <Button 
                  className="flex xxs:w-full xs:w-full sm:w-full items-center gap-3 px-5 py-3 rounded-3xl bg-[#F6FF82] text-[#8E94E9] ml-auto" 
                  onClick={handleOpen}
                  endIcon={<EndArrow />}
                > 
                  <Typography className="sm:text-lg text-base xl:text-lg xxl:text-xl font-urbanist lowercase" component="p">Create new group</Typography>
                </Button>
              </Box>
            </Box>
            <Modal
              className="flex items-center justify-center"
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute bg-[#8E94E9] flex text-white justify-center py-14 rounded-3xl border-2 border-[#fff] min-w-[80%] lg:min-w-[45vw] xl:min-w-[45vw] xxl:min-w-[45vw] min-h-[75vh]">
                <Button className="text-white font-medium absolute top-2 right-0 text-xl" onClick={handleClose}>
                  <Image className='w-8 h-8' src='/groups/icon-close.svg' height={0} width={0} alt='icon-close' />
                </Button>
                <CreateGroupForm userGroups={userData.users[0].user_groups} handleClose={handleClose} />
              </Box>
            </Modal>
          </Container>
        </Box>
      </section>
    );
  }

  const navigateToUserPage = (group_id: string) => {
    window.location.href = `/groups/${group_id}`;
  };

  return (
    <Box component='section' sx={{ backgroundColor: "#1A1A23", minHeight: "100vh" }}>
      <Container disableGutters maxWidth="lg" sx={{ paddingX: 6, paddingY: 8 }}>
        <Navbar />
        <Box className='flex justify-between items-center'>
          <Typography className="font-urbanist" sx={{ fontSize: 24,color: "#FFFFFF", marginY: 3, fontWeight: 600 }}>
              Private Groups
          </Typography>
          <Button 
            className="flex items-center h-fit gap-3 px-5 rounded-3xl bg-[#F6FF82] text-[#8E94E9]" 
            onClick={handleOpen}
            endIcon={<EndArrow />}
          > 
            <Typography className="text-sm lowercase font-urbanist" component="p">Create new group</Typography>
          </Button>
        </Box>
        <Stack className="relative mt-16 z-0" direction="column" spacing={3} >
          {userData.users[0].user_groups.map((group_id: string, index: number) => {
            return (
              < Box className="bg-white border-4 overflow-hidden flex flex-col w-full rounded-xl" key={group_id}>
                <Box className='w-full relative'>
                  <Image priority className="w-full h-full rounded-t-xl" src={`/groups/pg-bg${randomNumber(index)}.png`} height={0} width={900}  alt="group-img" />
                  <LockIcon className="absolute top-2 right-2 bg-[#fff] rounded-full p-3 w-fit" />
                </Box>
                <Box className="w-full px-7 py-4 xxs:flex-col xs:flex-col sm:flex-col gap-3 flex items-center justify-between">
                  <Box className="xxs:max-w-full xs:max-w-full sm:max-w-full max-w-[60%] flex xxs:items-start xs:items-start sm:items-start items-center gap-4">
                    <Image className="w-16 h-16 rounded-t-xl" src='/groups/gp-avatar.svg' height={0} width={0} alt="pg-avatar" />
                    <Box className="flex flex-col gap-2 text-[#1A1A23]">
                      <Box className="flex justify-between items-center">
                        <Typography className="xxs:text-xl xs:text-xl sm:text-xl text-2xl font-semibold font-urbanist">Group name</Typography>
                        <span className=" lg:hidden xl:hidden xxl:hidden text-[#656DE1] text-xs font-urbanist">50 benefits available</span>
                      </Box>
                      <Typography className="opacity-50 text-sm font-urbanist">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus tempore voluptatem saepe, iure, tempora temporibus dolores labore est veniam deserunt adipisci sunt nulla doloribus dolorem possimus!
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="relative xxs:w-full xs:w-full sm:w-full flex gap-4 items-center mt-auto">
                    <span className="xxs:hidden xs:hidden sm:hidden text-[#656DE1] text-xs absolute -top-8 right-2 font-urbanist">50 benefits available</span>
                    <Button
                      onClick={() => navigateToUserPage(group_id)} 
                      className="flex xxs:w-full xs:w-full sm:w-full items-center h-fit gap-3 px-5 rounded-3xl font-urbanist text-white bg-[#8E94E9]" endIcon={<EndArrowWhite />}
                    >
                        Explore Group
                    </Button>
                    <MoreIcon />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Container>
      <Modal
        className="flex items-center justify-center"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="absolute bg-[#8E94E9] flex text-white justify-center py-14 rounded-3xl border-2 border-[#fff] min-w-[80%] lg:min-w-[45vw] xl:min-w-[45vw] xxl:min-w-[45vw] min-h-[75vh]"
        >
          <Button className="text-white font-medium absolute top-2 right-0 text-xl" onClick={handleClose}>
              <Image className='w-8 h-8' src='/groups/icon-close.svg' height={0} width={0} alt='icon-close' />
          </Button>
          <CreateGroupForm userGroups={userData.users[0].user_groups} handleClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
};

export default GroupsHomePage;

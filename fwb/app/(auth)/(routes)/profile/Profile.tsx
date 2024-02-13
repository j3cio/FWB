"use client";
import BlueArrowForward from "@/components/ui/profile/BlueArrowForward";
import Navbar from "@/components/ui/profile/profile_navbar";
import WhiteArrowForward from "@/components/ui/profile/WhiteArrowForward";
import { Box, Button, Container } from "@mui/material";
//import AvatarIcon from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import BlueGroupIcon from "../../../../components/ui/profile/icons/groups-blue.svg";
//import LinkedInIcon from "../../components/ui/profile/icons/linkedin.svg";
import { useUser } from "@clerk/nextjs";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import SaveIcon from "../../../../components/ui/profile/icons/save.svg";
import BargainBackgroundImage from "../../public/bargain1700x350.png";
import { UserData } from "../../../types/types";
import EditProfileModal from "./EditProfileModal";

function Profile({ userData }: { userData: UserData }) {
  // Need to update font
  // Make Bargain text responsive
  // Animations/Hover effects for buttons, etc..

  // It is hard to use the theme colors if they are not a specific MUI component, some colors are not showing up
  const theme = useTheme(); // To call useTheme you have to add "use client;" to the top of your file

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const openEditProfileModal = () => {
    setIsEditProfileModalOpen(true);
  };

  const closeEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };

  const { user } = useUser();

  console.log(userData.users[0].username)

  return (
    <Box sx={{ backgroundColor: "#1A1A23", minHeight: "100vh" }}>
      <Container disableGutters maxWidth="lg">
        <Navbar />
        <div className="bg-[#1a1a23] min-h-screen">
          {/*Container div*/}
          <div className="flex flex-1 flex-col h-full w-full items-center justify-center px-[120px]">
            {/*Profile div*/}
            <div className="flex w-full h-1/5 mt-[95px] mb-[50px] gap-10 border-b-2 border-slate-200 pb-[95px]">
              {/* <AvatarIcon
                  alt="User"
                  sx={{ width: "200px", height: "200px" }}
                  className="flex bg-slate-200 w-48 rounded-full justify-center items-center"
                ></AvatarIcon> */}
              <Avatar
                alt="123"
                src={`${user?.imageUrl}`}
                className="flex bg-slate-200 w-48 rounded-full justify-center items-center"
                sx={{ width: "180px", height: "180px" }}
              />
              <div className="flex flex-col grow justify-center">
                <div className="text-slate-200 text-[35px] mb-[4px] leading-none font-semibold">
                  {userData.users[0].username}
                </div>
                <div className="flex flex-row mb-[16px]">
                  <div className="mr-1 text-slate-200">Works at: </div>
                  <div className=" text-yellow-200">
                    {userData.users[0].company}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    endIcon={<WhiteArrowForward />}
                    variant="contained"
                    sx={{
                      borderRadius: 28,
                      borderStyle: "solid",
                      borderColor: "white",
                      borderWidth: 2,
                      bgcolor: `${theme.palette.neutral.n900}`,
                      color: `${theme.palette.common.white}`,
                      ":hover": {
                        bgcolor: `${theme.palette.neutral.n900}`, // Hover background color
                        color: `${theme.palette.common.white}`, // Hover text color
                      },
                    }}
                    onClick={openEditProfileModal}
                  >
                    Edit Profile
                  </Button>
                  {/* <Button
                      variant="contained"
                      sx={{
                        borderRadius: 28,
                        borderStyle: "solid",
                        borderColor: "white",
                        borderWidth: 2,
                        bgcolor: `${theme.palette.neutral.n900}`,
                        color: `${theme.palette.common.white}`,
                        ':hover': {
                          bgcolor: `${theme.palette.neutral.n900}`, // Hover background color
                          color: `${theme.palette.common.white}`, // Hover text color
                        }
                      }}
                      endIcon={<Image src={LinkedInIcon} alt="123" />}
                    >
                      Verify Employment
                    </Button> */}
                </div>
              </div>
            </div>
            {/*Bargains div*/}
            <div className="flex flex-col w-full grow gap-6">
              <div className="pb-[27%] flex rounded-3xl items-center justify-center relative z-0 bg-no-repeat bg-center bg-contain bg-[url('/profileBanner.svg')]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-row-reverse w-5/6 mr-28">
                    <Button
                      endIcon={<BlueArrowForward />}
                      variant="contained"
                      sx={{
                        borderRadius: 28,
                        borderStyle: "solid",
                        borderColor: "white",
                        borderWidth: 2,
                        bgcolor: `${theme.palette.secondary.light}`,
                        color: `${theme.palette.primary.dark}`,
                        ":hover": {
                          bgcolor: `${theme.palette.secondary.light}`, // Hover background color
                          color: `${theme.palette.primary.dark}`, // Hover text color
                        },
                      }}
                    >
                      Share your discount
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex h-2/5 gap-6">
                <a
                  href="profile"
                  className="flex flex-1 bg-white rounded-3xl items-center h-[126px]"
                >
                  <div className="flex flex-col mx-6">
                    <div className="font-semibold text-2xl">
                      Saved Discounts
                    </div>
                    <div className="text-[14px]">
                      Lorem ipsum dolor sit amet consectetur.
                    </div>
                  </div>
                  <div className="flex flex-row-reverse grow mx-10">
                    <Image
                      src={SaveIcon}
                      alt="Group Icon"
                      width={50}
                      height={50}
                    />{" "}
                    {/* Need custom icon for it to show*/}
                  </div>
                </a>
                <a
                  href="profile"
                  className="flex flex-1 bg-white rounded-3xl items-center gap-6 h-[126px]"
                >
                  <div className="flex flex-col mx-6">
                    <div className="font-semibold text-2xl">Private Groups</div>
                    <div className="text-[14px]">
                      Lorem ipsum dolor sit amet consectetur.
                    </div>
                  </div>
                  <div className="flex flex-row-reverse grow mx-10">
                    <Image
                      src={BlueGroupIcon}
                      alt="Group Icon"
                      width={50}
                      height={50}
                    />{" "}
                    {/* Need custom icon for it to show*/}
                  </div>
                </a>
              </div>
            </div>
            {/*My Benefits div*/}
            <div className="flex flex-col w-full h-1/5 my-[80px] rounded-lg">
              <div className="flex flex-col h-full w-full">
                <div className="flex h-2/5 border-b-2 border-slate-200 text-3xl text-white">
                  My Benefits!
                </div>
                <div className="flex h-1/4 items-center justify-center text-yellow-200 mt-[120px] text-3xl">
                  Be the wingman to a friend&apos;s wallet now!
                </div>
                <div className="flex grow items-center justify-center mt-[24px]">
                  <Button
                    endIcon={<WhiteArrowForward />}
                    variant="contained"
                    sx={{
                      borderRadius: 28,
                      borderStyle: "solid",
                      borderColor: "white",
                      borderWidth: 2,
                      fontSize: "14px",
                      fontWeight: "semiBold",
                      bgcolor: `${theme.palette.neutral.n900}`,
                      color: `${theme.palette.common.white}`,
                      ":hover": {
                        bgcolor: `${theme.palette.neutral.n900}`, // Hover background color
                        color: `${theme.palette.common.white}`, // Hover text color
                      },
                    }}
                  >
                    Share your discounts
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            onClose={closeEditProfileModal}
          />
        </div>
      </Container>
    </Box>
  );
}

export default Profile;

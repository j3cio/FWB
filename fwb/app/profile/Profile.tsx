"use client";
import BlueArrowForward from "@/components/ui/profile/BlueArrowForward";
import Navbar from "@/components/ui/profile/profile_navbar";
import WhiteArrowForward from "@/components/ui/profile/WhiteArrowForward";
import { Container, Box, Button } from "@mui/material";
//import AvatarIcon from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import BlueGroupIcon from "../../components/ui/profile/icons/groups-blue.svg";
//import LinkedInIcon from "../../components/ui/profile/icons/linkedin.svg";
import SaveIcon from "../../components/ui/profile/icons/save.svg";
import BargainBackgroundImage from "../../public/bargain1700x350.png";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { useUser } from "@clerk/nextjs";
import Avatar from '@mui/material/Avatar';
import { UserData } from "../types/types";


function Profile({ userData }: {userData: UserData}) {
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


  return (
    <Box sx={{ backgroundColor: "#1A1A23", minHeight: "100vh" }}>
      <Container disableGutters maxWidth="lg">
        <Navbar />
          <div className="bg-[#1a1a23] min-h-screen">
            {/*Container div*/}
            <div className="flex flex-1 flex-col h-full w-full items-center justify-center">
              {/*Profile div*/}
              <div className="flex w-11/12 h-1/5 mt-6 mb-6 gap-10 border-b-2 border-slate-200 pb-6">
                {/* <AvatarIcon
                  alt="User"
                  sx={{ width: "200px", height: "200px" }}
                  className="flex bg-slate-200 w-48 rounded-full justify-center items-center"
                ></AvatarIcon> */}
                <Avatar alt="123" src={`${user?.imageUrl}`} className="flex bg-slate-200 w-48 rounded-full justify-center items-center" sx={{ width: "180px", height: "180px" }}/>
                <div className="flex flex-col grow justify-center">
                  <div className="m-2 text-slate-200 text-lg">{user?.fullName}</div>
                  <div className="flex flex-row">
                    <div className="my-2 ml-2 mr-1 text-slate-200">Works at: </div>
                    <div className="my-2 text-yellow-200">{userData.users[0].company}</div>
                  </div>
                  <div className="flex gap-2 m-2">
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
                        ':hover': {
                          bgcolor: `${theme.palette.neutral.n900}`, // Hover background color
                          color: `${theme.palette.common.white}`, // Hover text color
                        }
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
              <div className="flex flex-col h-3/5 w-11/12 grow gap-6">
                <div className="flex rounded-3xl items-center justify-center relative z-0">
                  <Image
                    src={BargainBackgroundImage}
                    alt="Image Alt Text"
                    className="object-cover object-center"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="flex w-1/6 ml-48 mt-10 text-6xl font-bold text-yellow-200">Booty Call for Bargains!</h1>
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
                          ':hover': {
                            bgcolor: `${theme.palette.secondary.light}`, // Hover background color
                            color: `${theme.palette.primary.dark}`, // Hover text color
                          }
                        }}
                      >
                        Share your discount
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex h-2/5 gap-6">
                  <a href="profile" className="flex flex-1 bg-white rounded-3xl items-center h-44">
                    <div className="flex flex-col mx-6">
                      <div className="font-semibold text-2xl">Saved Discounts</div>
                    </div>
                    <div className="flex flex-row-reverse grow mx-10">
                      <Image src={SaveIcon} alt="Group Icon" width={50} height={50} /> {/* Need custom icon for it to show*/}
                    </div>
                  </a>
                  <a href="profile" className="flex flex-1 bg-white rounded-3xl items-center gap-6">
                    <div className="flex flex-col mx-6">
                      <div className="font-semibold text-2xl">Private Groups</div>
                    </div>
                    <div className="flex flex-row-reverse grow mx-10">
                      <Image src={BlueGroupIcon} alt="Group Icon" width={50} height={50} />{" "}
                      {/* Need custom icon for it to show*/}
                    </div>
                  </a>
                </div>
              </div>
              {/*My Benefits div*/}
              <div className="flex flex-col w-11/12 h-1/5 my-10 rounded-lg">
                <div className="flex flex-col h-full w-full">
                  <div className="flex h-2/5 border-b-2 border-slate-200 pt-2 pl-2 text-3xl text-white">My Benefits!</div>
                  <div className="flex h-1/4 items-center justify-center text-yellow-200 mt-10 text-3xl">
                    Be the wingman to a friend&apos;s wallet now!
                  </div>
                  <div className="flex grow items-center justify-center mt-6">
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
                        ':hover': {
                          bgcolor: `${theme.palette.neutral.n900}`, // Hover background color
                          color: `${theme.palette.common.white}`, // Hover text color
                        }
                      }}
                    >
                      Share your discount
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <EditProfileModal isOpen={isEditProfileModalOpen} onClose={closeEditProfileModal} />
          </div>
      </Container>
    </Box>
  );
}

export default Profile;
<<<<<<< HEAD:fwb/app/(auth)/(routes)/profile/page.tsx
"use client";
import BlueArrowForward from "@/components/ui/profile/BlueArrowForward";
import Navbar from "@/components/ui/profile/profile_navbar";
import WhiteArrowForward from "@/components/ui/profile/WhiteArrowForward";
import { Container, Box, Button } from "@mui/material";
import AvatarIcon from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import BlueGroupIcon from "../../../../components/ui/profile/icons/groups-blue.svg";
import LinkedInIcon from "../../components/ui/profile/icons/linkedin.svg";
import SaveIcon from "../../../../components/ui/profile/icons/save.svg";
import BargainBackgroundImage from "../../../../public/bargain1700x350.png";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";
=======
import { auth } from "@clerk/nextjs";
import Profile from "./Profile";
>>>>>>> origin/staging:fwb/app/profile/page.tsx

async function getUser(user_id: any, supabaseToken: any, bearerToken: any) {
  var myHeaders = new Headers();
  myHeaders.append("supabase_jwt", supabaseToken);
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${user_id}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result; // This returns the result object
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error; // This re-throws the error to be handled by the caller
  }
}

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const bearer_token = await auth().getToken({ template: "testing_template" });
  const supabase_jwt = await auth().getToken({ template: "supabase" });
  const userId = await auth().userId;

  const userData: any = await getUser(userId, supabase_jwt, bearer_token);

  console.log(userData.users[0].company);

  return (
    <div>
      <Profile userData={userData} />
    </div>
  );
};

export default page;

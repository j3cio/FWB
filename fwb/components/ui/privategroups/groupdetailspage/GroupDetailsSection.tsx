"use client";
import { Group, UserData } from "@/app/types/types";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import MembersIcon from "../icons/membersicon.svg";
import Pencil from "../icons/pencil.svg";
import InviteMemberIcon from "../icons/InviteMemberIcon";
import LockIconYellow from "../icons/LockIconYellow";
import LockIcon from "../icons/LockIcon";

const GroupDetailsSection = ({
  groupData,
  userData,
}: {
  groupData: Group;
  userData: UserData[];
}) => {
  const theme = useTheme(); // To call useTheme you have to add "use client;" to the top of your file

  return (
    <Box className="h-2/3 w-full border-none my-10 flex flex-col">
      <Box className="w-full relative">
        <Image
          priority
          className="w-full h-full"
          src={`/groups/pg-bg2.png`}
          height={0}
          width={900}
          alt="group-img"
        />
        <LockIcon className="absolute top-2 right-2 bg-[#fff] rounded-full p-3 w-fit" />
      </Box>
      <div className="flex justify-between items-center relative px-4 bg-[#1a1a23]">
        <div className="absolute -top-16 left-36 transform -translate-x-1/2 rounded-full">
          <Avatar sx={{ width: 150, height: 150, border: "4px solid black" }} />
        </div>
        <div className="mt-36 flex xxs:flex-col xs:flex-col sm:flex-col gap-4 justify-between">
          <div className="text-white flex flex-col gap-3 xxs:max-w-full xs:max-w-full sm:max-w-full max-w-[50%]">
            <div className="flex items-start gap-1">
              <p className="text-2xl capitalize flex flex-col">
                {groupData.name}
                <span className="text-yellow-300 flex items-center gap-1 text-xs">
                  <LockIconYellow />
                  Private Group
                </span>
              </p>
              <div>
                <Image
                  src={Pencil}
                  alt="Image Alt Text"
                  className="object-cover object-center"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
            <div className="">
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              laboriosam sint suscipit quod esse quaerat voluptates autem modi,
              aut perspiciatis dicta, nihil accusamus blanditiis laborum animi
              corrupti officia dolores. Voluptates.
            </div>
          </div>

          <div className="text-white xxs:w-full xs:w-full sm:w-full flex flex-row-reverse justify-between items-center lg:flex-col xl:flex-col xxl:flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Image
                src="/groups/AvatarContainer.svg"
                alt="empty avatars"
                className="w-full"
                width={0}
                height={0}
              />
              <p className="text-sm">+50 more members</p>
            </div>
            <div className="">
              <Button
                endIcon={<InviteMemberIcon />}
                variant="outlined"
                className="rounded-2xl px-4 py-1 text-white border border-white"
              >
                Invite Members
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default GroupDetailsSection;

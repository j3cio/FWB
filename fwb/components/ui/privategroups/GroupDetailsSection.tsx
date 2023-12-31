import { Avatar, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import MembersIcon from "../privategroups/icons/membersicon.svg";
import Pencil from "../privategroups/icons/pencil.svg";

const GroupDetailsSection = () => {
  const theme = useTheme(); // To call useTheme you have to add "use client;" to the top of your file

  return (
    <div className="h-2/3 w-full bg-white my-10 flex flex-col">
      <div className="bg-white flex-1"></div>
      <div className="flex-1 relative bg-[#1a1a23]">
        <div className="absolute -top-24 left-52 transform -translate-x-1/2 rounded-full">
          <Avatar sx={{ width: 200, height: 200, border: "4px solid black" }} />
        </div>
        <div className="text-white ml-24 mt-36 flex flex-row justify-between">
          <div className="flex flex-row">
            <div>Group Name</div>
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
          <div className="mr-40">
            <Image
              src={MembersIcon}
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
        <div className="text-yellow-300 ml-24">Private Group</div>
        <div className="text-white flex flex-row">
          <div className="ml-24 flex-1">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam laboriosam sint suscipit quod esse quaerat
            voluptates autem modi, aut perspiciatis dicta, nihil accusamus blanditiis laborum animi corrupti officia
            dolores. Voluptates.
          </div>

          <div className="flex-1 flex flex-row-reverse mr-40 gap-4">
            <Button
              variant="contained"
              sx={{
                borderRadius: 28,
                bgcolor: `${theme.palette.neutral.n900}`, // Non-hover color
                color: `${theme.palette.common.white}`,
                border: "2px solid white",
                ":hover": {
                  bgcolor: `${theme.palette.neutral.n900}`, // Hover background color
                  color: `${theme.palette.common.white}`, // Hover text color
                },
              }}
            >
              Invite Members
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: 28,
                bgcolor: `${theme.palette.neutral.n900}`, // Non-hover color
                color: `${theme.palette.common.white}`,
                border: "2px solid white",

                ":hover": {
                  bgcolor: `${theme.palette.neutral.n900}`, // Hover background color
                  color: `${theme.palette.common.white}`, // Hover text color
                },
              }}
            >
              Share invitation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetailsSection;

"use client";
import WhiteArrowForward from "@/components/ui/profile/WhiteArrowForward";
import { Button } from "@mui/material";
import AvatarIcon from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import SearchBar from "./SearchBar";

import MembersIcon from "../privategroups/icons/membersicon.svg";
import Pencil from "../privategroups/icons/pencil.svg";
import Settings from "../privategroups/icons/settings.svg";

const Member = ({ user }: any) => {
  const theme = useTheme(); // To call useTheme you have to add "use client;" to the top of your file
  return (
    <div className="flex flex-row text-white justify-between bg-[#1a1a23] my-4">
      <div className="flex items-center justify-center">
        <AvatarIcon />
        <div className="flex flex-col ml-2">
          <div className="font-bold">{user.username}</div>
          <div className=" font-light">Company: {user.company}</div>
        </div>
      </div>
      <div className="flex items-center justify-center mr-4">
        <div className="mr-2">
          <Image
            src={Settings}
            alt="Image Alt Text"
            className="object-cover object-center"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
            }}
          />
        </div>
        <Button
          endIcon={<WhiteArrowForward />} // change this eventually
          variant="contained"
          sx={{
            borderRadius: 28,
            bgcolor: `${theme.palette.primary.dark}`, // Non-hover color
            color: `${theme.palette.common.white}`,
            ":hover": {
              bgcolor: `${theme.palette.primary.dark}`, // Hover background color
              color: `${theme.palette.common.white}`, // Hover text color
            },
          }}
        >
          Send Message
        </Button>
      </div>
    </div>
  );
};

const MembersSection = ({ users }: any) => {
  return (
    <div className="flex flex-row my-2">
      <div className="flex-1 ml-24">
        <SearchBar />
        {users.map((user: any, index: number) => (
          <Member key={index} user={user} />
        ))}
      </div>
      <div className="flex-1 border-l-2 border-white pl-4 mr-40">
        <div className="flex justify-between text-white my-4">
          <div className="flex flex-row">
            <div className="font-semibold text-4xl">About</div>
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

          <div>
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
        <div className="text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam quasi provident ad, nulla voluptates dolores
          fugit similique saepe. Atque, accusamus voluptates? Consequuntur numquam aspernatur saepe! Illum, itaque. Non,
          assumenda accusantium.
        </div>
        <div className="flex text-white">
          <div className="font-semibold text-4xl mt-24">Group Rules</div>
          <div className="mt-24">
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
        <div className="text-white">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit explicabo, dolores iusto natus
          mollitia cumque nostrum sunt maiores voluptates quam delectus molestiae ipsa repellendus ullam! Aspernatur
          recusandae nam modi ratione!
        </div>
      </div>
    </div>
  );
};

export default MembersSection;

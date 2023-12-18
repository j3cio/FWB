"use client";
import { Button } from "@mui/material";
import AvatarIcon from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";
import SearchBar from "./SearchBar";

import WhiteArrowForward from "@/components/profile/WhiteArrowForward";

const MembersArray = Array.from({ length: 10 }, (_, index) => index + 1);

const Member = () => {
  const theme = useTheme(); // To call useTheme you have to add "use client;" to the top of your file

  return (
    <div className="flex flex-row text-white justify-between my-4 mx-4 bg-[#1a1a23]">
      <div className="flex items-center justify-center">
        <AvatarIcon />
        <div className="flex flex-col ml-2">
          <div className="font-bold">Name</div>
          <div className=" font-light">Company</div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="mr-2">Settings</div>
        <Button
          endIcon={<WhiteArrowForward />} // change this eventually
          variant="contained"
          sx={{
            borderRadius: 28,
            bgcolor: `${theme.palette.neutral.n700}`,
          }}
        >
          Send Message
        </Button>
      </div>
    </div>
  );
};

const MembersSection = () => {
  return (
    <div className="flex flex-row">
      <div className="flex-1">
        <SearchBar />
        {[...Array(10)].map((_, index) => (
          <Member key={index} />
        ))}
      </div>
      <div className="flex-1 border-l-2 border-white pl-4 mx-4">
        <div className="flex justify-between text-white">
          <div className="flex flex-row">
            <div className="font-semibold text-4xl">About</div>
            <div>Icon</div>
          </div>

          <div>Members icons</div>
        </div>
        <div className="text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam quasi provident ad, nulla voluptates dolores
          fugit similique saepe. Atque, accusamus voluptates? Consequuntur numquam aspernatur saepe! Illum, itaque. Non,
          assumenda accusantium.
        </div>
        <div className="flex text-white">
          <div className="font-semibold text-4xl">Group Rules</div>
          <div>Icon</div>
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

import { Button } from "@mui/base";
import { Box } from "@mui/material";
import { useState } from "react";
import DiscountsSection from "./DiscountsSection";
import MembersSection from "./MembersSection";

const Tabs = () => {
  // Tab State
  const [showMembers, setShowMembers] = useState(false);
  const showMemberTab = () => {
    setShowMembers(true);
  };
  const showDiscountsTab = () => {
    setShowMembers(false);
  };

  return (
    <div className=" w-full h-full">
      <div className="flex flex-row justify-evenly items-center">
        <div className={`w-1/2 hover:text-white hover:border-b-2 hover:border-white ${!showMembers ? `text-white border-b-2 border-white` : `text-gray-600` }`}>
          <Box textAlign="center">
            <Button onClick={showDiscountsTab} className=" items-center">
              Discounts Offers
            </Button>
          </Box>
        </div>
        <div className={`w-1/2 hover:text-white hover:border-b-2 hover:border-white ${showMembers ? `text-white border-b-2 border-white` : `text-gray-600` }`}>
          <Box textAlign="center">
            <Button onClick={showMemberTab}>Members</Button>
          </Box>
        </div>
      </div>
      {showMembers ? <MembersSection /> : <DiscountsSection />}
    </div>
  );
};

export default Tabs;

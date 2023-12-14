"use client";
import Header from "@/components/ui/explore/header";
import Bargains from "../../../components/ui/privategroups/bargains_picture";
import DiscountsSection from "@/components/ui/privategroups/DiscountsSection";
import MembersSection from "@/components/ui/privategroups/MembersSection";
import { useState } from "react";




const page = () => {

  const [showMembers, useShowMembers] = useState(false)

  return (
    <div className="bg-[#1a1a23] min-h-screen">
      <Header />
      <div> Profile Section </div>
      <Bargains />
      <div> Tab Section </div>
      {showMembers ? <MembersSection /> : <DiscountsSection />}
    </div>
  );
};

export default page;

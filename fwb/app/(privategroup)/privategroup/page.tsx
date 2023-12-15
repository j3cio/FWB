"use client";
import Header from "@/components/ui/explore/header";
import Bargains from "../../../components/ui/privategroups/bargains_picture";
import Tabs from "@/components/ui/privategroups/Tabs";

const page = () => {
  

  return (
    <div className="bg-[#1a1a23] min-h-screen">
      <Header />
      <div> Profile Section </div>
      <Bargains />
      <Tabs />
    </div>
  );
};

export default page;

"use client";
import Header from "@/components/ui/explore/header";
import Bargains from "../../../components/ui/privategroups/bargains_picture";

const page = () => {
  return (
    <div className="bg-[#1a1a23] min-h-screen">
      <Header />
      <div> profile section </div>
      <Bargains />
      <div> discounrt offers section</div>
    </div>
  );
};

export default page;

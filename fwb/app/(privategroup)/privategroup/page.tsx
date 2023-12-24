"use client";
import Header from "@/components/ui/explore/header";
import GroupDetailsSection from "@/components/ui/privategroups/GroupDetailsSection";
import Tabs from "@/components/ui/privategroups/Tabs";

//TODOs:
// Backend ---
// Hook up to backend (Group info, discount info, and user info)
// Search bar for searching members

const page = () => {
  return (
    <div className="bg-[#1a1a23] h-screen w-screen overflow-x-hidden">
      <Header />
      <GroupDetailsSection />
      <Tabs />
    </div>
  );
};

export default page;

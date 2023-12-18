"use client";
import Header from "@/components/ui/explore/header";
import GroupDetailsSection from "@/components/ui/privategroups/GroupDetailsSection";
import Tabs from "@/components/ui/privategroups/Tabs";

//TODOs:
// Frontend ---
// Add Icons
// Adjust some spacing margins
// Adjust font sizes
// Button colors
// Spacing for the discounts section
// Backend ---
// Search bar for searching members
// Hook up to backend (Group info, discount info, and user info)

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

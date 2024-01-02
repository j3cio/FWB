"use client";

import './page.css'
import React from "react";
import dynamic from "next/dynamic";
import "@sendbird/uikit-react/dist/index.css";
import Navbar from '@/components/ui/messaging/Navbar';

const DynamicAppWithNoSSR = dynamic(() => import("../../../../components/ui/messaging/Chat"), {
  ssr: false,
  loading: () => <p>...</p>
});

export default function Messages() {
  return (
    <div>
      <Navbar />
      <div className='messageUi'>
        <DynamicAppWithNoSSR />
      </div>
    </div>
   );
};
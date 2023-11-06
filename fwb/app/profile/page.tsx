import Navbar from "@/components/ui/Navbar";
import { Button } from "@mui/material";
import React from "react";
function page() {

  // Will update colors once we have the color theme set up
  // Need to update font
  return (
    <div>
      <Navbar></Navbar>
      {/*Container div*/}
      <div className="flex flex-col flex-grow h-screen w-full bg-slate-900 items-center justify-center">
        {/*Profile div*/}
        <div className="flex w-11/12 h-1/5 mt-6 mb-6 gap-10">
          <div className="flex bg-slate-200 w-48 rounded-full justify-center items-center">Profile Icon</div>
          <div className="flex flex-col grow justify-center">
            <div className="m-2  text-slate-200">User Name</div>
            <div className="m-2 text-slate-200">Works at: Company Name</div> {/* Company name should be Yellow*/}
            <div className="flex gap-2 m-2">
              <Button variant="contained" sx={{ borderRadius: 28, borderStyle: 'solid', borderColor: 'white', borderWidth: 2 }}>Edit Profile {'>'} </Button>
              <Button variant="contained" sx={{ borderRadius: 28, borderStyle: 'solid', borderColor: 'white', borderWidth: 2 }}>Verify Employment li logo</Button>
            </div>
          </div>
        </div>
        {/*Bargains div*/}
        <div className="flex flex-col bg-violet-400 w-11/12 grow border-t-4 border-slate-200">
          <div className="flex grow bg-red-300">booty call bargains picture</div>
          <div className="flex h-2/5">
            <a href="google.com" className="flex flex-1 bg-blue-300">Saved Discounts</a>
            <a href="google.com" className="flex flex-1 bg-blue-400">Private Group</a>
          </div>
        </div>
        {/*My Benefits div*/}
        <div className="bg-violet-300 w-11/12 h-1/5 my-10 rounded-lg">

        </div>
      </div>
    </div>
  );
}

export default page;

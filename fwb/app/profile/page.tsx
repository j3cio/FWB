import Navbar from "@/components/ui/Navbar";
import { Button } from "@mui/material";
import React from "react";
function page() {
  // Finish Booty Call Bargains section with proper background
  // Update colors once we have the color theme set up
  // Proper icons, logos and images
  // Fix buttons
  // Need to update font
  return (
    <div>
      <Navbar></Navbar>
      {/*Container div*/}
      <div className="flex flex-col flex-grow h-screen w-full bg-slate-900 items-center justify-center">
        {/*Profile div*/}
        <div className="flex w-11/12 h-1/5 mt-6 mb-6 gap-10 border-b-2 border-slate-200 pb-6">
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
        <div className="flex flex-col w-11/12 grow gap-6">
          <div className="flex grow bg-red-300 rounded-3xl items-center justify-center">Booty Ball Bargains</div>
          <div className="flex h-2/5 gap-6">
            <a href="google.com" className="flex flex-1 bg-white rounded-3xl items-center gap-6">
              <div className="flex flex-col mx-6">
              <div>Saved Discounts</div>
              <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
              </div>
              <div className="flex flex-row-reverse grow mx-10">
                Icon
              </div>
            </a>
            <a href="google.com" className="flex flex-1 bg-white rounded-3xl items-center gap-6">
              <div className="flex flex-col mx-6">
              <div>Private Group</div>
              <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
              </div>
              <div className="flex flex-row-reverse grow mx-10">
                Icon
              </div>
            </a>
          </div>
        </div>
        {/*My Benefits div*/}
        <div className="flex flex-col w-11/12 h-1/5 my-10 rounded-lg">
            <div className="flex flex-col h-full w-full">
              <div className="flex h-2/5 border-b-2 border-slate-200 pt-2 pl-2 text-3xl text-white">My Benefits!</div>
              <div className="flex h-1/4 items-center justify-center text-yellow-200">Be the wingman to a friend's wallet now!</div>
              <div className="flex grow items-center justify-center">
              <Button variant="contained" sx={{ borderRadius: 28, borderStyle: 'solid', borderColor: 'white', borderWidth: 2 }}>Share your discount {'>'}</Button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default page;

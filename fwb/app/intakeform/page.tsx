"use client";
import React from "react";
import "./page.css";
import Navbar from "@/components/profile/Navbar";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function intakeform() {
  // const theme = useTheme();

  return (
    <div>
       <Box sx={{ backgroundColor: "#1A1A23", minHeight: "100vh" }}>
      <div>
        <Navbar></Navbar>
      </div>
      <div className="flex flex-col">
        <div className="share">
          <Typography
            sx={{
              color: "#F6FF82",
              fontWeight: "600",
              // fontFamily: `${theme.typography.button.fontFamily}`,
              fontSize: "32px",
            }}
          >
            Share My Benefits
          </Typography>
        </div>
        <div className="line1">
          <div className="email">Email*</div>
          <div>
           
            <input
              className="inputEmail"
              placeholder="Email@address.com"
              // onChange={(e) => setEmailAddress(e.target.value)}
              id="email"
              name="email"
              type="email"
            />
          </div>
        </div>
        <div className="line2">
          <div className="company">Company Name*</div>
          <div>
           
            <input
              className="inputCompany"
              placeholder="Company Name"
              // onChange={(e) => setEmailAddress(e.target.value)}
              id="companyName"
              name="companyName"
              type="companyName"
            />
          </div>
        </div>
        <div className="line3">
          <div className="url">Company URL*</div>
          <div>
           
           <input
             className="inputUrl"
             placeholder="/https:/abcdefgh.com"
             // onChange={(e) => setEmailAddress(e.target.value)}
             id="companyName"
             name="companyName"
             type="companyName"
           />
         </div>
        </div>
        <div className="line4">
          <div className="verify">Verify Employment</div>
          <div className="LinkedIn">Verify with LinkedIn</div>
        </div>
        <div>
          <div>
            <Typography
              sx={{
                color: "#F6FF82",
                fontWeight: "600",
                // fontFamily: `${theme.typography.button.fontFamily}`,
                fontSize: "32px",
              }}
            >
              Benefit Details
            </Typography>
            <div>
            <div className="amount">Discount Amount*</div>
            <div></div>
            </div>
            <div>
            <div className="amount">Category*</div>
            <div></div>
            </div>
            <div>
            <div className="amount">Discount Rules* <p>& Conditions</p></div>
            <div></div>
            </div>
            <div>
            <div className="amount">Share on*</div>
            <div></div>
            <div></div>
            </div>
          </div>
        </div>
        <div>
          <div>I agree to the Terms & Privacy Policy</div>
          <div className="submitButtons">
            <div>
              <button className="save">Save and Share</button>
            </div>
            <div>
              <button className="cancel">Cancel</button>
            </div>
          </div>
        </div>
      </div>
      </Box>
    </div>
  );
}

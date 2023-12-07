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
        <div>
        <div>Email</div>
        <div>    <input
                  className="inputEmail"
                  placeholder="Email@address.com"
                  // onChange={(e) => setEmailAddress(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                /></div>
        </div>
        <div>Company Name</div>
        <div>Company URL</div>
        <div>Verify Employment</div>
        <div>
          <div>
            <Typography
              sx=
              {{
                color: "#F6FF82",
                fontWeight: "600",
                // fontFamily: `${theme.typography.button.fontFamily}`,
                fontSize: "32px",
              }}>
              Benefit Details
            </Typography>
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
    </div>
  );
}

"use client";

import "./page.css";
import Navbar from "@/components/profile/Navbar";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import { useState } from "react";

export default function Intakeform() {
  // const theme = useTheme();
  const [discount, setDiscount] = useState(0);
  const handleSlide = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setDiscount(newValue);
    }
  };
  // const handleChange = (event, newDiscount) => {
  //   setValue(newValue);
  // };

  return (
    <div>
      <Box sx={{ backgroundColor: "#1A1A23", minHeight: "100vh" }}>
        <div>
          <Navbar></Navbar>
        </div>
        <div className="formContainer">
          <div className="firstBox">
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
          </div>
          <div>
            <div className="secondBox">
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
                  <div>
                    <div>
                    <div className="discount">
                  <div className="amount">Discount Amount*</div>
                 
                    <div style={{ width: "320px" }}>
                      {/* <Typography gutterBottom>
                        Slider Value: {discount}
                      </Typography> */}
                      <Slider
                        value={discount}
                        onChange={handleSlide}
                        valueLabelDisplay="auto"
                        aria-labelledby="continuous-slider"
                      />
                  
                      </div>
                      <div className="discountName">{discount}</div>
                      <div className="percentage">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M1.66797 12.3337L12.3346 1.66699L1.66797 12.3337Z"
                            fill="white"
                          />
                          <path
                            d="M1.66797 12.3337L12.3346 1.66699"
                            stroke="white"
                            stroke-width="2.13333"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M2.73463 3.80033C3.32373 3.80033 3.8013 3.32276 3.8013 2.73366C3.8013 2.14456 3.32373 1.66699 2.73463 1.66699C2.14554 1.66699 1.66797 2.14456 1.66797 2.73366C1.66797 3.32276 2.14554 3.80033 2.73463 3.80033Z"
                            fill="white"
                            stroke="white"
                            stroke-width="2.13333"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M11.2678 12.334C11.8569 12.334 12.3345 11.8564 12.3345 11.2674C12.3345 10.6783 11.8569 10.2007 11.2678 10.2007C10.6787 10.2007 10.2012 10.6783 10.2012 11.2674C10.2012 11.8564 10.6787 12.334 11.2678 12.334Z"
                            fill="white"
                            stroke="white"
                            stroke-width="2.13333"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="amount">Category*</div>
                      <div></div>
                    </div>
                    <div>
                      <div className="amount">
                        Discount Rules* <p>& Conditions</p>
                      </div>
                      <div></div>
                    </div>
                    <div>
                      <div className="amount">Share on*</div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="agree">
                  I agree to the <a className="">Terms & Privacy Policy</a>
                </div>
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
        </div>
      </Box>
    </div>
  );
}

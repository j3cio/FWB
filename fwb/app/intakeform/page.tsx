"use client";

import "./page.css";
import NavbarForm from "@/components/form/NavbarForm";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";


const theme = createTheme({
  components: {
    MuiSlider: {
      styleOverrides: {
       
        root: {
          height: 8, // Thickness
        },
        thumb: {
          backgroundColor: "#8E94E9",
        },
        track: {
          backgroundColor: "#8E94E9",
        },
        rail: {
          backgroundColor: "#FFF",
        },
        valueLabel: {
          backgroundColor: "#FFF", // Label background color
          color: "#000", // Label text color
        },
        valueLabelLabel: {
          color: "#000", // Label text color
        },
        // trackFilled: {
        //   backgroundColor: "#FFF", // Upper part fill color
        // },
        // railHover: {
        //   backgroundColor: "#FFF", // Runnable track color on hover
        // },
      
    },
  },}
});



export default function Intakeform() {
  // const theme = useTheme();
  const [discount, setDiscount] = useState(0);
  const handleSlide = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setDiscount(newValue);
    }
  };
  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const valueLabelFormat = (discount) => {
    return `${discount}%`;
  };

  const [selectedOption, setSelectedOption] = useState("");

  const handleUpdate = (event) => {
    setSelectedOption(event.target.value);
  };

  
  


  return (
    <div>
      <Box sx={{ backgroundColor: "#1A1A23", minHeight: "100vh" }}>
        <div>
          <NavbarForm></NavbarForm>
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
              <div className="LinkedIn">Verify with LinkedIn<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M14.2222 0C14.6937 0 15.1459 0.187301 15.4793 0.520699C15.8127 0.854097 16 1.30628 16 1.77778V14.2222C16 14.6937 15.8127 15.1459 15.4793 15.4793C15.1459 15.8127 14.6937 16 14.2222 16H1.77778C1.30628 16 0.854097 15.8127 0.520699 15.4793C0.187301 15.1459 0 14.6937 0 14.2222V1.77778C0 1.30628 0.187301 0.854097 0.520699 0.520699C0.854097 0.187301 1.30628 0 1.77778 0H14.2222ZM13.7778 13.7778V9.06667C13.7778 8.29813 13.4725 7.56107 12.929 7.01763C12.3856 6.47419 11.6485 6.16889 10.88 6.16889C10.1244 6.16889 9.24444 6.63111 8.81778 7.32444V6.33778H6.33778V13.7778H8.81778V9.39556C8.81778 8.71111 9.36889 8.15111 10.0533 8.15111C10.3834 8.15111 10.6999 8.28222 10.9333 8.5156C11.1667 8.74898 11.2978 9.06551 11.2978 9.39556V13.7778H13.7778ZM3.44889 4.94222C3.84495 4.94222 4.22478 4.78489 4.50484 4.50484C4.78489 4.22478 4.94222 3.84495 4.94222 3.44889C4.94222 2.62222 4.27556 1.94667 3.44889 1.94667C3.05047 1.94667 2.66838 2.10494 2.38666 2.38666C2.10494 2.66838 1.94667 3.05047 1.94667 3.44889C1.94667 4.27556 2.62222 4.94222 3.44889 4.94222ZM4.68444 13.7778V6.33778H2.22222V13.7778H4.68444Z" fill="white"/>
</svg></span></div>
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
                      <div className="discount1">
                        <div className="amount">Discount Amount*</div>
                        <ThemeProvider theme={theme}>
                          <div className="slider" style={{ width: "240px"}}>
                            {/* <Typography gutterBottom>
                        Slider Value: {discount}
                      </Typography> */}
                            <Slider
                              value={discount}
                              onChange={handleSlide}
                              valueLabelDisplay="auto"
                              valueLabelFormat={valueLabelFormat}
                              // valueLabelStyle={{color:'#1A1A23', backgroundColor:'#FFF'}}
                              aria-labelledby="continuous-slider"
                              
                            />
                          </div>
                        </ThemeProvider>
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
                    <div className="categories">
                      <div className="category">Category*</div>
                      <div className="select">
                        <FormControl
                          fullWidth
                          sx={{ width: "386px", height: "48px", borderRadius:'10px' }}
                        >
                          <InputLabel id="select-label">All</InputLabel>
                          <Select
                            labelId="select-label"
                            id="select"
                            value={selectedOption}
                            label="Select Option"
                            onChange={handleUpdate}
                            sx={{
                              color: "white",
                              "&:before": {
                                borderColor: "#8e94e9",
                              },
                              "&:after": {
                                borderColor: "#8e94e9",
                              },
                              "& .MuiSelect-icon": {
                                color: "white",
                              },
                            }}
                          >
                            {/* <MenuItem value="">
          <em>None</em>
        </MenuItem> */}
                            <MenuItem value="option1">All</MenuItem>
                            <MenuItem value="option2">Sports</MenuItem>
                            <MenuItem value="option3">Fashion</MenuItem>
                            <MenuItem value="option4">Electronic</MenuItem>
                            <MenuItem value="option5">Health</MenuItem>
                            <MenuItem value="option6">Home & Kitchen</MenuItem>
                            <MenuItem value="option7">
                              Computer & Accessories
                            </MenuItem>
                            <MenuItem value="option8">
                              Beauty & Skincare
                            </MenuItem>
                            <MenuItem value="option9">Books</MenuItem>
                            <MenuItem value="option10">Hobbies</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    <div className="rule">
                      <div className="discountRule">
                        Discount Rules* <p>& Conditions</p>
                      </div>
                      <div>
                        {" "}
                        <input
                          className="inputDiscount"
                          placeholder=""
                          // onChange={(e) => setEmailAddress(e.target.value)}
                          id="discountRule"
                          name="discountRule"
                          type="discountRule"
                        />
                      </div>
                    </div>
                    <div className="share">
                      <div className="shareOn">Share on*</div>
                      <div className="public">
                        <span className="pic">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M19.9987 3.33301C10.7987 3.33301 3.33203 10.7997 3.33203 19.9997C3.33203 29.1997 10.7987 36.6663 19.9987 36.6663C29.1987 36.6663 36.6654 29.1997 36.6654 19.9997C36.6654 10.7997 29.1987 3.33301 19.9987 3.33301ZM18.332 33.2163C11.7487 32.3996 6.66536 26.7996 6.66536 19.9996C6.66536 18.9663 6.7987 17.9829 7.01536 17.0163L14.9987 24.9996V26.6663C14.9987 28.4996 16.4987 29.9996 18.332 29.9996V33.2163ZM26.6654 26.6661C28.1654 26.6661 29.3987 27.6327 29.832 28.9827C31.9987 26.6161 33.332 23.4661 33.332 19.9994C33.332 14.4161 29.882 9.63275 24.9987 7.64941V8.33275C24.9987 10.1661 23.4987 11.6661 21.6654 11.6661H18.332V14.9994C18.332 15.9161 17.582 16.6661 16.6654 16.6661H13.332V19.9994H23.332C24.2487 19.9994 24.9987 20.7494 24.9987 21.6661V26.6661H26.6654Z"
                              fill="white"
                            />
                          </svg>
                        </span>

                        <div className="publicLeft">
                          <span>Public</span>
                          <span>Lorem ipsum dolor sit amet consectetur</span>
                        </div>
                      </div>

                      <div className="private">
                        <span className="pic">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M28.3346 14.1667H30.0013C31.8346 14.1667 33.3346 15.6667 33.3346 17.5V34.1667C33.3346 36 31.8346 37.5 30.0013 37.5H10.0013C8.16797 37.5 6.66797 36 6.66797 34.1667V17.5C6.66797 15.6667 8.16797 14.1667 10.0013 14.1667H11.668V10.8333C11.668 6.23333 15.4013 2.5 20.0013 2.5C24.6013 2.5 28.3346 6.23333 28.3346 10.8333V14.1667ZM20.0013 5.83333C17.2346 5.83333 15.0013 8.06667 15.0013 10.8333V14.1667H25.0013V10.8333C25.0013 8.06667 22.768 5.83333 20.0013 5.83333ZM11.668 34.1667C10.7513 34.1667 10.0013 33.4167 10.0013 32.5V19.1667C10.0013 18.25 10.7513 17.5 11.668 17.5H28.3346C29.2513 17.5 30.0013 18.25 30.0013 19.1667V32.5C30.0013 33.4167 29.2513 34.1667 28.3346 34.1667H11.668ZM23.3346 25.8333C23.3346 27.6667 21.8346 29.1667 20.0013 29.1667C18.168 29.1667 16.668 27.6667 16.668 25.8333C16.668 24 18.168 22.5 20.0013 22.5C21.8346 22.5 23.3346 24 23.3346 25.8333Z"
                              fill="white"
                            />
                          </svg>
                        </span>

                        <div className="publicLeft">
                          <span>Private Group</span>
                          <span>Lorem ipsum dolor sit amet consectetur</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="agree">
                <span>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        style={{ color: "white" }} // You can customize the color here
                      />
                    }
                    label=""
                  />
                </span>
                <span className="termAgree">I agree to the</span>{" "}
                <a className="terms">Terms & Privacy Policy</a>
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
      </Box>
    </div>
  );
}

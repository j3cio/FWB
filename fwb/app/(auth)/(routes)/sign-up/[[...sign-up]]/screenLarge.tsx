"use client";
import { useSignUp, useUser } from "@clerk/nextjs";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { VerifyPhoto1 } from "./VerifyPhoto1";
import { VerifyPhoto2 } from "./VerifyPhoto2";
import { VerifyPhoto3 } from "./VerifyPhoto3";
import { VerifyPhoto4 } from "./VerifyPhoto4";
import { VerifyPhoto5 } from "./VerifyPhoto5";
import "./page.css";

export const LargeScreen = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();
  const { user } = useUser();

  const [error, setError] = useState<any>(null);
  if (user) {
    // Redirect authenticated user to the profile page
    router.replace("/profile");
    return null; // You can also render a loading state or redirect message here
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      setError(null);
      await signUp.create({
        emailAddress,
        password,
      });

      // change the UI to our pending section.
      setPendingVerification(true);

      const magicLinkFlow = signUp.createEmailLinkFlow();
      await magicLinkFlow.startEmailLinkFlow({
        redirectUrl: "https://staging.app.makefwb.com/success",
      }); // local development: http://localhost:3000/success
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError(err);
    }
  };

  //This allows User to sign in with Google
  const signUpWithGoogle = async () => {
    try {
      await signUp?.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: `${process.env.SIGNIN_REDIRECT_LINK}`,
        redirectUrlComplete: "/success",
      });
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  //This allows User to sign in with Discord
  const signUpWithDiscord = async () => {
    try {
      const response = await signUp?.authenticateWithRedirect({
        strategy: "oauth_discord",
        redirectUrl: `${process.env.SIGNIN_REDIRECT_LINK}`,
        redirectUrlComplete: "/success",
      });

      console.log(response);
    } catch (error) {
      console.error("Error signing in with Discord", error);
    }
  };

  return (
    <div className="h-screen w-full flex flex-row">
      <div></div>

      {pendingVerification && (
        <div className="processContainer">
          <div className="verify">
            <div className="verifyPhotos">
              <div className="verifyPhotos1">
                <VerifyPhoto1 />
              </div>
              <div className="verifyPhoto2">
                <VerifyPhoto2 />
              </div>
              <div className="verifyPhoto3">
                <VerifyPhoto3 />
              </div>
              <div className="verifyPhoto4">
                <VerifyPhoto4 />
              </div>
              <div className="verifyPhoto5">
                <VerifyPhoto5 />
              </div>
            </div>
            <div className="rightCircle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="204"
                height="204"
                viewBox="0 0 204 204"
                fill="none"
              >
                <circle
                  cx="102"
                  cy="102"
                  r="80.7022"
                  stroke="url(#paint0_linear_916_10370)"
                  stroke-width="0.595588"
                />
                <circle
                  cx="102"
                  cy="102"
                  r="101.625"
                  stroke="url(#paint1_linear_916_10370)"
                  stroke-width="0.75"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_916_10370"
                    x1="30"
                    y1="102"
                    x2="136.875"
                    y2="180.375"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="white" />
                    <stop offset="1" stop-color="white" stop-opacity="0" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_916_10370"
                    x1="45.375"
                    y1="67.125"
                    x2="156.75"
                    y2="213"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="white" />
                    <stop offset="1" stop-color="white" stop-opacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <form>
              <div className="signupProcess">
                <div className="signupTitle">You&apos;re almost there!</div>
                <div className="signupContent">
                  Hey! You&apos;re almost ready to start making Freinds
                  <br></br>
                  with Benefits.Simply click the button below to <br></br>
                  verify your email address
                </div>
                <button type="submit" className="verifyButton">
                  <Link href="/success">Verify Now!</Link>
                </button>
              </div>
            </form>

            <div className="leftCircle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="244"
                height="274"
                viewBox="0 0 244 274"
                fill="none"
              >
                <circle
                  cx="107"
                  cy="137"
                  r="80.7022"
                  transform="rotate(-25.7188 107 137)"
                  stroke="url(#paint0_linear_916_10371)"
                  stroke-width="0.595588"
                />
                <circle
                  cx="107"
                  cy="137"
                  r="101.625"
                  transform="rotate(-25.7188 107 137)"
                  stroke="url(#paint1_linear_916_10371)"
                  stroke-width="0.75"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_916_10371"
                    x1="35.0001"
                    y1="137"
                    x2="141.875"
                    y2="215.375"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="white" />
                    <stop offset="1" stop-color="white" stop-opacity="0" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_916_10371"
                    x1="50.375"
                    y1="102.125"
                    x2="161.75"
                    y2="248"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="white" />
                    <stop offset="1" stop-color="white" stop-opacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div className="stayinContainer">
            <div className="stayWords">Stay in touch with us!</div>
            <div className="socialMedia">
              <div className="twitter">
                <button className="twitterButton">
                  <img src="/twitter.png" alt="Twitter Icon" />
                </button>
              </div>
              <div className="instagram">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                >
                  <g clip-path="url(#clip0_916_10345)">
                    <path
                      d="M9.70166 5.82715C8.83971 5.82715 8.01306 6.16956 7.40356 6.77905C6.79407 7.38855 6.45166 8.21519 6.45166 9.07715C6.45166 9.9391 6.79407 10.7658 7.40356 11.3752C8.01306 11.9847 8.83971 12.3271 9.70166 12.3271C10.5636 12.3271 11.3903 11.9847 11.9998 11.3752C12.6093 10.7658 12.9517 9.9391 12.9517 9.07715C12.9517 8.21519 12.6093 7.38855 11.9998 6.77905C11.3903 6.16956 10.5636 5.82715 9.70166 5.82715Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.47148 0.159092C7.9475 -0.226208 11.4555 -0.226208 14.9315 0.159092C16.8305 0.371092 18.3615 1.86609 18.5845 3.77209C18.9967 7.29675 18.9967 10.8574 18.5845 14.3821C18.3615 16.2881 16.8305 17.7831 14.9325 17.9961C11.4561 18.3815 7.94783 18.3815 4.47148 17.9961C2.57248 17.7831 1.04148 16.2881 0.818481 14.3831C0.406209 10.8581 0.406209 7.29708 0.818481 3.77209C1.04148 1.86609 2.57248 0.371092 4.47148 0.159092ZM14.7015 3.07709C14.4363 3.07709 14.1819 3.18245 13.9944 3.36999C13.8068 3.55752 13.7015 3.81188 13.7015 4.07709C13.7015 4.34231 13.8068 4.59666 13.9944 4.7842C14.1819 4.97173 14.4363 5.07709 14.7015 5.07709C14.9667 5.07709 15.2211 4.97173 15.4086 4.7842C15.5961 4.59666 15.7015 4.34231 15.7015 4.07709C15.7015 3.81188 15.5961 3.55752 15.4086 3.36999C15.2211 3.18245 14.9667 3.07709 14.7015 3.07709ZM4.95148 9.07709C4.95148 7.81731 5.45193 6.60913 6.34272 5.71833C7.23352 4.82754 8.4417 4.32709 9.70148 4.32709C10.9613 4.32709 12.1694 4.82754 13.0602 5.71833C13.951 6.60913 14.4515 7.81731 14.4515 9.07709C14.4515 10.3369 13.951 11.5451 13.0602 12.4358C12.1694 13.3266 10.9613 13.8271 9.70148 13.8271C8.4417 13.8271 7.23352 13.3266 6.34272 12.4358C5.45193 11.5451 4.95148 10.3369 4.95148 9.07709Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_916_10345">
                      <rect
                        width="18"
                        height="18"
                        fill="white"
                        transform="translate(0.70166 0.0771484)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="linkedin">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="23"
                  viewBox="0 0 25 23"
                  fill="none"
                >
                  <path
                    d="M21.9014 20.0002H17.9014V13.2502C17.9014 12.1902 16.7114 11.3102 15.6514 11.3102C14.5914 11.3102 13.9014 12.1902 13.9014 13.2502V20.0002H9.90137V8.00024H13.9014V10.0002C14.5614 8.93024 16.2614 8.24024 17.4014 8.24024C19.9014 8.24024 21.9014 10.2802 21.9014 12.7502V20.0002ZM7.90137 20.0002H3.90137V8.00024H7.90137V20.0002ZM5.90137 2.00024C6.16401 2.00024 6.42408 2.05198 6.66673 2.15248C6.90939 2.25299 7.12986 2.40031 7.31558 2.58603C7.5013 2.77175 7.64862 2.99223 7.74913 3.23488C7.84964 3.47753 7.90137 3.7376 7.90137 4.00024C7.90137 4.26289 7.84964 4.52296 7.74913 4.76561C7.64862 5.00826 7.5013 5.22874 7.31558 5.41446C7.12986 5.60018 6.90939 5.74749 6.66673 5.848C6.42408 5.94851 6.16401 6.00024 5.90137 6.00024C5.63872 6.00024 5.37865 5.94851 5.136 5.848C4.89335 5.74749 4.67287 5.60018 4.48715 5.41446C4.30144 5.22874 4.15412 5.00826 4.05361 4.76561C3.9531 4.52296 3.90137 4.26289 3.90137 4.00024C3.90137 3.46981 4.11208 2.9611 4.48715 2.58603C4.86223 2.21096 5.37093 2.00024 5.90137 2.00024Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <div className="problemContact">
              Having Problems? Email us at{" "}
              <a className="helpEmail" href="help@makefwb.com">
                help@makefwb.com
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

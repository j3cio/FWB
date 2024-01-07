"use client";

import "./page.css";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { FormEvent, useState, KeyboardEvent, useEffect } from "react";
import IllustrationFive from "@/components/ui/fre/IllustrationFive";
import IllustrationSix from "@/components/ui/fre/IllustrationSix";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function UserFlowPage3() {
  //Error handeling for if user tries to access page not signed in or Clerk isn't ready
  const { isSignedIn, user, isLoaded } = useUser();
  const [emailInput, setEmailInput] = useState<string>("");
  const [emailAddresses, setEmailAddresses] = useState<string[]>([]);
  const router = useRouter();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  //adding emails
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (emailInput.trim() !== "") {
        setEmailAddresses((prevEmails) => [...prevEmails, emailInput]);
        setEmailInput("");
      }
    }
  };

  //removing emails
  const handleRemoveEmail = (index: number) => {
    setEmailAddresses((prevEmails) => {
      const updatedEmails = [...prevEmails];
      updatedEmails.splice(index, 1);
      return updatedEmails;
    });
  };

  //sending emails

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/invitations", {
        emails: emailAddresses,
      });
    

      // 이메일 전송 후 상태 초기화 또는 다른 작업 수행
      setEmailAddresses([]);
      setEmailInput("");
      router.push("/profile");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  //OnClick Buttons to handle user redirect to respective socials to share with friends
  const handlewhatsapp = () => {
    window.open("https://www.whatsapp.com/");
  };

  const handleinstagram = () => {
    window.open("https://www.instagram.com/");
  };

  const handlefacebook = () => {
    window.open("https://facebook.com/");
  };

  const handlediscord = () => {
    window.open("https://discord.com/");
  };

  return (
    <div className="pageContent">
      <IllustrationFive />
      <div className="middleSpacing">
        <div className="flex-col justify-center">
          <div className="progresscircles">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="8"
              viewBox="0 0 56 8"
              fill="none"
            >
              <circle cx="4" cy="4" r="4" fill="#ADB4D2" />
              <circle cx="28" cy="4" r="4" fill="#ADB4D2" />
              <circle cx="52" cy="4" r="4" fill="#F6FF82" />
            </svg>
          </div>
          <h2 className="mainHeader">Share with Your Friends!</h2>
          <h5 className="subtext">
            Spread the love and be the wingman to someone else&apos;s wallet!
          </h5>

          {/* This is the form that will handle email sharing  */}

          {/* These are the social media redirect buttons that will handle email sharing  */}
          {/* <div className="flex justify-center items-center space-x-4"> */}
          <div className="icons">
            <button className="icon1" onClick={handlewhatsapp}>
              <img src="/socialicons/whatsapp.SVG" />
            </button>
            <button className="icon1" onClick={handleinstagram}>
              <img src="/socialicons/instagram.SVG" />
            </button>
            <button className="icon1" onClick={handlefacebook}>
              <div className="facebookIcon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                >
                  <path
                    d="M31.0861 16.956C31.0861 9.15628 24.7559 2.82605 16.9561 2.82605C9.1564 2.82605 2.82617 9.15628 2.82617 16.956C2.82617 23.7949 7.68688 29.4893 14.1301 30.8034V21.195H11.3042V16.956H14.1301V13.4235C14.1301 10.6964 16.3486 8.47804 19.0756 8.47804H22.6081V12.717H19.7821C19.005 12.717 18.3691 13.3529 18.3691 14.13V16.956H22.6081V21.195H18.3691V31.0153C25.5048 30.3088 31.0861 24.2895 31.0861 16.956Z"
                    fill="white"
                  />
                </svg>
              </div>
              {/* <img src="/socialicons/facebook.SVG" /> */}
            </button>
            <button onClick={handlediscord}>
              <img src="/socialicons/discord.SVG" />
            </button>
          </div>
          <h5 className="or">Or</h5>

          <form id="invitations" className="emailForm" onSubmit={handleSubmit}>
            <div className="email-list">
              {emailAddresses.map((email, index) => (
                <span key={index} className="email-item">
                  <div className="emailInput">
                    <div className="emailItem">
                      {email}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        style={{ marginTop: "4px", marginLeft: "5px" }}
                        onClick={() => handleRemoveEmail(index)}
                      >
                        <path
                          d="M12.2005 4.02258C12.0759 3.89774 11.9068 3.82759 11.7305 3.82759C11.5541 3.82759 11.385 3.89774 11.2605 4.02258L8.00047 7.27591L4.74047 4.01591C4.61591 3.89108 4.44681 3.82092 4.27047 3.82092C4.09412 3.82092 3.92502 3.89108 3.80047 4.01591C3.54047 4.27591 3.54047 4.69591 3.80047 4.95591L7.06047 8.21591L3.80047 11.4759C3.54047 11.7359 3.54047 12.1559 3.80047 12.4159C4.06047 12.6759 4.48047 12.6759 4.74047 12.4159L8.00047 9.15591L11.2605 12.4159C11.5205 12.6759 11.9405 12.6759 12.2005 12.4159C12.4605 12.1559 12.4605 11.7359 12.2005 11.4759L8.94047 8.21591L12.2005 4.95591C12.4538 4.70258 12.4538 4.27591 12.2005 4.02258Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                </span>
              ))}
            </div>

            <input
              type="text"
              className="inputfriends"
              placeholder="Invite your friends..."
              id="emailInput"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {/* <button type="submit">Send inviations</button> */}
          </form>
          {/* Redirects user back to landing page, Probably should be changed to explore later  */}
          <div className="shareButtons">
            {/* <Link href="/profile" className="next"> */}

            <button className="next" type="submit" form="invitations">
              Share
            </button>
            {/* SVG Icon for arrow from Figma Design */}
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5.20874 13H16.3787L11.4987 17.88C11.1087 18.27 11.1087 18.91 11.4987 19.3C11.8887 19.69 12.5187 19.69 12.9087 19.3L19.4987 12.71C19.8887 12.32 19.8887 11.69 19.4987 11.3L12.9187 4.69996C12.7319 4.5127 12.4783 4.40747 12.2137 4.40747C11.9492 4.40747 11.6956 4.5127 11.5087 4.69996C11.1187 5.08996 11.1187 5.71996 11.5087 6.10996L16.3787 11H5.20874C4.65874 11 4.20874 11.45 4.20874 12C4.20874 12.55 4.65874 13 5.20874 13Z"
                  fill="#8E94E9"
                />
              </svg>
            </div>
            {/* </Link> */}
            <Link href="/profile" className="skip">
              <div className="skipButton">Skip for now</div>
            </Link>
          </div>
        </div>
      </div>
      <IllustrationSix />
    </div>
  );
}

"use client";
import { useSignIn, useUser } from "@clerk/nextjs";
import "dotenv/config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./page.css";

export const SmallScreen = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState<any>(null);
  const { user } = useUser();

  return (
    <div className="h-screen w-full flex flex-row">
      <div className="inline-flex h-auto w-auto mx-auto sm:mt-[160px] xs:mt-[80px] xxs:mt-[64px] z-10">
        <div className="w-auto h-auto flex relative flex-col">
          <div className="check mx-auto xxs:w-[20px] xxs:h-[20px] xs:w-[30px] xs:h-[30px] sm:w-[40px] sm:h-[40px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 60 60"
              fill="none"
            >
              <path
                d="M21.9859 39.6875L13.3109 31.0125C12.8439 30.5443 12.2097 30.2812 11.5484 30.2812C10.8871 30.2812 10.253 30.5443 9.78594 31.0125C8.81094 31.9875 8.81094 33.5625 9.78594 34.5375L20.2359 44.9875C21.2109 45.9625 22.7859 45.9625 23.7609 44.9875L50.2109 18.5375C51.1859 17.5625 51.1859 15.9875 50.2109 15.0125C49.7439 14.5443 49.1097 14.2812 48.4484 14.2812C47.7871 14.2812 47.153 14.5443 46.6859 15.0125L21.9859 39.6875Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="successWord xxs:text-[48px] xs:text-[80px]">
            Success!!
          </div>
          <div className="verifiedAccount">
            You have successfully verified your account
          </div>
          <Link href="/fre1" className="startButton">
            Lets Get Started!
          </Link>
        </div>
      </div>
      <div className=" absolute top-[30%] left-0 w-full z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="30%"
          viewBox="0 0 600 554"
          fill="none"
        >
          <path
            opacity="0.1"
            d="M2419 270.808C2055.64 432.28 1977.33 22.903 1742.24 239.744C1628.22 344.903 1793.32 501.159 1878.97 302.189C1964.05 104.525 1607.83 14.999 1430.54 218.721C1257.78 417.247 1151.34 397.121 1057.68 249.322C964.022 101.523 1187.33 37.162 1144.67 234.998C1132.9 289.593 1102.84 356.512 1077.74 384.795C994.817 478.219 752.143 615.404 443.763 416.756C154.046 230.13 -227.152 298.53 -300.874 384.795C-474 587.376 234.241 540.174 177.766 272.111C164.183 207.638 56.1332 142.758 4.55475 117.8C4.55475 117.8 -191.254 20.2077 -397 36.9266"
            stroke="white"
            stroke-width="70"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

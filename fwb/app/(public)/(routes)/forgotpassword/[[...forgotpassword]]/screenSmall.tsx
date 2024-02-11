"use client";
import React, { SyntheticEvent, useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import type { NextPage } from "next";
import "./page.css";
import Link from "next/link";

export const SmallScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [complete, setComplete] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState<any>(null);

  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  async function create(e: SyntheticEvent) {
    e.preventDefault();

    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true);
      })
      .catch((err: any) => {
        console.error(JSON.stringify(err, null, 2));
        setError(err.errors[0].longMessage);
      });
  }

  async function reset(e: SyntheticEvent) {
    e.preventDefault();
    setError(null);

    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        if (result.status === "needs_second_factor") {
          setSecondFactor(true);
        } else if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
          setComplete(true);
        } else {
          console.log(result);
        }
      })
      .catch((err: any) => {
        console.error(JSON.stringify(err, null, 2));
        setError(err.errors[0].longMessage);
      });
  }

  return (
    <div className="h-screen w-full flex flex-row">
      <div className=" inline-flex p-0 border-0 bg-none z-10 shadow-none mx-auto sm:mt-[160px] xs:mt-[80px] xxs:mt-[64px]">
        <div className="flex p-0 m-0">
          <form onSubmit={!successfulCreation ? create : reset}>
            {!successfulCreation && !complete && (
              <>
                <div className="h-screen flex relative">
                  <div className="border-0 bg-transparent shadow-none flex relative flex-col">
                    <svg
                      className="mail sm:w-[40px] xs:w-[40px] xxs:w-[24px] sm:h-[40px] xs:h-[40px] xxs:h-[24px]"
                      xmlns="http://www.w3.org/2000/svg"
                      width="41"
                      height="41"
                      viewBox="0 0 41 41"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.16659 6.93066H33.8333C35.6666 6.93066 37.1666 8.43066 37.1666 10.264V30.264C37.1666 32.0973 35.6666 33.5973 33.8333 33.5973H7.16659C5.33325 33.5973 3.83325 32.0973 3.83325 30.264L3.84992 10.264C3.84992 8.43066 5.33325 6.93066 7.16659 6.93066ZM21.3831 21.3807L33.1664 14.014C33.5831 13.7473 33.8331 13.2973 33.8331 12.814C33.8331 11.6973 32.6164 11.0307 31.6664 11.614L20.4998 18.5973L9.33309 11.614C8.38309 11.0307 7.16642 11.6973 7.16642 12.814C7.16642 13.2973 7.41642 13.7473 7.83309 14.014L19.6164 21.3807C20.1498 21.714 20.8498 21.714 21.3831 21.3807Z"
                        fill="white"
                      />
                    </svg>

                    <div className="title mt-[24px] mb-[16px] xs:text-[32px] xxs:text-[24px]">
                      Forgot Password?
                    </div>
                    <div className="explanation xs:text-[14px] xxs:text-[12px]">
                      Dont worry! Enter your email address and we
                    </div>
                    <div className="explanation2 mb-[130px] xs:text-[14px] xs:mb-[150px] xxs:text-[12px]">
                      will send a link to reset your password
                    </div>
                    {/* <label htmlFor='email'>Please provide identifier</label> */}
                    <input
                      type="email"
                      className="inputEmail xs:w-[338px] xxs:w-[273px] xs:text-[14px] xss:text-[14px] xs:h-[40px] xxs:h-[36px]"
                      placeholder="takeadvantage@address.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <div>
                      {error && (
                        <div className="errorMessage max-w-[80%]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 17"
                            fill="none"
                            className="errorImage"
                          >
                            <path
                              d="M12.1997 4.49463C12.0752 4.36979 11.9061 4.29964 11.7297 4.29964C11.5534 4.29964 11.3843 4.36979 11.2597 4.49463L7.99974 7.74796L4.73974 4.48796C4.61518 4.36312 4.44608 4.29297 4.26974 4.29297C4.09339 4.29297 3.92429 4.36312 3.79974 4.48796C3.53974 4.74796 3.53974 5.16796 3.79974 5.42796L7.05974 8.68796L3.79974 11.948C3.53974 12.208 3.53974 12.628 3.79974 12.888C4.05974 13.148 4.47974 13.148 4.73974 12.888L7.99974 9.62796L11.2597 12.888C11.5197 13.148 11.9397 13.148 12.1997 12.888C12.4597 12.628 12.4597 12.208 12.1997 11.948L8.93974 8.68796L12.1997 5.42796C12.4531 5.17463 12.4531 4.74796 12.1997 4.49463Z"
                              fill="white"
                            />
                          </svg>{" "}
                          <div className="message">{error}</div>
                        </div>
                      )}
                    </div>

                    <button className="sendEmail xs:w-[338px] xxs:w-[273px] xxs:text-[16px] xs:text-[16px]">
                      Send Email
                    </button>
                    <div className="help xs:text-[12px] xxs:text-[12px]">
                      Having problems? Email us at{" "}
                      <a
                        className="helpEmail xs:text-[12px] xxs:text-[12px]"
                        href="mailto:help@makefwb.com"
                      >
                        help@makefwb.com
                      </a>
                    </div>
                  </div>
                </div>
              </>
            )}

            {successfulCreation && !complete && (
              <>
                <div className="passwordContainer xl:!border-0 xl:!bg-transparent xl:!shadow-none">
                  <div className="title">Reset Password</div>
                  <div className="explanation text-[14px] xxs:text-[12px]">
                    Enter new password with at least 8 charaters, contain at
                    least 1 number and 1 uppercase
                  </div>
                  <div className="explanation2 text-[14px] xxs:text-[12px] mb-[40px] xs:mb-[87px] xxs:mb-[36px]">
                    will send a link to reset your password
                  </div>
                  {/* <label htmlFor="password" className="newPassword">New password</label> */}
                  <input
                    className="inputPassword xs:w-[338px] xxs:w-[273px]"
                    placeholder="New password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  {/* <label className="passwordCode"htmlFor="password">Reset password code</label> */}
                  <input
                    className="inputPasswordCode xs:w-[338px] xxs:w-[273px]"
                    placeholder="Reset Password code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />

                  <div>
                    {error && (
                      <div className="errorMessage">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 17"
                          fill="none"
                          className="errorImage"
                        >
                          <path
                            d="M12.1997 4.49463C12.0752 4.36979 11.9061 4.29964 11.7297 4.29964C11.5534 4.29964 11.3843 4.36979 11.2597 4.49463L7.99974 7.74796L4.73974 4.48796C4.61518 4.36312 4.44608 4.29297 4.26974 4.29297C4.09339 4.29297 3.92429 4.36312 3.79974 4.48796C3.53974 4.74796 3.53974 5.16796 3.79974 5.42796L7.05974 8.68796L3.79974 11.948C3.53974 12.208 3.53974 12.628 3.79974 12.888C4.05974 13.148 4.47974 13.148 4.73974 12.888L7.99974 9.62796L11.2597 12.888C11.5197 13.148 11.9397 13.148 12.1997 12.888C12.4597 12.628 12.4597 12.208 12.1997 11.948L8.93974 8.68796L12.1997 5.42796C12.4531 5.17463 12.4531 4.74796 12.1997 4.49463Z"
                            fill="white"
                          />
                        </svg>{" "}
                        <div className="message text-[14px] xxs:text-[12px]">
                          {error}
                        </div>
                      </div>
                    )}
                  </div>

                  <button className="reset xs:w-[338px] xxs:w-[273px] px-[16px] py-[8px] xxs:px-[12px] xxs:py-[6px] text-[16px] xs:text-[14px] xxs:text-[12px]">
                    Reset
                  </button>
                  <div className="help text-[16px] xxs:text-[12px]">
                    Having problems? Email us at{" "}
                    <a
                      className="helpEmail text-[14px] xxs:text-[12px]"
                      href="mailto:help@makefwb.com"
                    >
                      help@makefwb.com
                    </a>
                  </div>
                </div>
              </>
            )}

            {complete && (
              <div className="passwordContainer xl:!border-0 xl:!bg-transparent xl:!shadow-none">
                <div className="successImage">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="33"
                    height="32"
                    viewBox="0 0 33 32"
                    fill="none"
                  >
                    <path
                      d="M12.283 21.0985L7.71718 16.5327C7.47135 16.2863 7.1376 16.1479 6.78955 16.1479C6.4415 16.1479 6.10775 16.2863 5.86192 16.5327C5.34876 17.0459 5.34876 17.8748 5.86192 18.388L11.3619 23.888C11.8751 24.4011 12.704 24.4011 13.2172 23.888L27.1382 9.96692C27.6514 9.45376 27.6514 8.62481 27.1382 8.11166C26.8924 7.86527 26.5587 7.72681 26.2106 7.72681C25.8626 7.72681 25.5288 7.86527 25.283 8.11166L12.283 21.0985Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="success text-[32px] ">Success!!</div>
                <div className="successMessage text-[32px] xxs:text-[24px]">
                  Yeyyy... You have successfully change your password
                </div>
                <Link
                  href="/sign-in"
                  className="reset xs:w-[338px] xxs:w-[273px] px-[16px] py-[8px] xxs:px-[12px] xxs:py-[6px] text-[16px] xs:text-[14px] xxs:text-[12px]"
                >
                  Go to Sign In Page
                </Link>
              </div>
            )}

            {/* <button className="reset">Go to Sign In Page</button> */}
            {secondFactor && "2FA is required, this UI does not handle that"}
          </form>
        </div>
      </div>
      <div className=" absolute top-[30%] left-0 w-full z-0 xxs:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 600 554"
          fill="none"
        >
          <path
            opacity="0.1"
            d="M1819 270.808C1455.64 432.28 1377.33 22.903 1142.24 239.744C1028.22 344.903 1193.32 501.159 1278.97 302.189C1364.05 104.525 1007.83 14.999 830.543 218.721C657.781 417.247 551.336 397.121 457.679 249.322C364.022 101.523 587.333 37.162 544.669 234.998C532.896 289.593 502.84 356.512 477.737 384.795C394.817 478.219 152.143 615.404 -156.237 416.756C-445.954 230.13 -827.152 298.53 -900.874 384.795C-1074 587.376 -365.759 540.174 -422.234 272.111C-435.817 207.638 -543.867 142.758 -595.445 117.8C-595.445 117.8 -791.254 20.2077 -997 36.9266"
            stroke="white"
            stroke-width="70"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

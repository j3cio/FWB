"use client";
import { useSignUp, useUser } from "@clerk/nextjs";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BoyPhoto } from "./BoyPhoto";
import { GirlPhoto } from "./GirlPhoto";
import { PhotoOne } from "./PhotoOne";
import { PhotoThree } from "./PhotoThree";
import { PhotoTwo } from "./PhotoTwo";
import { VerifyPhoto1 } from "./VerifyPhoto1";
import { VerifyPhoto2 } from "./VerifyPhoto2";
import { VerifyPhoto3 } from "./VerifyPhoto3";
import { VerifyPhoto4 } from "./VerifyPhoto4";
import { VerifyPhoto5 } from "./VerifyPhoto5";
import "./page.css";

export default function Page() {
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
      await magicLinkFlow.startEmailLinkFlow({ redirectUrl: "https://staging.app.makefwb.com/success" }); // local development: http://localhost:3000/success
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
        redirectUrl: "/sso-callback", // 'https://musical-collie-80.clerk.accounts.dev/v1/oauth_callback',
        redirectUrlComplete: "/success"
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
    <div className="pageHeight">
      <div>
      {!pendingVerification && (
        <div className="big">
          <div className="leftSigninContainer">
            <div className="circle1"></div>
            <div className="circle2">
              <div className="leftCircle2">
                <div className="photos">
                  <div className="photo1">
                    <PhotoOne />
                  </div>
                  <div className="photo2">
                    <PhotoTwo />
                  </div>
                  <div className="photo3">
                    <PhotoThree />
                  </div>
                </div>
                <div className="letter">
                  + more<br></br> friend
                </div>
              </div>
              <div className="rightBag">
                <div className="bagPhoto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="97" height="96" viewBox="0 0 97 96" fill="none">
                    <path
                      d="M77.1569 74.8428L73.0649 29.1023C72.9914 28.1971 72.226 27.511 71.2986 27.511H62.6732C62.6584 19.9046 56.4175 13.7144 48.7487 13.7144C41.08 13.7144 34.839 19.9046 34.8243 27.511H26.1988C25.2862 27.511 24.5208 28.1971 24.4325 29.1023L20.3406 74.8428C20.3406 74.9012 20.3406 74.945 20.3406 75.0034C20.3406 80.0986 25.0655 84.2449 30.8648 84.2449H66.6326C72.432 84.2449 77.1569 80.0986 77.1569 75.0034C77.1569 74.945 77.1569 74.9012 77.1569 74.8428ZM48.7487 17.2183C54.4745 17.2183 59.1258 21.8317 59.1405 27.511H38.3569C38.3717 21.8317 43.0229 17.2183 48.7487 17.2183ZM66.6326 80.7264H30.8648C27.0378 80.7264 23.9174 78.2007 23.8732 75.0618L27.818 31.0149H34.8243V37.1613C34.8243 38.1249 35.6192 38.9132 36.5906 38.9132C37.5621 38.9132 38.3569 38.1249 38.3569 37.1613V31.0149H59.1405V37.1613C59.1405 38.1249 59.9354 38.9132 60.9068 38.9132C61.8783 38.9132 62.6732 38.1249 62.6732 37.1613V31.0149H69.6795L73.6243 75.0764C73.5801 78.2007 70.4596 80.7264 66.6326 80.7264Z"
                      fill="white"
                    />
                    <path
                      d="M70.3843 30.5H26.8843L22.8843 78.5L24.8843 81.5H70.3843C71.1843 81.5 74.0509 76.6667 74.3843 75L70.3843 30.5Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="two">
              <div className="circle3">
                <div className="hiLetter">Hi!</div>
                <div className="hiPhoto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="99" height="75" viewBox="0 0 99 75" fill="none">
                    <path
                      d="M7.71092 6.53362L0.66204 48.2338C-0.0232002 52.2876 2.70754 56.1293 6.76132 56.8145L26.6775 60.1811L24.2968 74.2651L35.9252 61.7443L83.0976 69.7182C87.1513 70.4034 90.9931 67.6727 91.6783 63.6189L98.7272 21.9188C99.4124 17.865 96.6817 14.0233 92.6279 13.338L16.2917 0.434341C12.2379 -0.250899 8.39616 2.47984 7.71092 6.53362Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
              <div className="circle4">
                <div className="letterCircle4">
                  +more<br></br>discount
                </div>
                <div className="boyPhoto">
                  <BoyPhoto />
                </div>
                <div className="subCircle4Box"></div>
              </div>
            </div>
            <div className="circle5">
              <div className="subCircle5">
                <div className="circleLetter">%</div>
                <div className="girlPhoto">
                  <GirlPhoto />
                </div>
                <div className="subBox"></div>
              </div>
            </div>
            <div className="three">
              <div className="circle6"></div>
              <div className="circle7">
                <div className="circle7second"></div>
                <div className="circle7third"></div>
              </div>
              <div></div>
            </div>
          </div>

          <div className="rightSigninContainer">
            <div className="signin">
              <div className="name">Create Account</div>
              <div className="buttons">
                <button className="googleButton" onClick={signUpWithGoogle}>
                  <img src="/google.png" alt="Google Icon" />
                </button>
                <button className="discordButton" onClick={signUpWithDiscord}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="21" viewBox="0 0 27 21" fill="none">
                    <path
                      d="M22.5638 2.45395C20.9174 1.68365 19.157 1.12382 17.3166 0.805054C17.0905 1.2137 16.8265 1.76335 16.6444 2.20059C14.688 1.90636 12.7495 1.90636 10.8291 2.20059C10.647 1.76335 10.377 1.2137 10.1489 0.805054C8.30648 1.12382 6.54406 1.6857 4.89768 2.45803C1.57691 7.47615 0.6767 12.3696 1.1268 17.1936C3.32932 18.8384 5.46381 19.8376 7.56229 20.4914C8.08042 19.7783 8.54251 19.0203 8.9406 18.2214C8.18243 17.9333 7.45627 17.5778 6.77013 17.165C6.95216 17.0302 7.13021 16.8892 7.30223 16.7441C11.4872 18.7015 16.0343 18.7015 20.1692 16.7441C20.3433 16.8892 20.5213 17.0302 20.7013 17.165C20.0132 17.5798 19.285 17.9353 18.5268 18.2234C18.9249 19.0203 19.385 19.7804 19.9052 20.4934C22.0057 19.8396 24.1421 18.8405 26.3446 17.1936C26.8728 11.6014 25.4424 6.75285 22.5638 2.45395ZM9.51074 14.2269C8.25446 14.2269 7.22421 13.0541 7.22421 11.6259C7.22421 10.1977 8.23246 9.02286 9.51074 9.02286C10.7891 9.02286 11.8193 10.1956 11.7973 11.6259C11.7993 13.0541 10.7891 14.2269 9.51074 14.2269ZM17.9607 14.2269C16.7044 14.2269 15.6742 13.0541 15.6742 11.6259C15.6742 10.1977 16.6824 9.02286 17.9607 9.02286C19.239 9.02286 20.2692 10.1956 20.2472 11.6259C20.2472 13.0541 19.239 14.2269 17.9607 14.2269Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
              <div className="or">Or</div>
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    className="input"
                    placeholder="Email@address.com"
                    onChange={(e) => setEmailAddress(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                  />
                </div>
                <div>
                  {error &&
                    error.errors
                      .filter((err: any) => err.meta.paramName === "email_address")
                      .map((passwordError: any) => (
                        <div className="errorMessage" key={passwordError.meta.paramName}>
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
                          <div className="message">{passwordError.message}</div>
                        </div>
                      ))}
                </div>
                <div>
                  <input
                    className="input"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                  />
                </div>
                {error &&
                  error.errors
                    .filter((err: any) => err.meta.paramName === "password")
                    .map((passwordError: any) => (
                      <div className="errorMessage" key={passwordError.meta.paramName}>
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
                        <div className="message">{passwordError.message}</div>
                      </div>
                    ))}
                <div className="remember">
                  <FormControlLabel
                    style={{ height: "24px" }}
                    label={<Typography style={{ color: "#fff", fontFamily: "Urbanist" }}>Remember me</Typography>}
                    control={<Checkbox value="remember" style={{ color: "#fff" }}></Checkbox>}
                  ></FormControlLabel>
                </div>
                <ul></ul>
                <button className="submit" type="submit">
                  Submit
                </button>
                <div className="signup">
                  <div className="detail">Already have an account? </div>
                  <Link href="/sign-in" className="signupButton">
                    Sign In
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

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
              <svg xmlns="http://www.w3.org/2000/svg" width="204" height="204" viewBox="0 0 204 204" fill="none">
                <circle cx="102" cy="102" r="80.7022" stroke="url(#paint0_linear_916_10370)" stroke-width="0.595588" />
                <circle cx="102" cy="102" r="101.625" stroke="url(#paint1_linear_916_10370)" stroke-width="0.75" />
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
              <svg xmlns="http://www.w3.org/2000/svg" width="244" height="274" viewBox="0 0 244 274" fill="none">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
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
                      <rect width="18" height="18" fill="white" transform="translate(0.70166 0.0771484)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="linkedin">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="23" viewBox="0 0 25 23" fill="none">
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
    </div>
  );
}

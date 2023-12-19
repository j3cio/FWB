"use client";
import { useSignIn, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BoyPhoto } from "./BoyPhoto";
import { GirlPhoto } from "./GirlPhoto";
import { Svg1 } from "./Svg1";
import { Svg2 } from "./Svg2";
import "./page.css";
import { Photo3 } from "./photo3";

export default function Page() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState<any>(null);
  const { user } = useUser();

  if (user) {
    // Redirect authenticated user to the profile page
    router.replace("/profile");
    return null; // You can also render a loading state or redirect message here
  }

  // useEffect(() => {
  //   if (user) {
  //     console.log(user)
  //     router.push("/profile");

  //   }
  // }, [user]);

  // start the sign In process.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    // Start the sign-in process using the email and password provided
    try {
      setError(null);
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        // If complete, user exists and provided password match -- set session active
        await setActive({ session: result.createdSessionId });
        // Redirect the user to a post sign-in route
        router.push("/");
      } else {
        // The status can also be `needs_factor_on', 'needs_factor_two', or 'needs_identifier'
        // Please see https://clerk.com/docs/references/react/use-sign-in#result-status for  more information
        console.error(JSON.stringify(result, null, 2));
      }
    } catch (err: any) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      console.error(JSON.stringify(err, null, 2));
      setError(err);
    }
  };

  //Sign in with Google
  //This allows User to sign in with Google
  const signInWithGoogle = async () => {
    try {
      await signIn?.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "https://clerk.makefwb.com/v1/oauth_callback", // "https://musical-collie-80.clerk.accounts.dev/v1/oauth_callback"
        redirectUrlComplete: "/fre1", // redirect to this route if sign-in is successful
      });
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  //Sign in with Discord
  const signInWithDiscord = async () => {
    try {
      const response = await signIn?.authenticateWithRedirect({
        strategy: "oauth_discord",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/fre1", // redirect to this route if sign-in is successful
      });

      console.log(response);
    } catch (error) {
      console.error("Error signing in with Discord", error);
    }
  };

  return (
    <div className="big">
      <div className="leftSigninContainer">
        <div className="circle1"></div>
        <div className="circle2">
          <div className="leftCircle2">
            <div className="photos">
              <div className="photo1">
                <Svg1 />
              </div>
              <div className="photo2">
                <Svg2 />
              </div>
              <div className="photo3">
                <Photo3 />
              </div>
            </div>
            <div className="letter">
              + more<br></br> friend
            </div>
          </div>
          <div className="rightBag">
            <div className="bagPhoto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="97"
                height="96"
                viewBox="0 0 97 96"
                fill="none"
              >
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="99"
                height="75"
                viewBox="0 0 99 75"
                fill="none"
              >
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
          {/* <SignIn /> */}

          <div>
            <div className="name">Sign In</div>
            <div className="buttons">
              <button className="googleButton" onClick={signInWithGoogle}>
                <img src="/google.png" alt="Google Icon" />
              </button>
              <button className="discordButton" onClick={signInWithDiscord}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="21"
                  viewBox="0 0 27 21"
                  fill="none"
                >
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
                {/* <label htmlFor="email">Email</label> */}
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
                    .filter(
                      (err: any) => err.meta.paramName === "email_address"
                    )
                    .map((passwordError: any) => (
                      <div
                        className="errorMessage"
                        key={passwordError.meta.paramName}
                      >
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
                {/* <label htmlFor="password">Password</label> */}
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
                    <div
                      className="errorMessage"
                      key={passwordError.meta.paramName}
                    >
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

              <div className="password">
                <Link href="/forgotpassword" className="forgetPassword">
                  Forgot Password?
                </Link>
              </div>

              <button className="submit" type="submit">
                Submit
              </button>
              <div className="signup">
                <div className="detail">Don&apos;t have an account? </div>
                <Link href="/sign-up" className="signupButton">
                  Create Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

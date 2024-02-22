"use client";
import { useSignIn, useUser } from "@clerk/nextjs";
import "dotenv/config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./page.css";

export const LargeScreen = () => {
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
  //     console.log(user);
  //     router.push("/profile");
  //   } else {
  //     console.log("not signed in");
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
        redirectUrl: `${process.env.SIGNIN_REDIRECT_LINK}`,
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
        redirectUrl: `${process.env.SIGNIN_REDIRECT_LINK}`,
        redirectUrlComplete: "/fre1", // redirect to this route if sign-in is successful
      });

      console.log(response);
    } catch (error) {
      console.error("Error signing in with Discord", error);
    }
  };

  return (
    <div className="h-screen w-full flex flex-row">
      <div className="flex w-auto h-auto flex-col mt-auto ml-auto translate-y-[70px]">
        <div className="bg-no-repeat bg-center bg-contain bg-[url('/fre0/BubbleHi.svg')] w-[133px] h-[133px]"></div>
        <div className="bg-no-repeat bg-center bg-contain bg-[url('/fre0/BubbleGirl.svg')] w-[134px] h-[400px]"></div>
        <div className="circle6 lg:w-[133px] lg:h-[133px]"></div>
      </div>
      <div className="signin flex p-0 max-w-[556px] h-[728px] mx-0 my-auto w-2/3">
        <div className="absolute top-[50%] left-[50%] pn-[30px] translate-x-[-50%] translate-y-[-50%]">
          <div className="name">Sign In</div>
          <div className="buttons">
            <button className="googleButton" onClick={signInWithGoogle}>
              <img src="/google.png" alt="Google Icon" />
            </button>
            <button className="discordButton" onClick={signInWithDiscord}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
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
                  .filter((err: any) => err.meta.paramName === "email_address")
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
      <div className="flex flex-col h-auto w-[133px] mb-auto mr-auto">
        <div className="w-[133px] mt-[-50px]">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 138 262"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 1.6842H1.6842V3L1.6842 193C1.6842 230.177 31.8225 260.316 69 260.316C106.177 260.316 136.316 230.177 136.316 193L136.316 3V1.6842H135H3Z"
              stroke="white"
              stroke-width="2.63158"
            />
            <g opacity="0.5">
              <path
                d="M3 1.6842H1.6842V3L1.6842 155C1.6842 192.177 31.8225 222.316 69 222.316C106.177 222.316 136.316 192.177 136.316 155L136.316 3V1.6842H135L3 1.6842Z"
                stroke="white"
                stroke-width="2.63158"
              />
            </g>
            <g opacity="0.25">
              <path
                d="M3 1.6842H1.6842V3L1.6842 112C1.6842 149.177 31.8225 179.316 69 179.316C106.177 179.316 136.316 149.177 136.316 112L136.316 3V1.6842H135L3 1.6842Z"
                stroke="white"
                stroke-width="2.63158"
              />
            </g>
          </svg>
        </div>
        <div className="bg-no-repeat bg-center bg-contain bg-[url('/fre0/BubbleFriend.svg')] w-[260px] h-[133px] translate-x-[-50%]"></div>
        <div className="bg-no-repeat bg-center bg-contain bg-[url('/fre0/BubbleBoy.svg')] w-[133px] h-[420px]"></div>
        <div className="lg:w-[133px] lg:h-[133px] lg:ml-0 circle1"></div>
      </div>
    </div>
  );
};

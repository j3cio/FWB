"use client";

import "./page.css";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import IllustrationOne from "@/components/ui/fre/IllustrationOne";
import IllustrationTwo from "@/components/ui/fre/IllustrationTwo";
import { useRouter } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs";

export default function UserFlowPage1() {
  //TODO: Username verification feature, onChange run code to show user Username is available (possibly grey out Next Option)

  const { isSignedIn, user, isLoaded } = useUser();
  //Creating Random Name Generation Feature for User
  const [randomName, setRandomName] = useState<any | null>(null);
  // Creating useState for Optimistc Image Loading
  const [optimisticImageUrl, setOptimisticImageUrl] = useState<string | null>(
    null
  );

  //Add router to push to fre2 after making User API POST Request
  const router = useRouter();

  //Initializes random username on the first render of webpage
  useEffect(() => {
    setRandomName(generateRandomUsername());
  }, []);

  //Error handeling for if user tries to access page not signed in or Clerk isn't ready
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  //Function to Allow user to Upload their own Profile Picture
  const updateProfilePicture = () => {
    const fileInput = document.getElementById(
      "profilePicture"
    ) as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (file) {
      // Use Clerk's setProfileImage method to update the profile picture
      user!
        .setProfileImage({ file })
        .then((imageResource) => {
          console.log("Profile picture updated:", imageResource);
        })
        .catch((error) => {
          console.error("Error updating profile picture:", error);
        });
    } else {
      console.warn("No file selected.");
    }
  };

  //Functions to Allow user to choose amongst our default options for their Profile Picture
  const convertFilePathToBlob = async (image: any) => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      return blob; //Image file needed to be converted to blob from string to be uploaded to Clerk
    } catch (error) {
      console.error("Error converting file path to Blob:", error);
      return null;
    }
  };

  //Taking converted blob file and updating User's Profile Picture based on button click
  const chooseProfilePicture = async (image: string) => {
    const file = await convertFilePathToBlob(image);

    if (file) {
      // implementing Optimistic Loading (Update UI before making backend request)
      const optimisticImage = URL.createObjectURL(file);
      setOptimisticImageUrl(optimisticImage);

      // Use Clerk's setProfileImage method to update the profile picture
      user!
        .setProfileImage({ file })
        .then((imageResource) => {
          console.log("Profile picture updated:", imageResource);
          setOptimisticImageUrl(null); // if optimistic upload fails, revert to previous picture
        })
        .catch((error) => {
          console.error("Error updating profile picture:", error);
          setOptimisticImageUrl(null);
        });
    } else {
      console.warn("No file selected.");
    }
  };

  //Function to randomly choose option from an array and then combines options to return username
  function generateRandomUsername() {
    function getRandomElement(arr: any) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      return arr[randomIndex];
    }

    const adjList = [
      "amazing",
      "excellent",
      "fabulous",
      "gorgeous",
      "incredible",
      "outstanding",
      "spectacular",
      "stunning",
      "upbeat",
      "wondrous",
    ];
    const animalList = [
      "bird",
      "dog",
      "cat",
      "goat",
      "lizard",
      "penguin",
      "seal",
      "lion",
      "shark",
      "gecko",
    ];

    const randomAdj = getRandomElement(adjList);
    const randomAnimal = getRandomElement(animalList);
    const randomNumber = Math.floor(Math.random() * 1000);

    const username = `${randomAdj}${randomAnimal}${randomNumber}`;
    return username;
  }

  //Function updates the state of our random username to be displayed on the webpage
  function changeRandomUsername() {
    const newRandomUsername = generateRandomUsername();
    setRandomName(newRandomUsername);
  }

  //Function to update User's username on Clerk
  function updateClerkUsername() {
    const newUsernameInput = document.getElementById(
      "newUsername"
    ) as HTMLInputElement;
    const newUsername = newUsernameInput?.value;

    //If the user provides a username in the input, we will use that
    if (newUsername) {
      // Use Clerk's update method to update the username
      user!
        .update({ username: newUsername })
        .then((updatedUser) => {
          console.log("Username updated:", updatedUser);
        })
        .catch((error) => {
          console.error("Error updating username:", error);
        });
    } else {
      console.warn("Please enter a new username.");
    }

    //If the user doesn't provide a username, we will take current randomName state and use that
    if (!newUsername) {
      user!
        .update({ username: randomName })
        .then((updatedUser) => {
          console.log("Username updated:", updatedUser);
        })
        .catch((error) => {
          console.error("Error updating username:", error);
        });
    }
  }

  //Function to update User's username on Clerk with random username
  function updateClerkWithRandomUsername() {
    changeRandomUsername();
    updateClerkUsername();
  }

  //Function to POST User's information to Supabase
  const handleSubmitUser = async (e: any) => {
    e.preventDefault();

    try {
      const bearerToken = await window.Clerk.session.getToken({
        template: "testing_template",
      });

      const supabaseToken = await window.Clerk.session.getToken({
        template: "supabase",
      });

      const formData = new FormData();
      formData.append("user_discounts", "");
      formData.append("user_groups", "");
      formData.append("user_messages", "");
      formData.append("company", "");
      formData.append("verified", "false");
      formData.append("hasCompletedFRE", "false");
      formData.append("blocked_users", "");
      formData.append("reported_users", "");

      // POST Fetch Request to Discounts API
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          supabase_jwt: supabaseToken,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User added successfully:", data);
        router.push("/fre2");
      } else {
        const errorData = await response.json();
        console.error("Error adding user:", errorData);
      }
    } catch (error) {
      console.error("Error add user:", error);
    }
  };

  // Render the First Run Experience if the User has been verified
  if (isSignedIn) {
    return (
      <div className="pageContent">
        <IllustrationOne />
        <div className="middleSpacing">
          <div className="progresscircles">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="8"
              viewBox="0 0 56 8"
              fill="none"
            >
              <circle cx="4" cy="4" r="4" fill="#F6FF82" />
              <circle cx="28" cy="4" r="4" fill="#ADB4D2" />
              <circle cx="52" cy="4" r="4" fill="#ADB4D2" />
            </svg>
          </div>
          <h2 className="mainHeader">Welcome to Friends with Benefits!</h2>
          <h5 className="subtext">Let&apos;s create your profile.</h5>

          {/*Container for the entire Profile Picture Feature */}
          <div>
            <div>
              {/*Container to display current user profile picture */}
              <div className="flex justify-center">
                <div
                  className="flex h-[153px] w-[153px]"
                  style={{
                    position: "relative",
                    width: "153px",
                    height: "153px",
                  }}
                >
                  <Image
                    src={optimisticImageUrl || user.imageUrl}
                    alt=""
                    fill
                    className="image"
                  />
                </div>
              </div>

              {/*Container to allow users to upload a personal profile picture*/}
              <div>
                <div className="addPhoto">
                  <div className="ml-4 mr-36 my-4 flex justify-center pl-32">
                    <label
                      htmlFor="profilePicture"
                      className="customPhotoInput"
                    >
                      <span>Add profile photo</span>
                      <input
                        type="file"
                        id="profilePicture"
                        accept="image/*"
                        onChange={updateProfilePicture}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/*Containers to allow user to pick amongst 8 default options */}
            {/*SVG Icon is displayed on screen to maintain resolution but PNG is uploaded to Clerk */}
            <div className="flex justify-center mt-4 space-x-4">
              <button
                type="button"
                id="chooseProfilePicture"
                onClick={() =>
                  chooseProfilePicture("/profilepics/PNG/WomanOne.png")
                }
              >
                <img src="/profilepics/SVG/FemaleOne.svg" />
              </button>
              <button
                type="button"
                id="chooseProfilePicture"
                onClick={() =>
                  chooseProfilePicture("/profilepics/PNG/WomanTwo.png")
                }
              >
                <img src="/profilepics/SVG/FemaleTwo.svg" />
              </button>
              <button
                type="button"
                id="chooseProfilePicture"
                onClick={() =>
                  chooseProfilePicture("/profilepics/PNG/WomanThree.png")
                }
              >
                <img src="/profilepics/SVG/FemaleThree.svg" />
              </button>
              <button
                type="button"
                id="chooseProfilePicture"
                onClick={() =>
                  chooseProfilePicture("/profilepics/PNG/WomanFour.png")
                }
              >
                <img src="/profilepics/SVG/FemaleFour.svg" />
              </button>
            </div>

            <div className="flex justify-center mt-4 space-x-4">
              <button
                type="button"
                id="chooseProfilePicture"
                onClick={() =>
                  chooseProfilePicture("/profilepics/PNG/ManOne.png")
                }
              >
                <img src="/profilepics/SVG/MaleOne.svg" />
              </button>
              <button
                type="button"
                id="chooseProfilePicture"
                onClick={() =>
                  chooseProfilePicture("/profilepics/PNG/ManTwo.png")
                }
              >
                <img src="/profilepics/SVG/MaleTwo.svg" />
              </button>
              <button
                type="button"
                id="chooseProfilePicture"
                onClick={() =>
                  chooseProfilePicture("/profilepics/PNG/ManThree.png")
                }
              >
                <img src="/profilepics/SVG/MaleThree.svg" />
              </button>
              <button
                type="button"
                id="chooseProfilePicture"
                onClick={() =>
                  chooseProfilePicture("/profilepics/PNG/ManFour.png")
                }
              >
                <img src="/profilepics/SVG/MaleFour.svg" />
              </button>
            </div>
          </div>

          {/* This is the form that will handle username input  */}
          <div className="userForm">
            <form
              id="usernameForm"
              className="flex justify-center"
              onBlur={updateClerkUsername}
            >
              <input
                type="text"
                id="newUsername"
                className="inputusername"
                placeholder={randomName}
                value={randomName}
                onChange={(e) => setRandomName(e.target.value)}
              />

              {/* Random Username Generation Button when Clicked  */}
              <button
                className="randomName"
                type="button"
                onClick={updateClerkWithRandomUsername}
              >
                <div className="refershIcon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                  >
                    <path
                      d="M16.8689 4.76617C15.1704 3.06765 12.7633 2.08813 10.1165 2.35906C6.29223 2.74461 3.14527 5.84989 2.71803 9.67418C2.14491 14.7281 6.05256 18.99 10.9814 18.99C14.3055 18.99 17.1607 17.0414 18.4945 14.2383C18.828 13.5402 18.3278 12.7378 17.5567 12.7378C17.1711 12.7378 16.8064 12.9462 16.6397 13.2901C15.4622 15.8222 12.6383 17.427 9.55382 16.7392C7.24049 16.2286 5.37523 14.3425 4.88547 12.0292C4.01016 7.98608 7.08418 4.40146 10.9814 4.40146C12.7112 4.40146 14.2534 5.12047 15.3788 6.25629L13.8053 7.82977C13.1489 8.48626 13.6074 9.61166 14.5348 9.61166H18.2757C18.8488 9.61166 19.3177 9.14274 19.3177 8.56962V4.82869C19.3177 3.90128 18.1923 3.43236 17.5358 4.08885L16.8689 4.76617Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </button>
            </form>
            {/* </div> */}

            {/* This is the link functionality to carry user to stage 2 & update username  */}
            {/* <div className="flex justify-center"> */}
            <div className="button">
              <Link href="/fre2" className="next" onClick={handleSubmitUser}>
                Next
              </Link>
            </div>
          </div>
        </div>
        <IllustrationTwo />
      </div>
    );
  }
}

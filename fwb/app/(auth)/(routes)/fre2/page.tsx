"use client";

import "./page.css";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import IllustrationThree from "@/components/ui/fre/IllustrationThree";
import IllustrationFour from "@/components/ui/fre/IllustrationFour";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Setting Clerk as Global Variable to access Clerk / Supabase Session Keys
declare global {
  interface Window {
    Clerk: any;
  }
}

export default function UserFlowPage2() {
  const [company, setCompany] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");

  //Set State of All Categories
  const allCategories = [
    "sports",
    "fashion",
    "electronic",
    "health",
    "books",
    "hobbies",
    "home & kitchen",
    "computer & accessories",
    "beauty & skincare",
  ];
  const [categories, setCategories] = useState<string[]>(allCategories);

  //TODO: Handle User Routing Once Form is Submitted
  const router = useRouter();

  //Handle Discount Submission
  const handleDiscountSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const bearerToken = await window.Clerk.session.getToken({
        template: "testing_template",
      });

      const supabaseToken = await window.Clerk.session.getToken({
        template: "supabase",
      });

      const formData = new FormData();
      formData.append("company", company);
      formData.append("terms_and_conditions", termsAndConditions);
      formData.append("discount_amount", discountAmount);
      formData.append("public", "true");
      formData.append("categories", `${categories}`);
      formData.append("company_url", `www.${company}.com`.toLowerCase());

      // POST Fetch Request to Discounts API
      const response = await fetch("/api/discounts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          supabase_jwt: supabaseToken,
        },
        body: formData,
      });

      // Log each entry in the FormData separately
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Discount added successfully:", data);
        router.push("/fre3");
      } else {
        const errorData = await response.json();
        console.error("Error adding discount:", errorData);
      }
    } catch (error) {
      console.error("Error using discount API:", error);
    }
  };

  //Function to handle Array Property of Categories Column in Supabase
  const handleCategoryChange = (selectedCategories: string[]) => {
    // Set the state to the selected categories
    if (selectedCategories.includes("All")) {
      setCategories(allCategories);
    } else {
      setCategories(selectedCategories);
    }
  };

  //Update user info based on provided company of Employment
  const { isSignedIn, user, isLoaded } = useUser();

  //Error handeling for if user tries to access page not signed in or Clerk isn't ready
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="pageContent">
      <IllustrationThree />
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
              <circle cx="28" cy="4" r="4" fill="#F6FF82" />
              <circle cx="52" cy="4" r="4" fill="#ADB4D2" />
            </svg>
          </div>
          <h2 className="mainHeader mb-[65px] mt-[36px]">
            Share your &quot;benefits&quot; 😏
          </h2>

          {/* This is the form that will handle company user input  */}
          <div className="ml-9">
            <form onSubmit={handleDiscountSubmit}>
              <h6 className="discountFormText">Company Name *</h6>
              <input
                type="text"
                className="inputCompany"
                placeholder="Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />

              <div className="flex justify-start flex-col">

                <div className="flex justify-start">
                  <h6 className="discountFormText">Discount Amount (%) *</h6>
                  <h6 className="discountFormText">Category *</h6>
                </div>

                <div className="flex justify-start">
                  <input
                    type="number"
                    className="inputDiscount"
                    placeholder="1 - 100"
                    min="1"
                    max="100"
                    step="1"
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(e.target.value)}
                    required
                  />

                  {/* This will Need to be updated with Map function for all Categories */}
                  <select
                    className="selectCategory"
                    onChange={(e) =>
                      handleCategoryChange(
                        Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        )
                      )
                    }
                    value={categories[0]}
                    required
                  >
                    <option value="All">All</option>
                    <option value="Sports">Sports</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Electronic">Electronic</option>
                    <option value="Health">Health</option>
                    <option value="HomeAndKitchen">Home & Kitchen</option>
                    <option value="ComputerAndAccessories">
                      Computer & Accessories
                    </option>
                    <option value="BeautyAndSkincare">Beauty & Skincare</option>
                    <option value="Books">Books</option>
                    <option value="Hobbies">Hobbies</option>
                  </select>
                </div>

                <h6 className="discountFormText">
                  Discount Rules & Conditions *
                </h6>
                <textarea
                  className="inputConditions"
                  placeholder="Add details about your shared benefit"
                  value={termsAndConditions}
                  onChange={(e) => setTermsAndConditions(e.target.value)}
                  required
                />
                {/* <select>
                  <option value="All">All</option>
                  <option value="Sports">Sports</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Electronic">Electronic</option>
                  <option value="Health">Health</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Computer & Accessories">
                    Computer & Accessories
                  </option>
                  <option value="Beauty & Skincare">Beauty & Skincare</option>
                  <option value="Books">Books</option>
                  <option value="Hobbies">Hobbies</option>
                </select> */}
              </div>

              <div className="flex justify-center mt-[60px]">
                <button
                  type="submit"
                  className="share"
                  onClick={handleDiscountSubmit}
                >
                  Share
                </button>
              </div>
            </form>
          </div>

          {/* This is the link functionality to carry user to stage 3  */}
          <div className="flex justify-center" style={{ marginTop: "-10px" }}>
            <Link href="/fre3" className="skip">
              Skip for now
            </Link>
          </div>
        </div>
      </div>
      <IllustrationFour />
    </div>
  );
}

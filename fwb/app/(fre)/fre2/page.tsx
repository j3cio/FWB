"use client";

import './page.css';
import Link from "next/link";
import { useUser } from '@clerk/nextjs';
import IllustrationThree from "@/components/ui/fre/IllustrationThree";
import IllustrationFour from "@/components/ui/fre/IllustrationFour";
import { useState } from 'react';
import axios from 'axios';

export default function UserFlowPage2() {

  //TODO: Setup Company Input Form with User backend information
  const [company, setCompany] = useState('');
  const [termsAndConditions, setTermsAndConditions] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');
  const [categories, setCategories] = useState('');
  const [publicGroups, setPublicGroups] = useState(false);
  const [privateGroups, setPrivateGroups] = useState('');

  //Handle Discount Submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/discounts', {
        company,
        terms_and_conditions: termsAndConditions,
        discount_amount: parseInt(discountAmount),
        categories,
      });

      console.log('Discount added successfully:', response.data);
      // You can handle success here, e.g., redirect the user or show a success message
    } catch (error: any) {
      console.error('Error adding discount:', error.response.data);
      // Handle error, e.g., show an error message to the user
    }
  };

  //Update user info based on provided company of Employment
  const { isSignedIn, user, isLoaded } = useUser()

  //Error handeling for if user tries to access page not signed in or Clerk isn't ready
  if (!isLoaded || !isSignedIn) {
    return null
  }

  return (
    <div className="pageContent">
      <IllustrationThree />
      <div className="middleSpacing">
        <div className="flex-col justify-center">
          <div className="progresscircles">
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="8" viewBox="0 0 56 8" fill="none">
              <circle cx="4" cy="4" r="4" fill="#ADB4D2"/>
              <circle cx="28" cy="4" r="4" fill="#F6FF82"/>
              <circle cx="52" cy="4" r="4" fill="#ADB4D2"/>
            </svg>
          </div>
          <h2 className="mainHeader">Share your &quot;benefits&quot; 😏</h2>

          {/* This is the form that will handle company user input  */}
          <div className='ml-9'>
          <form onSubmit={handleSubmit}>
            <h6 className="discountFormText">Company Name *</h6>
            <input
              type="text"
              className="inputCompany"
              placeholder="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)} 
              required
            />

            <div className='flex justify-start'>
              <h6 className="discountFormText">Discount Amount *</h6>
              <h6 className="discountFormText">Category *</h6>
              </div>

              <div className='flex justify-start'>
              <input
                type="number"
                className="inputDiscount"
                placeholder='1 - 100         %' 
                min="1" 
                max="100" 
                step="1"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(e.target.value)} 
                required
              />

              {/* This will Need to be updated with Map function for all Categories */}
              <select 
                className='selectCategory'
                value={categories}
                onChange={(e) => setCategories(e.target.value)} 
                required
              >
                <option value="all">All</option>
                <option value="sports">Sports</option>
                <option value="fashion">Fashion</option>
                <option value="electronic">Electronic</option>
                <option value="health">Health</option>
                <option value="homeAndKitchen">Home & Kitchen</option>
                <option value="computerAndAccessories">Computer & Accessories</option>
                <option value="beautyAndSkincare">Beauty & Skincare</option>
                <option value="books">Books</option>
                <option value="hobbies">Hobbies</option>
              </select>
            </div>

            <h6 className="discountFormText">Discount Rules & Conditions *</h6>
            <textarea
              className="inputConditions"
              placeholder="Lorem Ipsum"
              value={termsAndConditions}
              onChange={(e) => setTermsAndConditions(e.target.value)} 
              required
            />


          </form>
          </div>

          {/* This is the Button that will handle LinkedIn Verification 
          <div className='flex justify-center mt-8px mb-4px'>
            <button className='linkedInVerify' onClick={handleverify}>
              <div>Verify with LinkedIn</div>

               SVG Icon for LinkedIn Icon from Figma Design 
              <div className='py-1'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401m-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4"/>
                </svg>
              </div>
            </button>
          </div> */}

          {/* This is the help subtext to email us if they have problems 
          <div className='flex justify-center'>
            <div className="help">
              Having problems? Email us at{" "}
              <a className="helpEmail" href="mailto:help@makefwb.com">
                help@makefwb.com
              </a>
            </div>
          </div> */}

          {/* This is the link functionality to carry user to stage 3  */}
          <div className="flex justify-center">
            <Link href='/fre3' className="share">Share Group</Link>
          </div>
          <div className='flex justify-center'>
            <Link href='/fre3' className="skip">Skip for now</Link>
          </div>

        </div>
      </div>
      <IllustrationFour />
    </div>
  )
};
"use client";

import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  use,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CompanyAndDiscounts } from "@/app/types/types";

export default function DetailPage({
  companyData,
}: {
  companyData: CompanyAndDiscounts;
}) {
  console.log(companyData);

  return (
    <div className="w-full bg-[#1A1A23] pt-[96px]">
      {/* company image and description section */}
      <div className="mx-[120px] flex flex-row">
        <div
          className="bg-no-repeat bg-center bg-cover w-1/3 mr-[30px] pb-[20.25%] "
          style={{ backgroundImage: `url(${companyData.logo})` }}
        >
          {/* placeholder image */}
        </div>
        <div className="w-2/3 flex flex-col">
          <div className="mt-[45px] w-full flex flex-row">
            {/* Company Name div */}
            <div className="text-[#F6FF82] text-[32px] font-bold">
              Nike. Inc
            </div>
            {/* link icon */}
            <div className="my-auto ml-[8px] cursor-pointer">
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.99219 12.1804C10.3553 12.6657 10.8185 13.0674 11.3504 13.358C11.8824 13.6486 12.4706 13.8214 13.0752 13.8647C13.6799 13.908 14.2867 13.8208 14.8547 13.6089C15.4226 13.3971 15.9383 13.0656 16.3669 12.6369L18.9032 10.1006C19.6733 9.30339 20.0993 8.23561 20.0897 7.12727C20.0801 6.01894 19.6355 4.95872 18.8517 4.17498C18.068 3.39124 17.0077 2.94668 15.8994 2.93705C14.791 2.92742 13.7232 3.35349 12.9259 4.12349L11.4717 5.56916"
                  stroke="#F6FF82"
                  stroke-width="2.02905"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.3731 10.4901C13.01 10.0047 12.5468 9.60308 12.0148 9.31246C11.4829 9.02184 10.8946 8.84902 10.29 8.80572C9.68539 8.76242 9.07854 8.84966 8.5106 9.06151C7.94266 9.27336 7.42693 9.60487 6.99838 10.0336L4.46203 12.5698C3.692 13.3671 3.26592 14.4348 3.27555 15.5432C3.28518 16.6515 3.72976 17.7117 4.51352 18.4955C5.29729 19.2792 6.35754 19.7238 7.46591 19.7334C8.57428 19.743 9.64209 19.317 10.4394 18.547L11.8851 17.1013"
                  stroke="#F6FF82"
                  stroke-width="2.02905"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          {/* Company description */}
          <div className="mt-[15px] w-full text-[15px] text-white">
            Lorem ipsum dolor sit amet consectetur. Bibendum tellus elit
            pellentesque in loboortis tellus est ac purus. Quisque id ut id
            donec turpis. Lorem ipsum dolor sit amet consectetur. Bibendum
            tellus elit pellentesque in loboortis tellus est ac purus. Quisque
            id ut id donec turpis.
          </div>
          {/* statisctics */}
          <div className="mt-auto ml-auto w-full text-[15px] font flex justify-end text-white text-center">
            <div className="flex flex-col mr-[45px] ">
              <div className="text-[15px]">Total Offers</div>
              <div className="text-center text-[23px]">
                {companyData.discounts.length}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-[15px]">Up to</div>
              <div className="text-[23px]">
                {companyData.greatest_discount}% off
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* discounts offered section */}
      <div className="mx-[120px] border-t-[2px] border-white mt-[50px] pt-[96px] pb-[72px]">
        <div className="flex flex-row w-full justify-between">
          <div className="text-[#F6FF82] text-[32px] font-bold mb-auto">
            Discounts Offered
          </div>
          <div className="flex flex-row text-white">
            <div className="flex flex-col mr-[24px]">
              <label>
                <div>Sort By:</div>
                <select className="p-[9px] rounded-[10px] border-[2px] border-[#8E94E9] bg-transparent mt-[8px]">
                  <option value="select">Select an option</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </label>
            </div>
            <div className="flex flex-col ">
              <label>
                <div>Private Groups:</div>
                <select className="p-[9px] rounded-[10px] border-[2px] border-[#8E94E9] bg-transparent mt-[8px]">
                  <option value="">Select an option</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* discount listing section */}
      <div className="mx-[120px] flex flex-row relative">
        <div className="w-[20%] bg-[#8E94E9] text-white flex rounded-l-[25px]">
          <div className="text-[40px] font-bold w-[70px] m-auto">15% OFF</div>
        </div>
        <div className="w-[80%] px-[40px] py-[64px] bg-white flex justify-between rounded-r-[25px]">
          <div>
            <div className="text-[24px] font-bold">
              Get 25% off for Shoes & Bags
            </div>
            <div className="text-[14px]">*Terms & Conditions apply</div>
            <div className="flex flex-row mt-[48px]">
              <div className="h-[24px] w-[24px] rounded-[24px] border-black border-[2px] mr-[8px]"></div>
              <div>by Darrell Steward</div>
            </div>
          </div>
          <div className="flex h-auto my-auto">
            <div className="h-[50px] w-[50px] rounded-[50px] border-black border-[2px] mr-[16px] my-auto"></div>
            <div className="h-[50px] w-[50px] rounded-[50px] border-black border-[2px] mr-[16px] my-auto"></div>
            <div className="h-[48px] w-[221px] rounded-[24px] border-black border-[2px]"></div>
          </div>
        </div>
      </div>
      1
      {/* {myArray.map((item, index) => (
            <MyComponent key={index} item={item} />
        ))} */}
    </div>
  );
}
"use client";
import avatar from "@/components/ui/message/icons/avatar.svg";
import Image from "next/image";
import { useState } from "react";

export default function MenuBar() {
  const [tab, setTab] = useState<"general" | "groups">("general");
  return (
    <div className="flex flex-row ml-14 rounded-10 bg-opacity-10 bg-white shadow-xl backdrop-blur-12.5"
    style={{width:"4px"}}>
      <div className="flex flex-col max-h-[771px] rounded-lg overflow-y-auto items-center gap-32 pt-6 mr-7 pl-3 pr-3 pb-6 flex-shrink-0 bg-opacity-10 bg-white backdrop-blur-12.5 shadow-xl justify-start">
        <div
          className="flex flex-row justify-between"
          style={{ width: "400px", height: "26px" }}
        >
          <div className="text-white" style={{ fontSize: "24px" }}>
            Messages
          </div>
          <div className="flex flex-row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              style={{ marginRight: "16px" }}
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18 11.5C19.66 11.5 20.99 10.16 20.99 8.5C20.99 6.84 19.66 5.5 18 5.5C17.68 5.5 17.37 5.55 17.09 5.64C17.66 6.45 17.99 7.43 17.99 8.5C17.99 9.57 17.65 10.54 17.09 11.36C17.37 11.45 17.68 11.5 18 11.5ZM7 10.5H5V8.5C5 7.95 4.55 7.5 4 7.5C3.45 7.5 3 7.95 3 8.5V10.5H1C0.45 10.5 0 10.95 0 11.5C0 12.05 0.45 12.5 1 12.5H3V14.5C3 15.05 3.45 15.5 4 15.5C4.55 15.5 5 15.05 5 14.5V12.5H7C7.55 12.5 8 12.05 8 11.5C8 10.95 7.55 10.5 7 10.5ZM15.99 8.5C15.99 10.16 14.66 11.5 13 11.5C11.34 11.5 10 10.16 10 8.5C10 6.84 11.34 5.5 13 5.5C14.66 5.5 15.99 6.84 15.99 8.5ZM13 13.5C11 13.5 7 14.5 7 16.5V17.5C7 18.05 7.45 18.5 8 18.5H18C18.55 18.5 19 18.05 19 17.5V16.5C19 14.5 15 13.5 13 13.5ZM21 16.5C21 15.32 20.45 14.39 19.62 13.66C21.63 14.01 24 14.96 24 16.5V18C24 18.28 23.78 18.5 23.5 18.5H20.95C20.98 18.34 21 18.17 21 18V16.5Z"
                fill="#F6FF82"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M15.4964 4.1665C14.9652 4.1665 14.4557 4.37753 14.0801 4.75315L5.11021 13.723L4.16602 17.4998L7.94281 16.5556L16.9127 7.58575C17.2883 7.21012 17.4993 6.70067 17.4993 6.16945C17.4993 5.63824 17.2883 5.12878 16.9127 4.75315C16.5371 4.37753 16.0276 4.1665 15.4964 4.1665Z"
                fill="#F6FF82"
                stroke="#F6FF82"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div
          className="flex flex-row justify-between -mt-24"
          style={{ width: "400px", height: "26px" }}
        >
          <div
            className="font-semibold text-center text-white border-white border-b-1 font-Urbanist text-16 leading-125"
            style={{
              width: "200px",
              height: "26px",
              borderBottom: "1px solid white",
              cursor: "pointer",
            }}
            onClick={() => setTab("general")}
          >
            General
          </div>
          <div
            className="font-semibold text-center text-white border-white border-b-1 font-Urbanist text-16 leading-125 "
            style={{ width: "200px", height: "26px", cursor: "pointer" }}
            onClick={() => setTab("groups")}
          >
            Groups
          </div>
        </div>

        {/* search bar */}
        {/* <div
          className="flex w-full h-8 py-1 pl-4 pr-1 bg-white rounded-2xl"
          style={{ marginTop: "-110px" }}
        >
          <input
            type="text"
            className="w-full text-xs bg-white outline-none "
            placeholder="Search..."
          />
          <span className="flex items-center justify-center w-6 h-6 p-1.5 rounded-full bg-neutral-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.59359 7.9018H7.98859L10.1086 10.0318C10.3136 10.2368 10.3136 10.5718 10.1086 10.7768C9.90359 10.9818 9.56859 10.9818 9.36359 10.7768L7.23859 8.6518V8.2568L7.10359 8.1168C6.40359 8.7168 5.44859 9.0268 4.43359 8.8568C3.04359 8.6218 1.93359 7.4618 1.76359 6.0618C1.50359 3.9468 3.28359 2.1668 5.39859 2.4268C6.79859 2.5968 7.95859 3.7068 8.19359 5.0968C8.36359 6.1118 8.05359 7.0668 7.45359 7.7668L7.59359 7.9018ZM2.73859 5.6518C2.73859 6.8968 3.74359 7.9018 4.98859 7.9018C6.23359 7.9018 7.23859 6.8968 7.23859 5.6518C7.23859 4.4068 6.23359 3.4018 4.98859 3.4018C3.74359 3.4018 2.73859 4.4068 2.73859 5.6518Z"
                fill="white"
              />
            </svg>
          </span>
        </div> */}
      </div>
    </div>
  );
}

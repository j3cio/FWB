import avatar from "@/components/ui/message/icons/avatar.svg";
import Image from "next/image";

export default function GeneralBigChat() {
  return (
    <div
      className="h-full w-full flex flex-col items-center pt-6 pl-3 pr-3 pb-6 bg-opacity-10 mr-12 bg-white backdrop-blur-12.5 shadow-xl justify-start"
      style={{
        height: "770px",
        borderRadius: "10px",
        justifyContent: "center",
      }}
    >
      <div
        className="flex justify-between items-center font-urbanist font-semibold text-lg leading-125% text-white w-full bottom-border pb-4"
        style={{ borderBottom: "1px solid #94A3B1" }}
      >
        <div className="flex">
          <div>
            <Image
              src={avatar}
              alt="avatar Icon"
              style={{ width: "40px", height: "40px" }}
            />
          </div>

          <div className="flex items-center ml-3 font-urbanist font-semibold text-base leading-125%">
            General
          </div>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 7V9H13V7H11ZM13 16C13 16.55 12.55 17 12 17C11.45 17 11 16.55 11 16V12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12V16ZM4 12C4 16.41 7.59 20 12 20C16.41 20 20 16.41 20 12C20 7.59 16.41 4 12 4C7.59 4 4 7.59 4 12Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <div className="text-white w-full h-full flex-col justify-start ">
        <div
          className="flex items-center mt-4 justify-center font-urbanist font-medium text-xs leading-150%"
          style={{ fontFamily: "Urbanist" }}
        >
          November 08 2023
        </div>
        <div className="flex flex-row justify-end">
          <div
            className="flex flex-col items-end text-neutral-000 opacity-50"
            style={{ fontSize: "10px", fontFamily: "Urbanist" }}
          >
            <div>Read</div>
            <div style={{ fontSize: "10px", fontFamily: "Urbanist" }}>
              10:05AM
            </div>
          </div>
          <div
            className="pt-2 pb-2 pr-4 pl-4 ml-1"
            style={{
              background: "#8E94E9",
              borderRadius: "20px",
              fontSize: "12px",
              fontFamily: "Urbanist",
            }}
          >
            Hellooo
          </div>
        </div>
        <div className="flex flex-row justify-start">
          <div>
            <Image
              src={avatar}
              alt="avatar Icon"
              style={{ width: "34px", height: "34px" }}
            />
          </div>
          <div
            className="ml-2 pl-4 pr-4 pt-2"
            style={{
              background: "rgba(255, 255, 255, 0.30)",
              borderRadius: "20px",
              fontSize: "12px",
              fontFamily: "Urbanist",
            }}
          >
            Hey.Whats up??
          </div>{" "}
        </div>
      </div>
      <div
            className="flex w-full h-1 top-border pb-4 pt-4 justify-between"
            style={{ borderTop: "1px solid #94A3B1" }}
          >
            <div className="flex">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM17 9.5C17 10.33 16.33 11 15.5 11C14.67 11 14 10.33 14 9.5C14 8.67 14.67 8 15.5 8C16.33 8 17 8.67 17 9.5ZM8.5 11C9.33 11 10 10.33 10 9.5C10 8.67 9.33 8 8.5 8C7.67 8 7 8.67 7 9.5C7 10.33 7.67 11 8.5 11ZM16.75 14.75C15.8 16.39 14.03 17.5 12 17.5C9.97 17.5 8.2 16.39 7.25 14.75C7.06 14.42 7.31 14 7.69 14H16.31C16.7 14 16.94 14.42 16.75 14.75Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Write Messages..."
                  className="outline-none ml-4 text-xs font-normal leading-6 opacity-50"
                  style={{ font: "Urbanist" }}
                />
              </div>
            </div>
            <div className="flex justify-between ">
              <div className="pr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5ZM11 16.51L8.9 13.98C8.69 13.73 8.31 13.74 8.12 14L5.63 17.2C5.37 17.53 5.6 18.01 6.02 18.01H18.01C18.42 18.01 18.66 17.54 18.41 17.21L14.9 12.53C14.7 12.26 14.3 12.26 14.1 12.52L11 16.51Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="pr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M18.5428 11.1144L11.0616 18.5956C9.58377 20.0734 7.18667 20.3068 5.57447 18.9774C3.72892 17.4571 3.62993 14.7136 5.28456 13.0589L14.0244 4.31909C14.9507 3.39278 16.4568 3.216 17.468 4.04332C18.6347 4.99791 18.6984 6.71618 17.6589 7.75563L10.2343 15.1803C9.8454 15.5692 9.209 15.5692 8.82009 15.1803C8.43118 14.7913 8.43118 14.1549 8.82009 13.766L15.0073 7.57885C15.2972 7.28894 15.2972 6.80811 15.0073 6.51819C14.7174 6.22828 14.2365 6.22828 13.9466 6.51819L7.85843 12.6064C6.93212 13.5327 6.75534 15.0388 7.58265 16.05C8.53725 17.2167 10.2555 17.2804 11.295 16.2409L18.5994 8.9365C20.0772 7.45865 20.3106 5.06155 18.9812 3.44935C17.4539 1.59673 14.7174 1.50481 13.0627 3.15944L4.38653 11.8356C2.35713 13.865 2.02479 17.1672 3.8562 19.3805C5.97045 21.919 9.72519 22.0533 12.0021 19.7764L19.6035 12.175C19.8934 11.8851 19.8934 11.4043 19.6035 11.1144C19.3136 10.8245 18.8327 10.8245 18.5428 11.1144Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20.4115 13.8351C21.562 13.2956 21.562 11.658 20.4108 11.1191L6.34859 4.52679C5.19389 3.98585 3.93453 5.04015 4.26263 6.27193L5.65068 11.4769L11.538 11.4769C11.8002 11.4815 12.0501 11.5888 12.2339 11.7759C12.4177 11.9629 12.5207 12.2146 12.5207 12.4768C12.5207 12.739 12.4177 12.9907 12.2339 13.1777C12.0501 13.3647 11.8002 13.4721 11.538 13.4766H5.65068L4.26334 18.6824C3.93453 19.9134 5.19459 20.967 6.34859 20.4268L20.4115 13.8351Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
    </div>
    </div>
  );
}

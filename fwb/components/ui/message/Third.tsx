import avatar from '@/components/ui/message/icons/avatar.svg'
import Image from 'next/image'
import { Children, type PropsWithChildren } from 'react'

type ThirdProps = { name: string }
export default function Third({
  name,
  children,
}: PropsWithChildren<ThirdProps>) {
  {
    /* general right side */
  }
  return (
    <div
      className="h-full w-full flex flex-col items-center pl-3 pr-3 pb-6 bg-opacity-10 mr-12 bg-white backdrop-blur-12.5 shadow-xl justify-start"
      style={{
        height: '770px',
        width: '314px',
        borderRadius: '10px',
      }}
    >
      <div
        className="flex justify-between items-center mt-10 font-urbanist font-semibold text-lg leading-125% text-white w-full bottom-border pb-4"
        style={{ borderBottom: '1px solid #94A3B1' }}
      >
        <div className="flex">
          <div className="flex items-center ml-3 font-urbanist font-semibold text-base leading-125%">
            Details
          </div>
        </div>
        <div className="flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18.3007 5.70996C18.1139 5.5227 17.8602 5.41747 17.5957 5.41747C17.3312 5.41747 17.0775 5.5227 16.8907 5.70996L12.0007 10.59L7.1107 5.69996C6.92387 5.5127 6.67022 5.40747 6.4057 5.40747C6.14119 5.40747 5.88753 5.5127 5.7007 5.69996C5.3107 6.08996 5.3107 6.71996 5.7007 7.10996L10.5907 12L5.7007 16.89C5.3107 17.28 5.3107 17.91 5.7007 18.3C6.0907 18.69 6.7207 18.69 7.1107 18.3L12.0007 13.41L16.8907 18.3C17.2807 18.69 17.9107 18.69 18.3007 18.3C18.6907 17.91 18.6907 17.28 18.3007 16.89L13.4107 12L18.3007 7.10996C18.6807 6.72996 18.6807 6.08996 18.3007 5.70996Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col mt-8 text-white">
        <div className="flex flex-col justify-center items-center">
          <div>
            <Image
              src={avatar}
              alt="avatar Icon"
              style={{ width: '88px', height: '88px' }}
            />
          </div>
          <div
            className="mt-2"
            style={{ fontFamily: 'Urbanist', fontSize: '16px' }}
          >
            {name}
          </div>
          <div style={{ fontFamily: 'Urbanist', fontSize: '12px' }}>
            Works at Nike.Inc
          </div>
        </div>
        <div
          className="mt-8 pt-1 pb-1 ml-4 mr-4 flex justify-center items-center"
          style={{
            background: '#8E94E9',
            borderRadius: '32px',
            width: '282px',
            height: '36px',
          }}
        >
          Open Profile
        </div>
        <div
          className="flex justify-between w-full mt-5 ml-4"
          style={{ width: '282px' }}
        >
          <div className="flex items-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.42 3.36327C2.16 3.10327 2.16 2.68327 2.42 2.42327C2.68667 2.16327 3.10667 2.16327 3.36667 2.42327L13.5733 12.6366C13.8333 12.8966 13.8333 13.3166 13.5733 13.5766C13.3133 13.8366 12.8933 13.8366 12.6333 13.5766L11.74 12.6833C11.2933 13.0433 10.7933 13.3366 10.26 13.5566C9.82 13.7366 9.33333 13.4299 9.33333 12.9499C9.33333 12.6899 9.48 12.4366 9.72 12.3366C10.1067 12.1833 10.46 11.9766 10.7867 11.7299L8 8.94327V11.7233C8 12.3166 7.28 12.6166 6.86 12.1966L4.66667 10.0033H2.66667C2.3 10.0033 2 9.70327 2 9.33661V6.66994C2 6.30327 2.3 6.00327 2.66667 6.00327H4.66667L4.86 5.80327L2.42 3.36327ZM12.3933 9.56339C12.5667 9.07673 12.6667 8.55006 12.6667 8.00339C12.6667 6.04339 11.4533 4.36339 9.74 3.67006C9.5 3.57673 9.33333 3.35673 9.33333 3.10339V2.97673C9.33333 2.55673 9.75333 2.25006 10.1467 2.40339C12.4 3.26339 14 5.45006 14 8.00339C14 8.93006 13.7867 9.80339 13.4133 10.5834L12.3933 9.56339ZM6.85943 3.80996L6.74609 3.92329L7.99943 5.17662V4.27662C7.99943 3.68329 7.27943 3.38996 6.85943 3.80996ZM9.33333 5.31673C10.32 5.81007 11 6.8234 11 8.0034C11 8.05673 10.9933 8.11007 10.9867 8.1634L9.33333 6.51007V5.31673Z"
                  fill="white"
                />
              </svg>
            </div>
            <div
              className="ml-2"
              style={{ fontFamily: 'Urbanist', fontSize: '14px' }}
            >
              Mute Messages
            </div>
          </div>
          <div className="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.33268 9.33325H22.666C26.346 9.33325 29.3327 12.3199 29.3327 15.9999C29.3327 19.6799 26.346 22.6666 22.666 22.6666H9.33268C5.65268 22.6666 2.66602 19.6799 2.66602 15.9999C2.66602 12.3199 5.65268 9.33325 9.33268 9.33325ZM17.3327 15.9999C17.3327 18.951 19.7149 21.3333 22.666 21.3333C25.6171 21.3333 27.9993 18.951 27.9993 15.9999C27.9993 13.0488 25.6171 10.6666 22.666 10.6666C19.7149 10.6666 17.3327 13.0488 17.3327 15.9999Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

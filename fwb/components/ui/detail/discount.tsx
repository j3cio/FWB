'use client'

import { DiscountDataDetail } from '@/app/types/types'

export default function ProductCard(
  { data }: { data: DiscountDataDetail },
  { key }: { key: number }
) {
  const copyShareURL = () => {
    const currentURL = window.location.href
    // Copy URL to clipboard
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        console.log('URL copied to clipboard:', currentURL)
      })
      .catch((err) => {
        console.error('Failed to copy URL: ', err)
      })
  }

  return (
    <div className="mx-[120px] flex flex-row relative mb-[32px]">
      <div className="w-[20%] bg-[#8E94E9] text-white flex rounded-l-[25px]">
        <div className="text-[40px] font-bold w-[70px] m-auto">
          {data.discount_amount}% OFF
        </div>
      </div>
      <div className="w-[80%] px-[40px] bg-white flex flex-col rounded-r-[25px]">
        <div className="w-full flex justify-between py-[64px]">
          <div>
            <div className="text-[24px] font-bold">
              Get {data.discount_amount}% off Shoes and Sandals
            </div>
            <div className="text-[14px]">*Terms & Conditions apply</div>
            <div className="flex flex-row mt-[48px]">
              <div
                className="h-[24px] w-[24px] rounded-[24px] mr-[5px] bg-no-repeat bg-center bg-contain"
                style={{
                  backgroundImage: `url(${data.user_image ? data.user_image : 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJjanBvRjl3OXpJTXRUM3JBak9vcTNBQkRIOCJ9'})`,
                }}
              ></div>
              <div>
                by {data.user_username ? data.user_username : 'Unknown'}
              </div>
            </div>
          </div>
          <div className="flex h-auto my-auto cursor-pointer">
            <div className="mr-[16px] my-auto">
              <svg
                width="48"
                height="48"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1"
                  y="1"
                  width="45.9996"
                  height="45.9996"
                  rx="22.9998"
                  stroke="#8E94E9"
                  strokeWidth="2"
                />
                <path
                  d="M33.5998 11.9998H14.4C13.08 11.9998 12.012 13.0797 12.012 14.3997L12 35.9996L16.8 31.1996H33.5998C34.9198 31.1996 35.9998 30.1196 35.9998 28.7996V14.3997C35.9998 13.0797 34.9198 11.9998 33.5998 11.9998Z"
                  fill="#8E94E9"
                />
              </svg>
            </div>
            {/* This is the sharable link */}
            <div className="mr-[16px] my-auto cursor-pointer">
              <button onClick={copyShareURL}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1"
                    y="1"
                    width="45.9996"
                    height="45.9996"
                    rx="22.9998"
                    stroke="#8E94E9"
                    strokeWidth="2"
                  />
                  <path
                    d="M31.1991 28.9437C30.2871 28.9437 29.4711 29.3037 28.8471 29.8677L20.2912 24.8878C20.3512 24.6118 20.3992 24.3358 20.3992 24.0478C20.3992 23.7598 20.3512 23.4838 20.2912 23.2078L28.7511 18.2758C29.3991 18.8758 30.2511 19.2478 31.1991 19.2478C33.1911 19.2478 34.7991 17.6398 34.7991 15.6478C34.7991 13.6558 33.1911 12.0479 31.1991 12.0479C29.2071 12.0479 27.5991 13.6558 27.5991 15.6478C27.5991 15.9358 27.6471 16.2118 27.7071 16.4878L19.2472 21.4198C18.5992 20.8198 17.7472 20.4478 16.7992 20.4478C14.8072 20.4478 13.1992 22.0558 13.1992 24.0478C13.1992 26.0397 14.8072 27.6477 16.7992 27.6477C17.7472 27.6477 18.5992 27.2757 19.2472 26.6757L27.7911 31.6677C27.7311 31.9197 27.6951 32.1837 27.6951 32.4477C27.6951 34.3797 29.2671 35.9517 31.1991 35.9517C33.1311 35.9517 34.7031 34.3797 34.7031 32.4477C34.7031 30.5157 33.1311 28.9437 31.1991 28.9437Z"
                    fill="#8E94E9"
                  />
                </svg>
              </button>
            </div>
            <div className="cursor-pointer">
              <svg
                width="221"
                height="48"
                viewBox="0 0 221 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="221" height="48" rx="24" fill="#8E94E9" />
                <path
                  d="M36.5254 32L39.2454 18H41.2654L44.6754 26.97L48.0854 18H50.1054L52.8254 32H50.3354L48.6554 23.34L45.5054 31.68H43.8354L40.6854 23.34L39.0154 32H36.5254ZM58.9621 32.26C58.0421 32.26 57.2021 32.0233 56.4421 31.55C55.6888 31.0767 55.0854 30.4433 54.6321 29.65C54.1854 28.85 53.9621 27.9667 53.9621 27C53.9621 26.2667 54.0921 25.5833 54.3521 24.95C54.6121 24.31 54.9688 23.75 55.4221 23.27C55.8821 22.7833 56.4154 22.4033 57.0221 22.13C57.6288 21.8567 58.2754 21.72 58.9621 21.72C59.8821 21.72 60.7188 21.9567 61.4721 22.43C62.2321 22.9033 62.8354 23.54 63.2821 24.34C63.7354 25.14 63.9621 26.0267 63.9621 27C63.9621 27.7267 63.8321 28.4067 63.5721 29.04C63.3121 29.6733 62.9521 30.2333 62.4921 30.72C62.0388 31.2 61.5088 31.5767 60.9021 31.85C60.3021 32.1233 59.6554 32.26 58.9621 32.26ZM58.9621 29.82C59.4488 29.82 59.8854 29.69 60.2721 29.43C60.6588 29.17 60.9621 28.8267 61.1821 28.4C61.4088 27.9733 61.5221 27.5067 61.5221 27C61.5221 26.48 61.4054 26.0067 61.1721 25.58C60.9454 25.1467 60.6354 24.8033 60.2421 24.55C59.8554 24.29 59.4288 24.16 58.9621 24.16C58.4821 24.16 58.0488 24.29 57.6621 24.55C57.2754 24.81 56.9688 25.1567 56.7421 25.59C56.5154 26.0233 56.4021 26.4933 56.4021 27C56.4021 27.5267 56.5188 28.0033 56.7521 28.43C56.9854 28.8567 57.2954 29.1967 57.6821 29.45C58.0754 29.6967 58.5021 29.82 58.9621 29.82ZM65.9291 32L65.9191 22H68.3591L68.3691 22.89C68.7091 22.53 69.1158 22.2467 69.5891 22.04C70.0625 21.8267 70.5725 21.72 71.1191 21.72C71.4858 21.72 71.8525 21.7733 72.2191 21.88L71.2591 24.34C71.0058 24.24 70.7525 24.19 70.4991 24.19C70.1058 24.19 69.7458 24.2867 69.4191 24.48C69.0991 24.6667 68.8425 24.9233 68.6491 25.25C68.4625 25.57 68.3691 25.9267 68.3691 26.32V32H65.9291ZM77.6723 32.26C76.7523 32.26 75.9123 32.0233 75.1523 31.55C74.3989 31.0767 73.7956 30.44 73.3423 29.64C72.8956 28.84 72.6723 27.9567 72.6723 26.99C72.6723 26.2633 72.8023 25.5833 73.0623 24.95C73.3223 24.31 73.6789 23.75 74.1323 23.27C74.5923 22.7833 75.1256 22.4033 75.7323 22.13C76.3389 21.8567 76.9856 21.72 77.6723 21.72C78.4523 21.72 79.1656 21.8867 79.8123 22.22C80.4656 22.5467 81.0189 22.9967 81.4723 23.57C81.9256 24.1433 82.2556 24.7967 82.4623 25.53C82.6689 26.2633 82.7156 27.03 82.6023 27.83H75.2923C75.3856 28.2033 75.5389 28.54 75.7523 28.84C75.9656 29.1333 76.2356 29.37 76.5623 29.55C76.8889 29.7233 77.2589 29.8133 77.6723 29.82C78.0989 29.8267 78.4856 29.7267 78.8323 29.52C79.1856 29.3067 79.4789 29.02 79.7123 28.66L82.2023 29.24C81.7956 30.1267 81.1889 30.8533 80.3823 31.42C79.5756 31.98 78.6723 32.26 77.6723 32.26ZM75.2123 26H80.1323C80.0589 25.6 79.9023 25.24 79.6623 24.92C79.4289 24.5933 79.1389 24.3333 78.7923 24.14C78.4456 23.9467 78.0723 23.85 77.6723 23.85C77.2723 23.85 76.9023 23.9467 76.5623 24.14C76.2223 24.3267 75.9323 24.5833 75.6923 24.91C75.4589 25.23 75.2989 25.5933 75.2123 26ZM90.0684 32V18H94.7084C95.675 18 96.5784 18.1833 97.4184 18.55C98.265 18.91 99.0084 19.4133 99.6484 20.06C100.295 20.7 100.798 21.4433 101.158 22.29C101.525 23.13 101.708 24.0333 101.708 25C101.708 25.9667 101.525 26.8733 101.158 27.72C100.798 28.56 100.295 29.3033 99.6484 29.95C99.0084 30.59 98.265 31.0933 97.4184 31.46C96.5784 31.82 95.675 32 94.7084 32H90.0684ZM92.5084 29.56H94.7084C95.3284 29.56 95.9117 29.4433 96.4584 29.21C97.0117 28.97 97.4984 28.6433 97.9184 28.23C98.3384 27.81 98.6684 27.3267 98.9084 26.78C99.1484 26.2267 99.2684 25.6333 99.2684 25C99.2684 24.3667 99.1484 23.7767 98.9084 23.23C98.6684 22.6833 98.3384 22.2 97.9184 21.78C97.4984 21.36 97.015 21.0333 96.4684 20.8C95.9217 20.56 95.335 20.44 94.7084 20.44H92.5084V29.56ZM107.993 32.26C107.073 32.26 106.233 32.0233 105.473 31.55C104.72 31.0767 104.117 30.44 103.663 29.64C103.217 28.84 102.993 27.9567 102.993 26.99C102.993 26.2633 103.123 25.5833 103.383 24.95C103.643 24.31 104 23.75 104.453 23.27C104.913 22.7833 105.447 22.4033 106.053 22.13C106.66 21.8567 107.307 21.72 107.993 21.72C108.773 21.72 109.487 21.8867 110.133 22.22C110.787 22.5467 111.34 22.9967 111.793 23.57C112.247 24.1433 112.577 24.7967 112.783 25.53C112.99 26.2633 113.037 27.03 112.923 27.83H105.613C105.707 28.2033 105.86 28.54 106.073 28.84C106.287 29.1333 106.557 29.37 106.883 29.55C107.21 29.7233 107.58 29.8133 107.993 29.82C108.42 29.8267 108.807 29.7267 109.153 29.52C109.507 29.3067 109.8 29.02 110.033 28.66L112.523 29.24C112.117 30.1267 111.51 30.8533 110.703 31.42C109.897 31.98 108.993 32.26 107.993 32.26ZM105.533 26H110.453C110.38 25.6 110.223 25.24 109.983 24.92C109.75 24.5933 109.46 24.3333 109.113 24.14C108.767 23.9467 108.393 23.85 107.993 23.85C107.593 23.85 107.223 23.9467 106.883 24.14C106.543 24.3267 106.253 24.5833 106.013 24.91C105.78 25.23 105.62 25.5933 105.533 26ZM120.31 24.44H118.37V32H115.93V24.44H114.45V22H115.93V18.86H118.37V22H120.31V24.44ZM129.824 22H132.264V32H129.824L129.714 30.76C129.441 31.2067 129.077 31.57 128.624 31.85C128.177 32.1233 127.647 32.26 127.034 32.26C126.294 32.26 125.601 32.12 124.954 31.84C124.307 31.56 123.737 31.1733 123.244 30.68C122.757 30.1867 122.374 29.6167 122.094 28.97C121.821 28.3233 121.684 27.63 121.684 26.89C121.684 26.1767 121.814 25.5067 122.074 24.88C122.341 24.2533 122.711 23.7033 123.184 23.23C123.657 22.7567 124.204 22.3867 124.824 22.12C125.444 21.8533 126.111 21.72 126.824 21.72C127.484 21.72 128.074 21.8667 128.594 22.16C129.121 22.4533 129.567 22.8267 129.934 23.28L129.824 22ZM126.974 29.91C127.494 29.91 127.954 29.78 128.354 29.52C128.754 29.26 129.067 28.91 129.294 28.47C129.521 28.0233 129.634 27.5333 129.634 27C129.634 26.46 129.521 25.97 129.294 25.53C129.067 25.0833 128.751 24.73 128.344 24.47C127.944 24.21 127.487 24.08 126.974 24.08C126.461 24.08 125.991 24.2133 125.564 24.48C125.144 24.74 124.807 25.09 124.554 25.53C124.307 25.97 124.184 26.46 124.184 27C124.184 27.54 124.311 28.03 124.564 28.47C124.817 28.91 125.154 29.26 125.574 29.52C126.001 29.78 126.467 29.91 126.974 29.91ZM134.657 22H137.097V32H134.657V22ZM135.897 20.71C135.537 20.71 135.233 20.5933 134.987 20.36C134.74 20.12 134.617 19.82 134.617 19.46C134.617 19.1067 134.74 18.81 134.987 18.57C135.233 18.33 135.533 18.21 135.887 18.21C136.24 18.21 136.537 18.33 136.777 18.57C137.023 18.81 137.147 19.1067 137.147 19.46C137.147 19.82 137.027 20.12 136.787 20.36C136.547 20.5933 136.25 20.71 135.897 20.71ZM139.939 32V17H142.379V32H139.939ZM148.133 32.18C147.613 32.1467 147.11 32.0433 146.623 31.87C146.143 31.69 145.717 31.4467 145.343 31.14C144.97 30.8333 144.683 30.4667 144.483 30.04L146.543 29.16C146.623 29.2933 146.753 29.4367 146.933 29.59C147.113 29.7367 147.327 29.86 147.573 29.96C147.827 30.06 148.103 30.11 148.403 30.11C148.657 30.11 148.897 30.0767 149.123 30.01C149.357 29.9367 149.543 29.8267 149.683 29.68C149.83 29.5333 149.903 29.3433 149.903 29.11C149.903 28.8633 149.817 28.6733 149.643 28.54C149.477 28.4 149.263 28.2967 149.003 28.23C148.75 28.1567 148.503 28.09 148.263 28.03C147.63 27.9033 147.04 27.7067 146.493 27.44C145.953 27.1733 145.517 26.83 145.183 26.41C144.857 25.9833 144.693 25.47 144.693 24.87C144.693 24.21 144.867 23.64 145.213 23.16C145.567 22.68 146.023 22.31 146.583 22.05C147.15 21.79 147.76 21.66 148.413 21.66C149.207 21.66 149.933 21.8267 150.593 22.16C151.26 22.4867 151.787 22.95 152.173 23.55L150.243 24.69C150.15 24.53 150.02 24.3833 149.853 24.25C149.687 24.11 149.497 23.9967 149.283 23.91C149.07 23.8167 148.847 23.7633 148.613 23.75C148.313 23.7367 148.04 23.7633 147.793 23.83C147.547 23.8967 147.347 24.01 147.193 24.17C147.047 24.33 146.973 24.5433 146.973 24.81C146.973 25.0633 147.073 25.2533 147.273 25.38C147.473 25.5 147.713 25.5933 147.993 25.66C148.28 25.7267 148.553 25.8 148.813 25.88C149.4 26.0733 149.95 26.31 150.463 26.59C150.983 26.87 151.4 27.2133 151.713 27.62C152.027 28.0267 152.177 28.5133 152.163 29.08C152.163 29.7267 151.97 30.2933 151.583 30.78C151.197 31.26 150.697 31.6267 150.083 31.88C149.477 32.1333 148.827 32.2333 148.133 32.18Z"
                  fill="white"
                />
                <rect x="173" width="48" height="48" rx="24" fill="#8E94E9" />
                <path
                  d="M187.985 18.9982C187.495 19.4882 187.495 20.2782 187.985 20.7682L196.295 29.0782C196.685 29.4682 197.315 29.4682 197.705 29.0782L206.015 20.7682C206.505 20.2782 206.505 19.4882 206.015 18.9982C205.525 18.5082 204.735 18.5082 204.245 18.9982L196.995 26.2382L189.745 18.9882C189.265 18.5082 188.465 18.5082 187.985 18.9982Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
        {data.terms_and_conditions && (
          <div className="mb-[40px]">
            <div className="w-full bg-[#ADB4D2] h-[1px] mb-[24px]"></div>
            <div>
              <div className="text-[16px] text-[#1A1A23] font-bold mb-[3px]">
                Terms & Conditions:
              </div>
              <div>{data.terms_and_conditions}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

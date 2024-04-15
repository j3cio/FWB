export default function FirstRight() {
  return (
    <div
      className="backdrop-blur-12.5 mr-12 flex h-full w-full flex-col items-center justify-start gap-32 bg-white bg-opacity-10 pb-6 pl-3 pr-3 pt-6 shadow-xl"
      style={{
        height: '770px',
        borderRadius: '10px',
        justifyContent: 'center',
      }}
    >
      <div
        className="flex flex-col"
        style={{
          width: '300px',
          height: '170.80',
          alignItems: 'center',
        }}
      >
        <div style={{ width: '28px', height: '28px' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="29"
            viewBox="0 0 30 29"
            fill="none"
          >
            <path
              d="M24.6 2.40002H5.4C4.08 2.40002 3.012 3.48002 3.012 4.80002L3 26.4L7.8 21.6H24.6C25.92 21.6 27 20.52 27 19.2V4.80002C27 3.48002 25.92 2.40002 24.6 2.40002Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="font-Urbanist mt-5 text-2xl font-semibold text-white">
          Your Messages
        </div>
        <div className="font-Urbanist text-base font-normal leading-6 text-white">
          Lorem ipusum dolar sit amet consectetuer
        </div>
        <div
          className="mt-10 flex flex-row rounded-full"
          style={{
            background: '#8E94E9',
            width: '173px',
            height: '36px',
            justifyContent: 'center',
          }}
        >
          <button className="font-Urbanist tracking-0.32 text-base font-bold leading-5 text-white">
            Send messages
          </button>
          <div className="ml-1 mt-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
            >
              <path
                d="M4.84115 11.6334H14.1495L10.0828 15.7001C9.75781 16.0251 9.75781 16.5584 10.0828 16.8834C10.4078 17.2084 10.9328 17.2084 11.2578 16.8834L16.7495 11.3918C17.0745 11.0668 17.0745 10.5418 16.7495 10.2168L11.2661 4.71676C11.1105 4.56072 10.8991 4.47302 10.6786 4.47302C10.4582 4.47302 10.2468 4.56072 10.0911 4.71676C9.76615 5.04176 9.76615 5.56676 10.0911 5.89176L14.1495 9.96676H4.84115C4.38281 9.96676 4.00781 10.3418 4.00781 10.8001C4.00781 11.2584 4.38281 11.6334 4.84115 11.6334Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

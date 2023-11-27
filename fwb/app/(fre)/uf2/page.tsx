"use client";

import './page.css';
import IllustrationThree from "@/components/ui/fre/IllustrationThree";
import IllustrationFour from "@/components/ui/fre/IllustrationFour";
import Link from "next/link";

export default function UserFlowPage() {

  const handleverify = () => {
    window.open('https://www.linkedin.com/')
  }
  
  return (
    <div className="big">
      <IllustrationThree />
      <div className="spacing">
        <div className="flex-col justify-center">
          <div className="progresscircles">
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="8" viewBox="0 0 56 8" fill="none">
              <circle cx="4" cy="4" r="4" fill="#ADB4D2"/>
              <circle cx="28" cy="4" r="4" fill="#F6FF82"/>
              <circle cx="52" cy="4" r="4" fill="#ADB4D2"/>
            </svg>
          </div>
            <h2 className="largeheader">Share your "benefits" 😏</h2>
            <h5 className="smalltext1">Optionally verify your employment to help up build more trust in the community.</h5>
            <h5 className="smalltext2">We will never share your information externally.</h5>
          <form className="flex justify-center">
            <input
              type="username"
              className="inputcompany"
              placeholder="Company Name"
            />
          </form>

          <div className='flex justify-center mt-8px mb-4px'>
            <button className='linkedinverify' onClick={handleverify}>
              <div>Verify with LinkedIn</div>
              <div className='py-1'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401m-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4"/>
              </svg>
              </div>
            </button>
          </div>
          <div className='flex justify-center'>
            <div className="help">
                Having problems? Email us at{" "}
                <a className="helpEmail" href="mailto:help@makefwb.com">
                  help@makefwb.com
                </a>
              </div>
          </div>
          <div className="flex justify-center">
            <Link href='/uf3' className="next">Next !</Link>
          </div>
          <div className='flex justify-center'>
            <Link href='/uf3' className="skip">Skip for now</Link>
          </div>
        </div>
      </div>
      <IllustrationFour />
    </div>
  )
}
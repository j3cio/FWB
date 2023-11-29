import { Button } from "@/components/ui/button";
import Link from "next/link";
import "./page.css";
const LandingPage = () => {
  return (
    <div className="top">
      <h1
        className="flex justify-center items-center text-yellow-200 font-bold"
        style={{ marginLeft: "10px" }}
      >
        FRIENDS WITH BENEFITS
      </h1>
      {/* <div className="flex justify-center items-center gap-x-2"> */}
      <div className="exploreLists">
        <div className="exploreList">Explore</div>
        <div className="exploreList">Share Discounts</div>
        <div className="exploreList">About</div>
        <div className="exploreList">Groups</div>
        
      </div>

      <Link href="/sign-in">
        <Button className="signinButton" variant="secondary">
          Start Now
        </Button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M5.20874 13H16.3787L11.4987 17.88C11.1087 18.27 11.1087 18.91 11.4987 19.3C11.8887 19.69 12.5187 19.69 12.9087 19.3L19.4987 12.71C19.8887 12.32 19.8887 11.69 19.4987 11.3L12.9187 4.69996C12.7319 4.5127 12.4783 4.40747 12.2137 4.40747C11.9492 4.40747 11.6956 4.5127 11.5087 4.69996C11.1187 5.08996 11.1187 5.71996 11.5087 6.10996L16.3787 11H5.20874C4.65874 11 4.20874 11.45 4.20874 12C4.20874 12.55 4.65874 13 5.20874 13Z"
            fill="#8E94E9"
          />
        </svg>
      </Link>
      <Link href="/sign-up">
        <Button variant="secondary">Register</Button>
      </Link>
      {/* </div> */}
    </div>
  );
};

export default LandingPage;

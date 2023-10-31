import { Button } from "@/components/ui/button";
import Link from "next/link";
import "./page.css";
const LandingPage = () => {
  return (
    <div>
      <h1 className="flex justify-center items-center text-yellow-200 font-bold">
        FRIENDS WITH BENEFITS HOMEPAGE
      </h1>
      <div className="flex justify-center items-center gap-x-2">
        <div className="flex justify-center">
          <div className="exploreList">Explore</div>
          <div className="exploreList">Share Discounts</div>
          <div className="exploreList">About</div>
          <div className="exploreList">Groups</div>
        </div>
        <Link href="/sign-in">
          <Button variant="secondary">Start Now</Button>
        </Link>
        <Link href="/sign-up">
          <Button variant="secondary">Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;

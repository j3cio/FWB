import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
  return ( 
    <div>
      <h1 className="flex justify-center items-center text-yellow-200 font-bold">FRIENDS WITH BENEFITS HOMEPAGE</h1>
    <div className="flex justify-center items-center gap-x-2">
      <Link href="/sign-in">
        <Button variant="secondary">
          Login
        </Button>
      </Link>
      <Link href="/sign-up">
        <Button variant="secondary">
          Register
        </Button>
      </Link>
      </div>
    </div>
   );
}
 
export default LandingPage;
import { SignIn } from "@clerk/nextjs";
import "./page.css";

export default function Page() {
  return (
    <div className="big">
      <div className="signinContainer">
        <div className="circle1"></div>
        <div className="circle2"></div>
        <div className="two">
        <div className="circle3"></div>
        <div className="circle4"></div>
        </div>
        <div className="circle5"></div>
        <div className="three">
        <div className="circle6"></div>
        <div className="circle7"></div>
        </div>
      </div>
      <div className="leftSigninContainer">
        <div className="signin">
          <SignIn />
        </div>
      </div>
    </div>
  );
}

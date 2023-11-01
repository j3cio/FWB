import { SignIn } from "@clerk/nextjs";
import "./page.css";

export default function Page() {
  return (
    <div>
      <div className="signinContainer">
      <div className="leftSigninContainer"></div>
      <div className="hi">
        <SignIn />
      </div>
      </div>
    </div>
  );
}

import { SignIn } from "@clerk/nextjs";
import "./page.css"

export default function Page() {
  return <div className="hi"><SignIn /></div>;
}

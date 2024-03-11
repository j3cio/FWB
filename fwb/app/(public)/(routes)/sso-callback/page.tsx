import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallBack() {
  return (
    <AuthenticateWithRedirectCallback
      afterSignInUrl={"/profile"}
      afterSignUpUrl={"/success"}
    />
  );
}

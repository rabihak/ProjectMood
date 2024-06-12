import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <div className="w-full h-full flex content-center justify-center">
    <SignIn path="/sign-in" />;
  </div>

}
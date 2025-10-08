import { Header } from "@/components/header";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="sign-in" />
      <div className="flex flex-1 items-center justify-center min-h-[70vh]">
        <SignIn />
      </div>
    </div>
  );
}

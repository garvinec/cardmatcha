"use client";

import { Header } from "@/components/header";
import { SignIn, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function SignInPage() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50 pt-40">
        <Header currentPage="sign-in" />
        <div className="flex flex-1 items-center justify-center min-h-[70vh]">
          <SignIn />
        </div>
      </div>
    );
  }

  redirect("/profile");
}

"use client";

import { Header } from "@/components/header";
import { SignUp, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50 pt-48">
        <Header currentPage="sign-up" />
        <div className="flex flex-1 items-center justify-center min-h-[70vh]">
          <SignUp />
        </div>
      </div>
    );
  }

  redirect("/profile");
}

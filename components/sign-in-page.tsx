import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import SignInPageBg from "./sign-in-page-bg";
import { Header } from "./header";

const SignInPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-matcha-50/30 via-white to-matcha-50/20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 select-none opacity-40 blur-sm">
        <div className="h-full overflow-hidden">
          <SignInPageBg />
        </div>
      </div>
      <Header currentPage="profile" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-white/70 px-6 pb-16 pt-40 text-center backdrop-blur-sm">
          <div className="max-w-xl space-y-4">
            <h1 className="text-3xl font-semibold text-matcha-900 sm:text-4xl">
              Sign In to Maximize CardMatcha!
            </h1>
            <p className="text-base text-matcha-900/80">
              You're getting a preview of the insights waiting once you sign in.
              Bring your personalized dashboard to life with a secure account.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              variant="secondary"
              className="rounded-full px-8 py-5 text-base font-medium text-matcha-900 shadow-sm transition-colors duration-300 hover:bg-[#ede8de] hover:text-matcha-900"
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button
              asChild
              className="rounded-full px-8 py-5 text-base font-medium bg-matcha-600 text-white shadow-sm transition-colors duration-300 hover:bg-matcha-700"
            >
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

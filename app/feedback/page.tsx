import { currentUser } from "@clerk/nextjs/server";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import { FeedbackForm } from "./feedback-form";

const findPrimaryEmail = (user: Awaited<ReturnType<typeof currentUser>>) => {
  if (!user) {
    return null;
  }

  return (
    user.emailAddresses?.find(
      (emailAddress) => emailAddress.id === user.primaryEmailAddressId,
    )?.emailAddress ?? user.emailAddresses?.[0]?.emailAddress ?? null
  );
};

export default async function FeedbackPage() {
  const user = await currentUser();
  const email = findPrimaryEmail(user);

  return (
    <div className="min-h-screen bg-gradient-to-b from-matcha-50/40 via-white to-matcha-100/50">
      <Header currentPage="feedback" />
      <main className="px-4 pb-24 pt-40 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8 rounded-3xl border border-matcha-200/60 bg-white/80 p-8 shadow-xl backdrop-blur">
          <div className="space-y-3 text-center">
            <h1 className="text-4xl font-light text-matcha-900">
              We&apos;d love your feedback
            </h1>
            <p className="text-base font-light text-matcha-800/80">
              Share your thoughts to help us keep improving the CardMatcha experience.
            </p>
          </div>
          {user ? (
            <FeedbackForm userEmail={email} />
          ) : (
            <p className="rounded-2xl border border-dashed border-matcha-300 bg-white/70 px-6 py-12 text-center text-lg font-medium text-matcha-800">
              Log In to give feedback!
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

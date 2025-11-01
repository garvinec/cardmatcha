import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";

import { FeedbackForm } from "./feedback-form";

export default async function FeedbackPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;
  const email = user?.email ?? null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-matcha-50/40 via-white to-matcha-100/50">
      <Header currentPage="feedback" />
      <main className="px-4 pb-24 pt-48 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8 rounded-3xl border border-matcha-200/60 bg-white/80 p-8 shadow-xl backdrop-blur">
          <div className="space-y-3 text-center">
            <h1 className="text-4xl font-light text-matcha-900">
              We&apos;d love your feedback
            </h1>
            <p className="text-base font-light text-matcha-800/80">
              Share your thoughts to help us keep improving the CardMatcha
              experience.
            </p>
          </div>
          {user ? (
            <FeedbackForm userEmail={email} />
          ) : (
            <div className="space-y-6 rounded-2xl border border-dashed border-matcha-300 bg-white/70 px-6 py-12 text-center">
              <p className="text-lg font-medium text-matcha-800 pb-6">
                Log in to give us your feedback!
              </p>
              <Link href="/login">
                <Button className="bg-matcha-600 hover:bg-matcha-700 text-white">
                  Go to Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

"use server";

import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function loginWithGoogle() {
  const supabase = await createSupabaseServerClient();
  const origin = (await headers()).get("origin");

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error);
    redirect("/error");
  } else {
    redirect(data.url);
  }
}

export async function loginWithEmail(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  // Validation with granular error redirects
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const password = typeof data.password === "string" ? data.password : "";

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    redirect("/login?error=invalid_credentials");
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signupWithEmail(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  if (!data.password) {
    redirect("/login?error=empty_password");
  }

  if (data.password.length <= 6) {
    redirect("/login?error=short_password");
  }

  const origin = (await headers()).get("origin");
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: `${origin}/auth/confirm?next=/profile`,
    },
  });

  if (error) {
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect(`/login?signup=success&email=${encodeURIComponent(data.email)}`);
}

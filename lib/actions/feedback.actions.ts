"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/utils/supabase/server";

export type FeedbackFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const submitFeedback = async (
  _prevState: FeedbackFormState,
  formData: FormData
): Promise<FeedbackFormState> => {
  const content = String(formData.get("content") ?? "").trim();

  if (!content) {
    return {
      status: "error",
      message: "Please enter your feedback before submitting.",
    };
  }

  const supabaseServer = await createSupabaseServerClient();
  const { data, error: authError } = await supabaseServer.auth.getUser();

  if (authError || !data?.user) {
    return {
      status: "error",
      message: "You must be signed in to submit feedback.",
    };
  }

  const user = data.user;
  const email = user.email;

  if (!email) {
    return {
      status: "error",
      message: "We couldn't determine your email address to save the feedback.",
    };
  }

  const { error } = await supabaseServer.from("feedback").insert({
    content,
    email,
    user_id: user.id,
  });

  if (error) {
    return {
      status: "error",
      message: "Unable to submit feedback right now. Please try again.",
    };
  }

  revalidatePath("/feedback");

  return {
    status: "success",
    message: "Thanks for sharing your feedback!",
  };
};

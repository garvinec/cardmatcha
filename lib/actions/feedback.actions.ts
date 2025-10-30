"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { createSupabaseClient } from "../supabase";

export type FeedbackFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const submitFeedback = async (
  _prevState: FeedbackFormState,
  formData: FormData,
): Promise<FeedbackFormState> => {
  const content = String(formData.get("content") ?? "").trim();

  if (!content) {
    return {
      status: "error",
      message: "Please enter your feedback before submitting.",
    };
  }

  const user = await currentUser();

  if (!user) {
    return {
      status: "error",
      message: "You must be signed in to submit feedback.",
    };
  }

  const primaryEmail =
    user.emailAddresses?.find(
      (emailAddress) => emailAddress.id === user.primaryEmailAddressId,
    )?.emailAddress ?? user.emailAddresses?.[0]?.emailAddress ?? null;

  if (!primaryEmail) {
    return {
      status: "error",
      message: "We couldn't determine your email address to save the feedback.",
    };
  }

  const supabase = createSupabaseClient();
  const { error } = await supabase.from("feedback").insert({
    content,
    email: primaryEmail,
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

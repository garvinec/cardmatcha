"use client";

import { useEffect, useRef, useActionState, useState } from "react";

import {
  submitFeedback,
  type FeedbackFormState,
} from "@/lib/actions/feedback.actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const initialState: FeedbackFormState = {
  status: "idle",
  message: "",
};

type SubmitButtonProps = {
  pending: boolean;
};

const SubmitButton = ({ pending }: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      className="bg-matcha-600 hover:bg-matcha-700 text-white"
      disabled={pending}
    >
      {pending ? "Submitting..." : "Submit Feedback"}
    </Button>
  );
};

type FeedbackFormProps = {
  userEmail?: string | null;
};

export function FeedbackForm({ userEmail }: FeedbackFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [state, formAction] = useActionState(submitFeedback, initialState);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      setPending(false);
    } else if (state.status === "error") {
      setPending(false);
    }
  }, [state.status]);

  const handleSubmit = async (formData: FormData) => {
    setPending(true);
    await formAction(formData);
  };

  return (
    <form ref={formRef} action={handleSubmit} className="w-full space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="feedback-content"
          className="text-lg font-medium text-matcha-900"
        >
          Your Feedback
        </label>
        <Textarea
          id="feedback-content"
          name="content"
          placeholder="Let us know how we can improve CardMatcha..."
          className="min-h-[200px] resize-y border-matcha-200 bg-white/80 focus-visible:ring-matcha-500"
          required
        />
        {userEmail ? (
          <p className="text-sm text-matcha-600">
            Submitting as <span className="font-medium">{userEmail}</span>
          </p>
        ) : null}
      </div>

      <div className="space-y-3">
        <SubmitButton pending={pending} />
        {state.status === "success" ? (
          <p className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
            {state.message}
          </p>
        ) : null}
        {state.status === "error" ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

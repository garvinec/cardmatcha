"use server";

import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "../supabase";

export async function submitMissingCard(formData: FormData) {
  const cardName = formData.get("card_name");
  const cardIssuer = formData.get("card_issuer");

  const trimmedCardName =
    typeof cardName === "string" ? cardName.trim() : undefined;
  const trimmedCardIssuer =
    typeof cardIssuer === "string" ? cardIssuer.trim() : undefined;

  if (!trimmedCardName || !trimmedCardIssuer) {
    redirect("/submit-missing-card?error=missing-fields");
  }

  const supabase = createSupabaseServerClient();

  const { error } = await supabase.from("missing_card").insert({
    card_name: trimmedCardName,
    card_issuer: trimmedCardIssuer,
  });

  if (error) {
    redirect("/submit-missing-card?error=server-error");
  }

  redirect("/submit-missing-card?submitted=1");
}

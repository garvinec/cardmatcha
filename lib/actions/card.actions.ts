import { createSupabaseClient } from "../supabase";

export const getCardById = async (id: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("credit_cards")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getCardByName = async (cardName: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("credit_cards")
    .select("*")
    .eq("card_name", cardName)
    .single();
};

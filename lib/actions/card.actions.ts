import { createSupabaseClient } from "@/utils/supabase/client";

export const getCardById = async (id: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("credit_cards")
    .select(
      `*,
      card_rewards:card_rewards (
        id,
        reward_rate,
        reward_type,
        reward_description,
        reward_categories:reward_categories ( category_name )
      ),
      card_benefits:card_benefits (
        id,
        description
      )`
    )
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

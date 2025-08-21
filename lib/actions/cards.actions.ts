"use server";

import { createSupabaseClient } from "../supabase";

interface getCardsProps {
  pageNumber?: number;
  cardsPerPage?: number;
}

export const getCards = async ({
  pageNumber = 1,
  cardsPerPage = 15,
}: getCardsProps) => {
  const supabase = createSupabaseClient();
  let query = supabase.from("credit_cards").select("*", { count: "exact" });

  const { count } = await query;
  const totalCount = count || 0;

  const { data, error } = await query.range(
    (pageNumber - 1) * cardsPerPage,
    pageNumber * cardsPerPage - 1
  );

  if (error) {
    throw new Error(error.message);
  }

  return { data, totalCount };
};

// TODO: Add popularity logic later. popularity logic based on how many users own the card.
export const getMostPopularCards = async () => {
  const supabase = createSupabaseClient();
  let query = supabase.from("credit_cards").select().limit(5);

  const { data, error } = await query;
  console.log(data);
  console.log(error);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getCardsByCategory = async (category: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("credit_cards")
    .select("*")
    .eq("category", category);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getCardsByIssuer = async (issuer_code: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("credit_cards")
    .select("*")
    .eq("issuer_code", issuer_code);

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    return { cardsByIssuer: [], issuerName: "" };
  }

  return { cardsByIssuer: data, issuerName: data[0].issuer };
};

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

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getCardsByCategory = async (
  category: string,
  {
    pageNumber = 1,
    cardsPerPage = 15,
  }: { pageNumber?: number; cardsPerPage?: number } = {}
) => {
  const supabase = createSupabaseClient();
  const from = (pageNumber - 1) * cardsPerPage;
  const to = from + cardsPerPage - 1;

  const { data, error, count } = await supabase
    .from("credit_cards")
    .select("*", { count: "exact" })
    .eq("category", category)
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return {
    data: data ?? [],
    totalCount: count ?? 0,
  };
};

type CategoryRecord = {
  id?: string;
  slug?: string;
  name?: string | null;
  category_name?: string | null;
  description?: string | null;
  summary?: string | null;
  icon?: string | null;
  emoji?: string | null;
};

export const getCategoryWithCards = async (
  slug: string
): Promise<{ category: CategoryRecord | null; cards: any[] }> => {
  const supabase = createSupabaseClient();

  const [{ data: category, error: categoryError }, { data: cards, error: cardsError }]
    = await Promise.all([
      supabase
        .from("card_categories")
        .select("*")
        .eq("slug", slug)
        .maybeSingle(),
      supabase
        .from("credit_cards")
        .select("*")
        .eq("category_slug", slug),
    ]);

  if (categoryError && categoryError.code !== "PGRST116") {
    throw new Error(categoryError.message);
  }

  if (cardsError) {
    throw new Error(cardsError.message);
  }

  return {
    category: (category as CategoryRecord | null) ?? null,
    cards: cards ?? [],
  };
};

export const getCardsByIssuer = async (
  issuer_code: string,
  {
    pageNumber = 1,
    cardsPerPage = 15,
  }: { pageNumber?: number; cardsPerPage?: number } = {}
) => {
  const supabase = createSupabaseClient();

  const from = (pageNumber - 1) * cardsPerPage;
  const to = from + cardsPerPage - 1;

  const { data, error, count } = await supabase
    .from("credit_cards")
    .select("*", { count: "exact" })
    .eq("issuer_code", issuer_code)
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return {
    data: data ?? [],
    totalCount: count ?? 0,
    issuerName: data?.[0]?.issuer ?? null,
  };
};

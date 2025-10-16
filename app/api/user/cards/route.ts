import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { createSupabaseClient } from "@/lib/supabase";

type RewardRow = {
  id: string;
  reward_rate: number | null;
  reward_type: string | null;
  reward_description: string | null;
  reward_categories: {
    category_name: string | null;
  } | null;
};

type UserCardRow = {
  id: string;
  card_id: string;
  credit_cards: {
    id: string;
    card_name: string;
    issuer: string | null;
    category: string | null;
    annual_fee: number | null;
    card_rewards: RewardRow[] | null;
  } | null;
};

type UserCardResponse = {
  cardId: string;
  cardName: string;
  issuer: string | null;
  category: string | null;
  annualFee: number | null;
  highestReward: {
    category: string | null;
    rate: number | null;
    type: string | null;
    description: string | null;
  } | null;
};

const formatRate = (value: number | null | undefined) => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
};

const mapUserCard = (row: UserCardRow): UserCardResponse | null => {
  if (!row.credit_cards) {
    return null;
  }

  const rewards = row.credit_cards.card_rewards ?? [];

  const highestReward = rewards
    .map((reward) => ({
      reward,
      normalizedRate: formatRate(reward.reward_rate) ?? Number.NEGATIVE_INFINITY,
    }))
    .sort((a, b) => b.normalizedRate - a.normalizedRate)[0]?.reward;

  return {
    cardId: row.credit_cards.id,
    cardName: row.credit_cards.card_name,
    issuer: row.credit_cards.issuer,
    category: row.credit_cards.category,
    annualFee: row.credit_cards.annual_fee,
    highestReward: highestReward
      ? {
          category: highestReward.reward_categories?.category_name ?? null,
          rate: formatRate(highestReward.reward_rate),
          type: highestReward.reward_type,
          description: highestReward.reward_description,
        }
      : null,
  };
};

const unauthorizedResponse = () =>
  NextResponse.json({ error: "Unauthorized" }, { status: 401 });

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return unauthorizedResponse();
  }

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("user_cards")
    .select(
      `id, card_id, credit_cards (
        id,
        card_name,
        issuer,
        category,
        annual_fee,
        card_rewards:card_rewards (
          id,
          reward_rate,
          reward_type,
          reward_description,
          reward_categories:reward_categories ( category_name )
        )
      )`
    )
    .eq("user_id", userId);

  if (error) {
    return NextResponse.json(
      { error: "Unable to load saved cards" },
      { status: 500 }
    );
  }

  const cards = (data as UserCardRow[] | null)?.
    map(mapUserCard)
    .filter((card): card is UserCardResponse => Boolean(card));

  return NextResponse.json({ cards: cards ?? [] });
}

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return unauthorizedResponse();
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request payload" },
      { status: 400 }
    );
  }

  const cardId =
    typeof body === "object" && body !== null && "cardId" in body
      ? (body.cardId as string)
      : undefined;

  if (!cardId || typeof cardId !== "string") {
    return NextResponse.json(
      { error: "Card identifier is required" },
      { status: 400 }
    );
  }

  const supabase = createSupabaseClient();

  const { data: existingCard } = await supabase
    .from("user_cards")
    .select("id")
    .eq("user_id", userId)
    .eq("card_id", cardId)
    .maybeSingle();

  if (existingCard) {
    return NextResponse.json(
      { error: "Card already saved" },
      { status: 409 }
    );
  }

  const { data, error } = await supabase
    .from("user_cards")
    .insert({ user_id: userId, card_id: cardId })
    .select(
      `id, card_id, credit_cards (
        id,
        card_name,
        issuer,
        category,
        annual_fee,
        card_rewards:card_rewards (
          id,
          reward_rate,
          reward_type,
          reward_description,
          reward_categories:reward_categories ( category_name )
        )
      )`
    )
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Unable to save card" },
      { status: 500 }
    );
  }

  const card = mapUserCard(data as UserCardRow);

  if (!card) {
    return NextResponse.json(
      { error: "Saved card is missing details" },
      { status: 500 }
    );
  }

  return NextResponse.json({ card }, { status: 201 });
}


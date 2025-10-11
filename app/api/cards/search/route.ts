import { NextResponse } from "next/server";
import { createSupabaseClient } from "@/lib/supabase";

interface CreditCardRecord {
  id: string;
  card_name: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();

  if (!query || query.length < 3) {
    return NextResponse.json({ results: [] });
  }

  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("credit_cards")
    .select("id, card_name")
    .ilike("card_name", `%${query}%`)
    .limit(25);

  if (error) {
    return NextResponse.json(
      { error: "Unable to fetch search results" },
      { status: 500 }
    );
  }

  const normalizedQuery = query.toLowerCase();
  const sortedResults = (data as CreditCardRecord[] | null)?.
    map((card) => {
      const lowerName = card.card_name.toLowerCase();
      return {
        ...card,
        matchIndex: lowerName.indexOf(normalizedQuery),
      };
    })
    .filter((card) => card.matchIndex !== -1)
    .sort((a, b) => {
      if (a.matchIndex !== b.matchIndex) {
        return a.matchIndex - b.matchIndex;
      }

      const aSuffix = a.card_name
        .slice(a.matchIndex + query.length)
        .toLowerCase();
      const bSuffix = b.card_name
        .slice(b.matchIndex + query.length)
        .toLowerCase();

      if (aSuffix === bSuffix) {
        return a.card_name.localeCompare(b.card_name);
      }

      return aSuffix.localeCompare(bSuffix);
    })
    .slice(0, 5)
    .map(({ matchIndex, ...card }) => card);

  return NextResponse.json({ results: sortedResults ?? [] });
}

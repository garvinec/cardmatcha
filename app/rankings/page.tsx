import { Header } from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import { getMostPopularCards } from "@/lib/actions/cards.actions";

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return (
        <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 text-white rounded-2xl flex items-center justify-center text-lg font-light shadow-lg">
          {rank}
        </div>
      );
    case 2:
      return (
        <div className="w-14 h-14 bg-gradient-to-br from-gray-300 to-gray-500 text-white rounded-2xl flex items-center justify-center text-lg font-light shadow-lg">
          {rank}
        </div>
      );
    case 3:
      return (
        <div className="w-14 h-14 bg-gradient-to-br from-yellow-700 to-yellow-900 text-white rounded-2xl flex items-center justify-center text-lg font-light shadow-lg">
          {rank}
        </div>
      );
    default:
      return (
        <div className="w-14 h-14 bg-gradient-to-br from-matcha-700 to-matcha-900 text-white rounded-2xl flex items-center justify-center text-lg font-light shadow-lg">
          {rank}
        </div>
      );
  }
}

export default async function RankingsPage() {
  const popularCards = await getMostPopularCards();

  // Map the cards to the format expected by the UI
  const fullRankings = popularCards.map((card, index) => ({
    id: card.id,
    rank: index + 1,
    name: card.card_name,
    issuer: card.issuer || "Unknown",
    category: card.category || "General",
    annualFee: card.annual_fee ? parseFloat(card.annual_fee.toString()) : 0,
    signupBonus: card.welcome_bonus || "No bonus available",
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-matcha-50/40 via-matcha-100 to-matcha-200/40 pt-48">
      <Header />

      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <TrendingUp className="h-12 w-12 text-matcha-800 mr-4" />
              <h1 className="text-5xl font-light text-gray-900 tracking-tight">
                Rankings
              </h1>
            </div>
            <p className="text-xl text-matcha-800/80 max-w-2xl mx-auto font-light leading-relaxed">
              Discover the most popular cards among CardMatcha users!
            </p>
          </div>

          {/* Rankings List */}
          <div className="space-y-6">
            {fullRankings.map((card) => (
              <Card
                key={card.id}
                className="hover:shadow-2xl transition-all duration-500 border-0 shadow-xl rounded-3xl bg-matcha-50/80 backdrop-blur overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      {/* Rank Icon */}
                      <div className="flex-shrink-0">
                        {getRankIcon(card.rank)}
                      </div>

                      {/* Card Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h3 className="text-xl font-light text-gray-900">
                            {card.name}
                          </h3>
                          <Badge
                            variant="secondary"
                            className="bg-matcha-100/80 text-matcha-800 border-0 rounded-full px-3 py-1 font-light"
                          >
                            {card.category}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4 font-light">
                          {card.issuer}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500 font-light">
                              Annual Fee:{" "}
                            </span>
                            <span className="font-normal">
                              {card.annualFee === 0
                                ? "No Fee"
                                : `$${card.annualFee}`}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500 font-light">
                              Rank:{" "}
                            </span>
                            <span className="font-normal text-matcha-700">
                              #{card.rank}
                            </span>
                          </div>
                        </div>
                        <div className="mt-3">
                          <span className="text-matcha-800 font-normal text-sm">
                            {card.signupBonus}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0">
                      <Button
                        asChild
                        className="bg-matcha-700 hover:bg-matcha-800 text-white rounded-full px-6 py-5 font-light shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Link href={`/card/${card.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getMostPopularCards } from "@/lib/actions/cards.actions";

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return (
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 text-white rounded-full flex items-center justify-center font-light text-lg shadow-lg">
          {rank}
        </div>
      );
    case 2:
      return (
        <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-500 text-white rounded-full flex items-center justify-center font-light text-lg shadow-lg">
          {rank}
        </div>
      );
    case 3:
      return (
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-700 to-yellow-900 text-white rounded-full flex items-center justify-center font-light text-lg shadow-lg">
          {rank}
        </div>
      );
    default:
      return (
        <div className="w-12 h-12 bg-gradient-to-br from-matcha-700 to-matcha-900 text-white rounded-full flex items-center justify-center font-light text-lg shadow-lg">
          {rank}
        </div>
      );
  }
}

export async function TopPopularCards() {
  const popularCards = await getMostPopularCards();

  // Get the top 3 cards and map to the format expected by the UI
  const topCards = popularCards.slice(0, 3).map((card, index) => ({
    id: card.id,
    rank: index + 1,
    name: card.card_name,
    issuer: card.issuer || "Unknown",
    category: card.category || "General",
    annualFee: card.annual_fee ? parseFloat(card.annual_fee.toString()) : 0,
    signupBonus: card.welcome_bonus || "No bonus available",
  }));

  return (
    <section className="py-4">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-light text-matcha-900 mb-4 tracking-tight">
            Most Popular
          </h3>
          <p className="text-lg text-matcha-800/80 font-light">
            Cards chosen by CardMatcha users
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {topCards.map((card) => (
            <Card
              key={card.id}
              className="hover:shadow-2xl transition-all duration-500 border-0 bg-matcha-50/80 backdrop-blur rounded-3xl overflow-hidden"
            >
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    {/* Rank Badge */}
                    <div className="flex-shrink-0">
                      {getRankIcon(card.rank)}
                    </div>

                    {/* Card Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <h4 className="text-xl font-light text-gray-900">
                          {card.name}
                        </h4>
                        <Badge
                          variant="secondary"
                          className="bg-matcha-100/80 text-matcha-800 border-0 rounded-full px-3 py-1 font-light"
                        >
                          {card.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-4 font-light">
                        {card.issuer}
                      </p>
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <span className="font-light">
                          {card.annualFee === 0
                            ? "No Annual Fee"
                            : `$${card.annualFee}/year`}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-matcha-700 font-normal">
                          {card.signupBonus}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    <Button
                      variant="outline"
                      className="rounded-full px-6 py-5 border-matcha-200 hover:bg-matcha-50 font-light transition-all duration-300 bg-transparent"
                      asChild
                    >
                      <Link href={`/card/${card.id}`}>Details</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View Full Ranking Button */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="bg-matcha-50/80 backdrop-blur text-matcha-800 border-matcha-200 hover:bg-matcha-100 rounded-full px-8 py-6 font-light text-base shadow-lg hover:shadow-xl transition-all duration-300"
            asChild
          >
            <Link href="/rankings">
              View All Rankings
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

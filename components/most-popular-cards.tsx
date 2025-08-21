import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getMostPopularCards } from "@/lib/actions/cards.actions";

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return (
        <div className="w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
          {rank}
        </div>
      );
    case 2:
      return (
        <div className="w-12 h-12 bg-gray-400 text-white rounded-full flex items-center justify-center font-bold text-lg">
          {rank}
        </div>
      );
    case 3:
      return (
        <div className="w-12 h-12 bg-yellow-700 text-white rounded-full flex items-center justify-center font-bold text-lg">
          {rank}
        </div>
      );
    default:
      return (
        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
          {rank}
        </div>
      );
  }
}

const topCards = [
  {
    id: 1,
    rank: 1,
    name: "Chase Sapphire Preferred",
    issuer: "Chase",
    rating: 4.8,
    category: "Travel",
    annualFee: 95,
    signupBonus: "60,000 points",
    popularityScore: 98,
  },
  {
    id: 4,
    rank: 2,
    name: "Capital One Venture X",
    issuer: "Capital One",
    rating: 4.9,
    category: "Premium Travel",
    annualFee: 395,
    signupBonus: "75,000 miles",
    popularityScore: 95,
  },
  {
    id: 2,
    rank: 3,
    name: "Citi Double Cash",
    issuer: "Citi",
    rating: 4.6,
    category: "Cash Back",
    annualFee: 0,
    signupBonus: "$200 cash back",
    popularityScore: 92,
  },
  {
    id: 3,
    rank: 4,
    name: "American Express Gold",
    issuer: "American Express",
    rating: 4.7,
    category: "Dining",
    annualFee: 250,
    signupBonus: "60,000 points",
    popularityScore: 89,
  },
  {
    id: 6,
    rank: 5,
    name: "Chase Freedom Unlimited",
    issuer: "Chase",
    rating: 4.4,
    category: "Flat Rate",
    annualFee: 0,
    signupBonus: "$200 cash back",
    popularityScore: 87,
  },
];

export async function MostPopularCards() {
  const popularCards = await getMostPopularCards();
  console.log(popularCards);
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-8 w-8 text-blue-600 mr-3" />
            <h3 className="text-3xl font-bold text-gray-900">
              Most Popular Credit Cards
            </h3>
          </div>
          <p className="text-lg text-gray-600">
            Top-rated cards chosen by thousands of users
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {popularCards.map((card, idx) => (
            <Card
              key={card.id}
              className="hover:shadow-md transition-shadow duration-200"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Rank Badge */}
                    <div className="flex-shrink-0">{getRankIcon(idx + 1)}</div>

                    {/* Card Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {card.card_name}
                        </h4>
                        {/* TODO: Add category later */}
                        {/* <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800"
                        >
                          {card.category}
                        </Badge> */}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {card.issuer}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>
                          Annual Fee:{" "}
                          {card.annual_fee === 0
                            ? "No Fee"
                            : `$${card.annual_fee}`}
                        </span>
                        {/* TODO: Add welcome bonus later */}
                        {/* <span>•</span>
                        <span className="text-green-600 font-medium">
                          {card.welcome_bonus}
                        </span> */}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    <Button variant="outline" asChild>
                      <Link href={`/card/${card.id}`}>View Details</Link>
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
            className="bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
            asChild
          >
            <Link href="/rankings">
              View Full Rankings
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

import { Header } from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, TrendingUp } from "lucide-react";
import Link from "next/link";

const fullRankings = [
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
    monthlySearches: "45K",
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
    monthlySearches: "38K",
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
    monthlySearches: "42K",
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
    monthlySearches: "35K",
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
    monthlySearches: "40K",
  },
  {
    id: 5,
    rank: 6,
    name: "Discover it Cash Back",
    issuer: "Discover",
    rating: 4.5,
    category: "Rotating Categories",
    annualFee: 0,
    signupBonus: "Cashback Match",
    popularityScore: 84,
    monthlySearches: "32K",
  },
];

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
        <div className="w-14 h-14 bg-gradient-to-br from-green-700 to-green-900 text-white rounded-2xl flex items-center justify-center text-lg font-light shadow-lg">
          {rank}
        </div>
      );
  }
}

export default function RankingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/30 via-white to-lime-50/20">
      <Header />

      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <TrendingUp className="h-12 w-12 text-green-800 mr-4" />
              <h1 className="text-5xl font-light text-gray-900 tracking-tight">
                Rankings
              </h1>
            </div>
            <p className="text-xl text-green-800/70 max-w-2xl mx-auto font-light leading-relaxed">
              Discover the most popular cards, based on expert ratings and user
              preferences
            </p>
          </div>

          {/* Rankings List */}
          <div className="space-y-6">
            {fullRankings.map((card) => (
              <Card
                key={card.id}
                className="hover:shadow-2xl transition-all duration-500 border-0 shadow-xl rounded-3xl bg-white/80 backdrop-blur overflow-hidden"
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
                            className="bg-green-100/80 text-green-800 border-0 rounded-full px-3 py-1 font-light"
                          >
                            {card.category}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4 font-light">
                          {card.issuer}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-2" />
                            <span className="font-light">
                              {card.rating} Rating
                            </span>
                          </div>
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
                              Searches:{" "}
                            </span>
                            <span className="font-normal">
                              {card.monthlySearches}/month
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500 font-light">
                              Popularity:{" "}
                            </span>
                            <span className="font-normal text-green-700">
                              {card.popularityScore}/100
                            </span>
                          </div>
                        </div>
                        <div className="mt-3">
                          <span className="text-green-800 font-normal text-sm">
                            {card.signupBonus}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0">
                      <Button
                        asChild
                        className="bg-green-800 hover:bg-green-900 text-white rounded-full px-6 py-5 font-light shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Link href={`/card/${card.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Methodology */}
          <Card className="mt-16 border-0 shadow-xl rounded-3xl bg-white/80 backdrop-blur overflow-hidden">
            <CardContent className="p-8">
              <h3 className="text-2xl font-light text-gray-900 mb-8">
                Ranking Methodology
              </h3>
              <div className="grid md:grid-cols-3 gap-8 text-sm text-gray-600">
                <div>
                  <h4 className="font-normal text-gray-900 mb-3 text-base">
                    User Popularity (40%)
                  </h4>
                  <p className="font-light leading-relaxed">
                    Based on user searches, applications, and engagement metrics
                  </p>
                </div>
                <div>
                  <h4 className="font-normal text-gray-900 mb-3 text-base">
                    Expert Rating (35%)
                  </h4>
                  <p className="font-light leading-relaxed">
                    Professional analysis of rewards, benefits, and overall
                    value
                  </p>
                </div>
                <div>
                  <h4 className="font-normal text-gray-900 mb-3 text-base">
                    Market Performance (25%)
                  </h4>
                  <p className="font-light leading-relaxed">
                    Application approval rates, customer satisfaction, and
                    market trends
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

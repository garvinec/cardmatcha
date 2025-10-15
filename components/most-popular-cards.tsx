import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";

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
        <div className="w-12 h-12 bg-gradient-to-br from-matcha-dark to-matcha-deep text-offwhite rounded-full flex items-center justify-center font-light text-lg shadow-lg">
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
];

export function TopPopularCards() {
  return (
    <section className="py-4">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 text-matcha-foreground">
          <h3 className="text-4xl md:text-5xl font-light text-matcha-deep mb-4 tracking-tight">
            Most Popular
          </h3>
          <p className="text-lg text-matcha-foreground/80 font-light">
            Cards chosen by thousands
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {topCards.map((card) => (
            <Card
              key={card.id}
              className="hover:shadow-2xl transition-all duration-500 border border-matcha-muted/40 bg-offwhite/80 backdrop-blur rounded-3xl overflow-hidden"
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
                        <h4 className="text-xl font-light text-matcha-deep">
                          {card.name}
                        </h4>
                        <Badge
                          variant="secondary"
                          className="bg-matcha-muted/70 text-matcha-foreground border-0 rounded-full px-3 py-1 font-light"
                        >
                          {card.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-matcha-foreground/70 mb-4 font-light">
                        {card.issuer}
                      </p>
                      <div className="flex items-center space-x-6 text-sm text-matcha-foreground/80">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-2" />
                          <span className="font-light">{card.rating}</span>
                        </div>
                        <span className="text-matcha-foreground/40">•</span>
                        <span className="font-light">
                          {card.annualFee === 0
                            ? "No Annual Fee"
                            : `$${card.annualFee}/year`}
                        </span>
                        <span className="text-matcha-foreground/40">•</span>
                        <span className="text-matcha-dark font-normal">
                          {card.signupBonus}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    <Button
                      variant="outline"
                      className="rounded-full px-6 py-5 border-matcha-muted hover:bg-matcha-muted/40 font-light transition-all duration-300 bg-transparent text-matcha-dark"
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
            className="bg-offwhite/80 backdrop-blur text-matcha-dark border-matcha-muted hover:bg-matcha-muted/40 rounded-full px-8 py-6 font-light text-base shadow-lg hover:shadow-xl transition-all duration-300"
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

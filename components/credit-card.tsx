import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Gift } from "lucide-react";
import Link from "next/link";

export interface CreditCardType {
  id: string;
  card_name: string;
  issuer: string;
  image?: string | null;
  annual_fee: number | null;
  welcome_bonus?: string | null;
  signup_requirement?: string | null;
  rewards?: string[] | null;
  benefits?: string[] | null;
  category?: string | null;
  rating?: number | null;
  best_for?: string | null;
}

interface CreditCardProps {
  card: CreditCardType;
}

export function CreditCardComponent({ card }: CreditCardProps) {
  const annualFee =
    card.annual_fee !== null && card.annual_fee !== undefined
      ? Number(card.annual_fee)
      : 0;
  const ratingValue =
    card.rating !== null && card.rating !== undefined
      ? Number(card.rating)
      : null;
  const ratingDisplay = ratingValue !== null ? ratingValue.toFixed(1) : "—";
  const category = card.category ?? "Card";
  const welcomeBonus = card.welcome_bonus ?? "No welcome bonus available";
  const signupRequirement =
    card.signup_requirement ?? "See terms and conditions for details.";
  const bestFor =
    card.best_for ?? "Explore the full details to see if this card fits you.";

  return (
    <Card className="h-full flex flex-col hover:shadow-2xl transition-all duration-500 border-0 bg-matcha-50/80 backdrop-blur rounded-3xl overflow-hidden group">
      <CardHeader className="pb-6 pt-8 px-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-light text-gray-900 mb-1">
              {card.card_name}
            </h3>
            <p className="text-sm text-gray-500 font-light">{card.issuer}</p>
          </div>
          <Badge
            variant="secondary"
            className="bg-matcha-100/80 text-matcha-800 border-0 rounded-full px-3 py-1 font-light"
          >
            {category}
          </Badge>
        </div>

        <div className="bg-gradient-to-br from-matcha-700 to-matcha-600 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-matcha-50/20 rounded-full blur-2xl"></div>
          <div className="relative z-10 mt-8">
            <p className="text-xs opacity-75 mb-1 font-light">Annual Fee</p>
            <p className="text-2xl font-light">
              {annualFee === 0 ? "No Fee" : `$${annualFee}`}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col px-8 pb-8">
        {/* Rating */}
        <div className="flex items-center mb-6">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-2 text-base font-light">{ratingDisplay}</span>
          </div>
          <span className="ml-3 text-xs text-gray-400 font-light">
            Expert Rating
          </span>
        </div>

        {/* Signup Bonus */}
        <div className="bg-matcha-50/50 rounded-2xl p-5 mb-6 border border-matcha-200/50">
          <div className="flex items-center mb-2">
            <Gift className="h-4 w-4 text-matcha-700 mr-2" />
            <span className="text-sm font-light text-matcha-900">
              Welcome Bonus
            </span>
          </div>
          <p className="text-base text-matcha-800 font-normal mb-1">
            {welcomeBonus}
          </p>
          <p className="text-xs text-matcha-600/70 font-light">
            {signupRequirement}
          </p>
        </div>

        {/* Best For */}
        <div className="mb-8">
          <p className="text-xs text-gray-400 mb-2 font-light">Best for</p>
          <p className="text-sm text-gray-700 font-light leading-relaxed">
            {bestFor}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <Button
            className="w-full bg-matcha-700 hover:bg-matcha-800 text-white rounded-full py-6 font-light text-base shadow-lg hover:shadow-xl transition-all duration-300"
            asChild
          >
            <Link href={`/card/${card.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

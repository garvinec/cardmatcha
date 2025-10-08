import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Gift } from "lucide-react";
import Link from "next/link";

interface CreditCardType {
  id: number;
  name: string;
  issuer: string;
  image: string;
  annualFee: number;
  signupBonus: string;
  signupRequirement: string;
  rewards: string[];
  benefits: string[];
  category: string;
  rating: number;
  bestFor: string;
}

interface CreditCardProps {
  card: CreditCardType;
}

export function CreditCardComponent({ card }: CreditCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur rounded-3xl overflow-hidden group">
      <CardHeader className="pb-6 pt-8 px-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-light text-gray-900 mb-1">
              {card.name}
            </h3>
            <p className="text-sm text-gray-500 font-light">{card.issuer}</p>
          </div>
          <Badge
            variant="secondary"
            className="bg-green-100/80 text-green-800 border-0 rounded-full px-3 py-1 font-light"
          >
            {card.category}
          </Badge>
        </div>

        <div className="bg-gradient-to-br from-green-800 to-green-600 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative z-10 mt-8">
            <p className="text-xs opacity-75 mb-1 font-light">Annual Fee</p>
            <p className="text-2xl font-light">
              {card.annualFee === 0 ? "No Fee" : `$${card.annualFee}`}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col px-8 pb-8">
        {/* Rating */}
        <div className="flex items-center mb-6">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-2 text-base font-light">{card.rating}</span>
          </div>
          <span className="ml-3 text-xs text-gray-400 font-light">
            Expert Rating
          </span>
        </div>

        {/* Signup Bonus */}
        <div className="bg-green-50/50 rounded-2xl p-5 mb-6 border border-green-100/50">
          <div className="flex items-center mb-2">
            <Gift className="h-4 w-4 text-green-700 mr-2" />
            <span className="text-sm font-light text-green-900">
              Welcome Bonus
            </span>
          </div>
          <p className="text-base text-green-800 font-normal mb-1">
            {card.signupBonus}
          </p>
          <p className="text-xs text-green-600/70 font-light">
            {card.signupRequirement}
          </p>
        </div>

        {/* Best For */}
        <div className="mb-8">
          <p className="text-xs text-gray-400 mb-2 font-light">Best for</p>
          <p className="text-sm text-gray-700 font-light leading-relaxed">
            {card.bestFor}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <Button
            className="w-full bg-green-800 hover:bg-green-900 text-white rounded-full py-6 font-light text-base shadow-lg hover:shadow-xl transition-all duration-300"
            asChild
          >
            <Link href={`/card/${card.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

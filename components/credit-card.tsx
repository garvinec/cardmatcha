import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Gift } from "lucide-react";
import Link from "next/link";

interface CreditCardType {
  id: number;
  card_name: string;
  issuer: string;
  image: string;
  annual_fee: number;
  welcome_bonus: string;
  signup_requirement: string;
  rewards: string[];
  benefits: string[];
  category: string;
  rating: number;
  best_for: string;
}

interface CreditCardProps {
  card: CreditCardType;
}

export function CreditCardComponent({ card }: CreditCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-2xl transition-all duration-500 border border-matcha-muted/40 bg-offwhite/80 backdrop-blur rounded-3xl overflow-hidden group">
      <CardHeader className="pb-6 pt-8 px-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-light text-matcha-deep mb-1">
              {card.card_name}
            </h3>
            <p className="text-sm text-matcha-foreground/70 font-light">{card.issuer}</p>
          </div>
          <Badge
            variant="secondary"
            className="bg-matcha-muted/70 text-matcha-foreground border-0 rounded-full px-3 py-1 font-light"
          >
            {card.category}
          </Badge>
        </div>

        <div className="bg-gradient-to-br from-matcha-dark to-matcha rounded-2xl p-6 text-offwhite relative overflow-hidden shadow-lg">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-offwhite/20 rounded-full blur-2xl"></div>
          <div className="relative z-10 mt-8">
            <p className="text-xs opacity-75 mb-1 font-light">Annual Fee</p>
            <p className="text-2xl font-light">
              {card.annual_fee === 0 ? "No Fee" : `$${card.annual_fee}`}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col px-8 pb-8">
        {/* Rating */}
        <div className="flex items-center mb-6 text-matcha-foreground">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-2 text-base font-light">{card.rating}</span>
          </div>
          <span className="ml-3 text-xs text-matcha-foreground/60 font-light">
            Expert Rating
          </span>
        </div>

        {/* Signup Bonus */}
        <div className="bg-matcha-muted/40 rounded-2xl p-5 mb-6 border border-matcha-muted/60">
          <div className="flex items-center mb-2">
            <Gift className="h-4 w-4 text-matcha-dark mr-2" />
            <span className="text-sm font-light text-matcha-deep">
              Welcome Bonus
            </span>
          </div>
          <p className="text-base text-matcha-dark font-normal mb-1">
            {card.welcome_bonus}
          </p>
          <p className="text-xs text-matcha-foreground/70 font-light">
            {card.signup_requirement}
          </p>
        </div>

        {/* Best For */}
        <div className="mb-8">
          <p className="text-xs text-matcha-foreground/60 mb-2 font-light">Best for</p>
          <p className="text-sm text-matcha-foreground font-light leading-relaxed">
            {card.best_for}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <Button
            className="w-full bg-matcha text-matcha-foreground hover:bg-matcha-dark/80 rounded-full py-6 font-light text-base shadow-lg hover:shadow-xl transition-all duration-300"
            asChild
          >
            <Link href={`/card/${card.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

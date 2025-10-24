"use client";

import type { UserCardWithDetails } from "@/lib/actions/profile.actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

type MyCardsSectionProps = {
  cards: UserCardWithDetails[];
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
  onAddCardClick: () => void;
  onRemoveCardClick: (card: UserCardWithDetails) => void;
};

const formatAnnualFee = (annualFee: number | null | undefined) => {
  const normalized =
    typeof annualFee === "number" && Number.isFinite(annualFee) ? annualFee : 0;
  return normalized === 0 ? "No Fee" : `$${normalized}`;
};

const formatAddedDate = (createdAt?: string | null) => {
  if (!createdAt) {
    return "Recently added";
  }

  const parsed = new Date(createdAt);
  if (Number.isNaN(parsed.getTime())) {
    return "Recently added";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(parsed);
};

export function MyCardsSection({
  cards,
  isLoading,
  error,
  onRetry,
  onAddCardClick,
  onRemoveCardClick,
}: MyCardsSectionProps) {
  return (
    <Card className="border-0 shadow-xl rounded-3xl bg-matcha-50/80 backdrop-blur overflow-hidden">
      <CardHeader className="p-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-light text-gray-900">
            My Cards <span className="text-matcha-700">({cards.length})</span>
          </CardTitle>
          <Button
            onClick={onAddCardClick}
            className="bg-matcha-700 hover:bg-matcha-800 text-white rounded-full px-6 py-5 font-light shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Card
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <div className="h-12 w-12 rounded-full border-2 border-matcha-300 border-t-matcha-700 animate-spin" />
          </div>
        ) : error ? (
          <div className="py-16 text-center space-y-4">
            <p className="text-sm text-red-600 font-light">{error}</p>
            {onRetry && (
              <Button
                variant="outline"
                onClick={onRetry}
                className="rounded-full px-6 py-5 font-light"
              >
                Try again
              </Button>
            )}
          </div>
        ) : cards.length === 0 ? (
          <div className="py-16 text-center text-matcha-800/80 font-light">
            You haven&apos;t added any cards yet. Add your first card to get
            personalized insights.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((entry) => {
              const card = entry.card;
              const cardName = card?.card_name ?? "Unknown card";
              const issuer = card?.issuer ?? "Issuer unavailable";
              const category = card?.category ?? "General";
              const rawAnnualFee = card?.annual_fee;
              const annualFeeValue =
                typeof rawAnnualFee === "number"
                  ? rawAnnualFee
                  : rawAnnualFee
                  ? Number.parseFloat(String(rawAnnualFee))
                  : 0;
              const annualFee = formatAnnualFee(annualFeeValue);

              return (
                <div
                  key={card?.id}
                  className="border border-matcha-200/50 rounded-2xl p-6 bg-gradient-to-br from-matcha-50 to-matcha-100/30 relative shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => onRemoveCardClick(entry)}
                      className="p-2 hover:bg-matcha-100/60 rounded-full transition-all duration-300"
                      aria-label={`Remove ${cardName}`}
                    >
                      <Trash2 className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>

                  <div className="flex justify-between items-start mb-4 pr-8">
                    <div>
                      <h3 className="font-normal text-gray-900 mb-1">
                        {cardName}
                      </h3>
                      <p className="text-sm text-gray-500 font-light">
                        {issuer}
                      </p>
                    </div>
                    {category && (
                      <Badge
                        variant="outline"
                        className="border-matcha-300/50 text-matcha-800 rounded-full px-3 py-1 font-light bg-matcha-50"
                      >
                        {category}
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-light">
                        Annual Fee
                      </span>
                      <span className="font-normal">{annualFee}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

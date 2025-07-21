"use client";

import { useState } from "react";
import {
  useCards,
  useCard,
  useSearchCards,
  useTopCards,
  useApiCall,
} from "@/hooks/use-api";
import { cardApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, Star, CreditCard } from "lucide-react";

export function ApiExample() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCardId, setSelectedCardId] = useState<string>("");

  // Using the custom hooks
  const {
    data: cardsData,
    loading: cardsLoading,
    error: cardsError,
  } = useCards(1, 5);
  const { data: topCardsData, loading: topCardsLoading } = useTopCards();
  const { data: searchData, loading: searchLoading } =
    useSearchCards(searchQuery);
  const { data: selectedCard, loading: cardLoading } = useCard(selectedCardId);

  // Using the manual API call hook
  const {
    execute: manualCall,
    loading: manualLoading,
    error: manualError,
  } = useApiCall();

  const handleManualSearch = async () => {
    if (searchQuery.trim()) {
      const result = await manualCall(() => cardApi.searchCards(searchQuery));
      console.log("Manual search result:", result);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            API Integration Examples
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Search Cards</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Search for credit cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleManualSearch} disabled={manualLoading}>
                {manualLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                Manual Search
              </Button>
            </div>
            {manualError && (
              <p className="text-red-500 text-sm">{manualError}</p>
            )}
          </div>

          {/* All Cards Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">All Cards (Paginated)</h3>
            {cardsLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading cards...
              </div>
            ) : cardsError ? (
              <p className="text-red-500">{cardsError}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cardsData?.data.map((card) => (
                  <Card
                    key={card.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedCardId(card.id)}
                  >
                    <CardContent className="p-4">
                      <h4 className="font-semibold">{card.name}</h4>
                      <p className="text-sm text-gray-600">{card.issuer}</p>
                      <div className="flex gap-1 mt-2">
                        {card.categories.map((category) => (
                          <Badge
                            key={category}
                            variant="secondary"
                            className="text-xs"
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm mt-2">
                        Annual Fee: ${card.annual_fee}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Top Cards Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Top Rated Cards
            </h3>
            {topCardsLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading top cards...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topCardsData?.data.slice(0, 3).map((card) => (
                  <Card
                    key={card.id}
                    className="border-yellow-200 bg-yellow-50"
                  >
                    <CardContent className="p-4">
                      <h4 className="font-semibold">{card.name}</h4>
                      <p className="text-sm text-gray-600">{card.issuer}</p>
                      <p className="text-sm mt-2">
                        Rewards: {card.rewards_rate}% {card.rewards_type}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Search Results Section */}
          {searchQuery && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Search Results</h3>
              {searchLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Searching...
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchData?.data.map((card) => (
                    <Card key={card.id} className="border-blue-200 bg-blue-50">
                      <CardContent className="p-4">
                        <h4 className="font-semibold">{card.name}</h4>
                        <p className="text-sm text-gray-600">{card.issuer}</p>
                        <p className="text-sm mt-2">
                          APR: {card.apr_range.min}% - {card.apr_range.max}%
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Selected Card Details */}
          {selectedCardId && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Selected Card Details</h3>
              {cardLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading card details...
                </div>
              ) : selectedCard?.data ? (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-lg">
                      {selectedCard.data.name}
                    </h4>
                    <p className="text-gray-600">{selectedCard.data.issuer}</p>
                    <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                      <div>
                        <p>
                          <strong>Annual Fee:</strong> $
                          {selectedCard.data.annual_fee}
                        </p>
                        <p>
                          <strong>APR Range:</strong>{" "}
                          {selectedCard.data.apr_range.min}% -{" "}
                          {selectedCard.data.apr_range.max}%
                        </p>
                        <p>
                          <strong>Rewards:</strong>{" "}
                          {selectedCard.data.rewards_rate}%{" "}
                          {selectedCard.data.rewards_type}
                        </p>
                      </div>
                      <div>
                        <p>
                          <strong>Credit Score:</strong>{" "}
                          {selectedCard.data.credit_score_required}
                        </p>
                        <p>
                          <strong>Foreign Fee:</strong>{" "}
                          {selectedCard.data.foreign_transaction_fee}%
                        </p>
                        <p>
                          <strong>Balance Transfer:</strong>{" "}
                          {selectedCard.data.balance_transfer_fee}%
                        </p>
                      </div>
                    </div>
                    {selectedCard.data.signup_bonus && (
                      <div className="mt-4 p-3 bg-yellow-100 rounded">
                        <p className="font-semibold">Signup Bonus</p>
                        <p>
                          ${selectedCard.data.signup_bonus.amount} after{" "}
                          {selectedCard.data.signup_bonus.requirement}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <p className="text-red-500">Card not found</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

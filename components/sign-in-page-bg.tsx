"use client";
import { Trophy, Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock user data
const userData = {
  currentCards: [
    {
      id: 1,
      name: "Chase Sapphire Preferred",
      issuer: "Chase",
      since: "Jan 2023",
      annualFee: 95,
      primaryCategory: "Travel",
      monthlySpend: 1200,
      rewardsEarned: "24,500 points",
    },
    {
      id: 2,
      name: "Citi Double Cash",
      issuer: "Citi",
      since: "Mar 2022",
      annualFee: 0,
      primaryCategory: "Cash Back",
      monthlySpend: 800,
      rewardsEarned: "$156 cash back",
    },
    {
      id: 3,
      name: "American Express Gold",
      issuer: "American Express",
      since: "Jun 2023",
      annualFee: 250,
      primaryCategory: "Dining",
      monthlySpend: 600,
      rewardsEarned: "18,200 points",
    },
  ],
  bestCards: {
    "Grocery stores": {
      card: "American Express Gold",
      reason: "4x points at U.S. supermarkets (up to $25k/year)",
    },
    "Gas & fuel": {
      card: "None",
      reason: "Consider adding a gas-specific rewards card",
    },
    "Restaurants & dining": {
      card: "American Express Gold",
      reason: "4x points at restaurants worldwide",
    },
    "Travel & hotels": {
      card: "Chase Sapphire Preferred",
      reason: "2x points on travel, 25% bonus on redemptions",
    },
    "Online shopping": {
      card: "Chase Freedom Unlimited",
      reason: "1.5% cash back on all purchases including online",
    },
    "Everything else": {
      card: "Citi Double Cash",
      reason: "2% on all purchases with no categories",
    },
  },
  recommendedActions: [
    "Consider adding a gas rewards card for 3x-4x earnings",
    "Your Amex Gold dining credits expire in 2 months",
    "Chase Sapphire travel credit available: $50 remaining",
  ],
};

export default function SignInPageBg() {
  const ProfileContent = () => (
    <>
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: hsl(var(--matcha-600));
          cursor: pointer;
          box-shadow: 0 2px 8px hsl(var(--matcha-600) / 0.3);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: hsl(var(--matcha-600));
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px hsl(var(--matcha-600) / 0.3);
        }
      `}</style>

      {/* Main Content */}
      <main className="pt-48 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-light text-matcha-900 mb-4 tracking-tight">
              Your Profile
            </h1>
            <p className="text-lg text-matcha-800/80 font-light">
              Manage your cards and optimize your rewards
            </p>
          </div>

          {/* Current Credit Cards */}
          <Card className="border-0 shadow-xl rounded-3xl bg-matcha-50/80 backdrop-blur overflow-hidden">
            <CardHeader className="p-8">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-light text-gray-900">
                  My Cards{" "}
                  <span className="text-matcha-700">
                    ({userData.currentCards.length})
                  </span>
                </CardTitle>
                <Button className="bg-matcha-700 hover:bg-matcha-800 text-white rounded-full px-6 py-5 font-light shadow-lg hover:shadow-xl transition-all duration-300">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Card
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userData.currentCards.map((card) => (
                  <div
                    key={card.id}
                    className="border border-matcha-200/50 rounded-2xl p-6 bg-gradient-to-br from-matcha-50 to-matcha-100/30 relative shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="absolute top-4 right-4">
                      <button className="p-2 hover:bg-matcha-100/60 rounded-full transition-all duration-300">
                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                      </button>

                      <div className="absolute right-0 top-10 bg-matcha-50 border border-matcha-200/50 rounded-2xl shadow-xl py-2 z-10 min-w-[130px]">
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-matcha-50 flex items-center font-light transition-colors duration-300">
                          <Edit className="mr-2 h-3 w-3" />
                          Edit
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center font-light transition-colors duration-300">
                          <Trash2 className="mr-2 h-3 w-3" />
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-start mb-4 pr-8">
                      <div>
                        <h3 className="font-normal text-gray-900 mb-1">
                          {card.name}
                        </h3>
                        <p className="text-sm text-gray-500 font-light">
                          {card.issuer}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-matcha-300/50 text-matcha-800 rounded-full px-3 py-1 font-light bg-matcha-50"
                      >
                        {card.primaryCategory}
                      </Badge>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-light">Since</span>
                        <span className="font-normal">{card.since}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-light">
                          Annual Fee
                        </span>
                        <span className="font-normal">
                          {card.annualFee === 0
                            ? "No Fee"
                            : `$${card.annualFee}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-light">
                          Monthly Spend
                        </span>
                        <span className="font-normal">
                          ${card.monthlySpend}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-light">
                          Rewards Earned
                        </span>
                        <span className="font-normal text-matcha-800">
                          {card.rewardsEarned}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Best Cards by Category */}
          <Card className="border-0 shadow-xl rounded-3xl bg-matcha-50/80 backdrop-blur overflow-hidden">
            <CardHeader className="p-8">
              <CardTitle className="flex items-center text-2xl font-light text-gray-900">
                <Trophy className="mr-3 h-6 w-6 text-matcha-800" />
                Best Cards by Category
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(userData.bestCards).map(([category, info]) => (
                  <div
                    key={category}
                    className="border border-matcha-200/50 rounded-2xl p-6 bg-gradient-to-br from-matcha-50 to-matcha-100/30 shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-normal text-gray-900">{category}</h3>
                      {info.card !== "None" ? (
                        <Badge className="bg-matcha-100 text-matcha-800 border-0 rounded-full font-light">
                          Optimized
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-orange-600 border-orange-300/50 rounded-full font-light bg-orange-50"
                        >
                          Gap
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm font-normal text-matcha-800 mb-2">
                      {info.card}
                    </p>
                    <p className="text-xs text-gray-600 font-light leading-relaxed">
                      {info.reason}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );

  return <ProfileContent />;
}

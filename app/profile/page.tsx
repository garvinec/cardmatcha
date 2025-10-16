"use client";
import { Header } from "@/components/header";
import {
  Trophy,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  X,
  Search,
  Calculator,
  Minus,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";

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

// Mock credit card database for search
const availableCards = [
  {
    id: 101,
    name: "Chase Sapphire Reserve",
    issuer: "Chase",
    category: "Premium Travel",
  },
  {
    id: 102,
    name: "Chase Freedom Unlimited",
    issuer: "Chase",
    category: "Cash Back",
  },
  {
    id: 103,
    name: "Chase Freedom Flex",
    issuer: "Chase",
    category: "Rotating Categories",
  },
  {
    id: 104,
    name: "Capital One Venture X",
    issuer: "Capital One",
    category: "Premium Travel",
  },
  {
    id: 105,
    name: "Capital One Venture",
    issuer: "Capital One",
    category: "Travel",
  },
  {
    id: 106,
    name: "Capital One Savor",
    issuer: "Capital One",
    category: "Dining",
  },
];

export default function ProfilePage() {
  const [currentCards, setCurrentCards] = useState(userData.currentCards);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCards, setFilteredCards] = useState<typeof availableCards>([]);
  const [activeCardMenu, setActiveCardMenu] = useState<number | null>(null);

  const [spendingCategories, setSpendingCategories] = useState([
    { id: 1, name: "Grocery stores", rewardRate: "4%", amount: 800 },
    { id: 2, name: "Gas & fuel", rewardRate: "3%", amount: 300 },
    { id: 3, name: "Restaurants & dining", rewardRate: "4%", amount: 400 },
    { id: 4, name: "Travel & hotels", rewardRate: "2%", amount: 200 },
    { id: 5, name: "Online shopping", rewardRate: "2%", amount: 150 },
    { id: 6, name: "Everything else", rewardRate: "1%", amount: 300 },
  ]);

  const updateSpending = (categoryId: number, newAmount: number) => {
    setSpendingCategories((categories) =>
      categories.map((cat) =>
        cat.id === categoryId ? { ...cat, amount: newAmount } : cat
      )
    );
  };

  const totalEstimatedRewards = spendingCategories
    .reduce((total, category) => {
      const rate =
        Number.parseFloat(category.rewardRate.replace("%", "")) / 100;
      return total + category.amount * rate;
    }, 0)
    .toFixed(0);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      const filtered = availableCards.filter(
        (card) =>
          card.name.toLowerCase().includes(value.toLowerCase()) ||
          card.issuer.toLowerCase().includes(value.toLowerCase()) ||
          card.category.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCards(filtered.slice(0, 5));
    } else {
      setFilteredCards([]);
    }
  };

  const addCard = (card: (typeof availableCards)[0]) => {
    const newCard = {
      id: Date.now(),
      name: card.name,
      issuer: card.issuer,
      since: new Date().toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      annualFee: 0,
      primaryCategory: card.category,
      monthlySpend: 0,
      rewardsEarned: "0 points",
    };
    setCurrentCards([...currentCards, newCard]);
    setShowAddModal(false);
    setSearchQuery("");
    setFilteredCards([]);
  };

  const deleteCard = (cardId: number) => {
    setCurrentCards(currentCards.filter((card) => card.id !== cardId));
    setActiveCardMenu(null);
  };

  const editCard = (cardId: number) => {
    setActiveCardMenu(null);
    console.log("Edit card:", cardId);
  };

  const ProfileContent = ({ muted = false }: { muted?: boolean }) => (
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
                    ({currentCards.length})
                  </span>
                </CardTitle>
                <Button
                  onClick={() => setShowAddModal(true)}
                  className="bg-matcha-700 hover:bg-matcha-800 text-white rounded-full px-6 py-5 font-light shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Card
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCards.map((card) => (
                  <div
                    key={card.id}
                    className="border border-matcha-200/50 rounded-2xl p-6 bg-gradient-to-br from-matcha-50 to-matcha-100/30 relative shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={() =>
                          setActiveCardMenu(
                            activeCardMenu === card.id ? null : card.id
                          )
                        }
                        className="p-2 hover:bg-matcha-100/60 rounded-full transition-all duration-300"
                      >
                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                      </button>

                      {activeCardMenu === card.id && (
                        <div className="absolute right-0 top-10 bg-matcha-50 border border-matcha-200/50 rounded-2xl shadow-xl py-2 z-10 min-w-[130px]">
                          <button
                            onClick={() => editCard(card.id)}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-matcha-50 flex items-center font-light transition-colors duration-300"
                          >
                            <Edit className="mr-2 h-3 w-3" />
                            Edit
                          </button>
                          <button
                            onClick={() => deleteCard(card.id)}
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center font-light transition-colors duration-300"
                          >
                            <Trash2 className="mr-2 h-3 w-3" />
                            Delete
                          </button>
                        </div>
                      )}
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

          {/* Estimated Savings */}
          <Card className="border-0 shadow-xl rounded-3xl bg-matcha-50/80 backdrop-blur overflow-hidden">
            <CardHeader className="p-8">
              <CardTitle className="flex items-center text-2xl font-light text-gray-900">
                <Calculator className="mr-3 h-6 w-6 text-matcha-800" />
                Estimated Monthly Rewards
              </CardTitle>
              <p className="text-sm text-gray-600 font-light mt-2">
                Customize your monthly spending to see potential rewards
              </p>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="space-y-8">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-sm font-light text-gray-600">
                    Category
                  </span>
                  <span className="text-sm font-light text-gray-600">
                    Monthly amount
                  </span>
                </div>

                <div className="space-y-6">
                  {spendingCategories.map((category) => (
                    <div key={category.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-matcha-800 font-light mb-1">
                            Earn {category.rewardRate}
                          </p>
                          <p className="text-sm font-normal text-gray-900">
                            {category.name}
                          </p>
                        </div>
                        <div className="text-xl font-light text-matcha-800">
                          ${category.amount}
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() =>
                            updateSpending(
                              category.id,
                              Math.max(0, category.amount - 50)
                            )
                          }
                          className="w-9 h-9 rounded-full border-2 border-matcha-600/50 flex items-center justify-center hover:bg-matcha-50 transition-all duration-300 shadow-sm"
                        >
                          <Minus className="h-4 w-4 text-matcha-700" />
                        </button>

                        <div className="flex-1 relative">
                          <input
                            type="range"
                            min="0"
                            max="2000"
                            step="50"
                            value={category.amount}
                            onChange={(e) =>
                              updateSpending(
                                category.id,
                                Number.parseInt(e.target.value)
                              )
                            }
                            className="w-full h-2 bg-matcha-200/50 rounded-full appearance-none cursor-pointer slider"
                            style={{
                              background: `linear-gradient(to right, hsl(var(--matcha-600)) 0%, hsl(var(--matcha-600)) ${
                                (category.amount / 2000) * 100
                              }%, hsl(var(--matcha-200)) ${
                                (category.amount / 2000) * 100
                              }%, hsl(var(--matcha-200)) 100%)`,
                            }}
                          />
                        </div>

                        <button
                          onClick={() =>
                            updateSpending(
                              category.id,
                              Math.min(2000, category.amount + 50)
                            )
                          }
                          className="w-9 h-9 rounded-full border-2 border-matcha-600/50 flex items-center justify-center hover:bg-matcha-50 transition-all duration-300 shadow-sm"
                        >
                          <Plus className="h-4 w-4 text-matcha-700" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-matcha-700 to-matcha-600 text-white rounded-2xl p-6 text-center shadow-lg">
                  <p className="text-sm font-light mb-1 opacity-90">
                    Estimated monthly rewards
                  </p>
                  <p className="text-3xl font-light">
                    ${totalEstimatedRewards}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Actions */}
          <Card className="border-0 shadow-xl rounded-3xl bg-matcha-50/80 backdrop-blur overflow-hidden">
            <CardHeader className="p-8">
              <CardTitle className="text-2xl font-light text-gray-900">
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="space-y-4">
                {userData.recommendedActions.map((action, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-5 bg-gradient-to-r from-matcha-50/50 to-matcha-100/50 rounded-2xl border border-matcha-200/50"
                  >
                    <div className="w-2 h-2 bg-matcha-700 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700 font-light leading-relaxed">
                      {action}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Add Card Modal */}
      {!muted && showAddModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-matcha-50 rounded-3xl shadow-2xl w-full max-w-md">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-light text-gray-900">
                  Add Credit Card
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setSearchQuery("");
                    setFilteredCards([]);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search for credit cards..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-11 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-matcha-500/20 font-light"
                    autoFocus
                  />
                </div>

                {filteredCards.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-matcha-50 border border-gray-200 rounded-2xl shadow-xl z-10 max-h-60 overflow-y-auto">
                    {filteredCards.map((card) => (
                      <button
                        key={card.id}
                        onClick={() => addCard(card)}
                        className="w-full px-5 py-4 text-left hover:bg-matcha-50 border-b border-gray-100 last:border-b-0 transition-colors duration-300"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-normal text-gray-900">
                              {card.name}
                            </p>
                            <p className="text-sm text-gray-600 font-light">
                              {card.issuer}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-xs font-light"
                          >
                            {card.category}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {searchQuery && filteredCards.length === 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-matcha-50 border border-gray-200 rounded-2xl shadow-xl p-5 text-center text-gray-500 text-sm font-light">
                    No cards found matching "{searchQuery}"
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddModal(false);
                    setSearchQuery("");
                    setFilteredCards([]);
                  }}
                  className="rounded-full px-6 py-5 font-light"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!muted && activeCardMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setActiveCardMenu(null)}
        />
      )}
    </>
  );

  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-gradient-to-b from-matcha-50/30 via-white to-matcha-50/20 flex flex-col">
          <Header currentPage="profile" />
          <div className="flex-1">
            <ProfileContent />
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="relative min-h-screen bg-gradient-to-b from-matcha-50/30 via-white to-matcha-50/20 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 select-none opacity-40 blur-sm">
            <div className="h-full overflow-hidden">
              <ProfileContent muted />
            </div>
          </div>
          <Header currentPage="profile" />
          <div className="relative z-10 flex min-h-screen flex-col">
            <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-white/70 px-6 pb-16 pt-40 text-center backdrop-blur-sm">
              <div className="max-w-xl space-y-4">
                <h1 className="text-3xl font-semibold text-matcha-900 sm:text-4xl">
                  Sign In to Maximize CardMatcha!
                </h1>
                <p className="text-base text-matcha-900/80">
                  You're getting a preview of the insights waiting once you sign
                  in. Bring your personalized dashboard to life with a secure
                  account.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  variant="secondary"
                  className="rounded-full px-8 py-5 text-base font-medium text-matcha-900 shadow-sm transition-colors duration-300 hover:bg-[#ede8de] hover:text-matcha-900"
                >
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="rounded-full px-8 py-5 text-base font-medium bg-matcha-600 text-white shadow-sm transition-colors duration-300 hover:bg-matcha-700"
                >
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SignedOut>
    </>
  );
}

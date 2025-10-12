"use client";

import { use, useEffect, useState } from "react";

import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Star,
  DollarSign,
  Gift,
  Shield,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCardById } from "@/lib/actions/card.actions";

// Extended credit card data
const creditCardsData = {
  1: {
    id: 1,
    name: "Chase Sapphire Preferred",
    issuer: "Chase",
    image: "/placeholder.svg?height=300&width=480",
    annualFee: 95,
    signupBonus: "60,000 points",
    signupRequirement: "$4,000 in 3 months",
    rewards: [
      "2x points on travel and dining",
      "1x points on all other purchases",
      "25% more value when redeeming for travel through Chase Ultimate Rewards",
    ],
    benefits: [
      "No foreign transaction fees",
      "Trip cancellation/interruption insurance",
      "Baggage delay insurance",
      "Primary rental car coverage",
      "Purchase protection",
      "Extended warranty protection",
    ],
    category: "Travel",
    rating: 4.8,
    bestFor: "Travel enthusiasts who dine out frequently",
    creditScoreNeeded: "Good to Excellent (670+)",
    introAPR: "None",
    regularAPR: "21.49% - 28.49% Variable",
    balanceTransferAPR: "21.49% - 28.49% Variable",
    cashAdvanceAPR: "29.99% Variable",
    latePaymentFee: "Up to $40",
    foreignTransactionFee: "None",
    pros: [
      "Excellent travel and dining rewards",
      "Valuable Ultimate Rewards points",
      "Strong travel protections",
      "No foreign transaction fees",
    ],
    cons: [
      "Annual fee of $95",
      "Limited bonus categories",
      "High APR for carrying balances",
    ],
    detailedRewards: {
      Travel: "2x points",
      Dining: "2x points",
      "All other purchases": "1x points",
    },
  },
  2: {
    id: 2,
    name: "Citi Double Cash",
    issuer: "Citi",
    image: "/placeholder.svg?height=300&width=480",
    annualFee: 0,
    signupBonus: "$200 cash back",
    signupRequirement: "$1,500 in 6 months",
    rewards: [
      "2% cash back on all purchases",
      "1% when you buy, 1% when you pay",
    ],
    benefits: [
      "No annual fee",
      "No category restrictions",
      "0% intro APR for 18 months on balance transfers",
    ],
    category: "Cash Back",
    rating: 4.6,
    bestFor: "Simple cash back without category tracking",
    creditScoreNeeded: "Good to Excellent (670+)",
    introAPR: "0% for 18 months on balance transfers",
    regularAPR: "19.24% - 29.24% Variable",
    balanceTransferAPR: "19.24% - 29.24% Variable",
    cashAdvanceAPR: "29.99% Variable",
    latePaymentFee: "Up to $40",
    foreignTransactionFee: "3%",
    pros: [
      "Simple 2% cash back on everything",
      "No annual fee",
      "No rotating categories to track",
      "0% intro APR on balance transfers",
    ],
    cons: [
      "Foreign transaction fees",
      "No signup bonus for purchases",
      "Cash back earned only when you pay",
    ],
    detailedRewards: {
      "All purchases": "2% cash back (1% when you buy + 1% when you pay)",
    },
  },
  3: {
    id: 3,
    name: "American Express Gold",
    issuer: "American Express",
    image: "/placeholder.svg?height=300&width=480",
    annualFee: 250,
    signupBonus: "60,000 points",
    signupRequirement: "$4,000 in 6 months",
    rewards: [
      "4x points at restaurants worldwide",
      "4x points at U.S. supermarkets (up to $25,000/year)",
      "3x points on flights",
    ],
    benefits: [
      "$120 dining credit annually",
      "$120 Uber Cash annually",
      "No foreign transaction fees",
      "Purchase protection",
      "Extended warranty",
      "Baggage insurance plan",
    ],
    category: "Dining",
    rating: 4.7,
    bestFor: "Heavy restaurant and grocery spenders",
    creditScoreNeeded: "Good to Excellent (690+)",
    introAPR: "None",
    regularAPR: "19.49% - 26.49% Variable",
    balanceTransferAPR: "19.49% - 26.49% Variable",
    cashAdvanceAPR: "29.99% Variable",
    latePaymentFee: "Up to $40",
    foreignTransactionFee: "None",
    pros: [
      "Excellent dining and grocery rewards",
      "$240 in annual credits",
      "No foreign transaction fees",
      "Strong purchase protections",
    ],
    cons: [
      "High annual fee of $250",
      "Credits require specific spending",
      "Limited bonus categories",
    ],
    detailedRewards: {
      "Restaurants worldwide": "4x points",
      "U.S. supermarkets": "4x points (up to $25k/year)",
      Flights: "3x points",
      "All other purchases": "1x points",
    },
  },
  4: {
    id: 4,
    name: "Capital One Venture X",
    issuer: "Capital One",
    image: "/placeholder.svg?height=300&width=480",
    annualFee: 395,
    signupBonus: "75,000 miles",
    signupRequirement: "$4,000 in 3 months",
    rewards: [
      "2x miles on all purchases",
      "5x miles on hotels and rental cars (through Capital One Travel)",
      "10x miles on thousands of hotels",
    ],
    benefits: [
      "$300 annual travel credit",
      "Priority Pass Select lounge access",
      "TSA PreCheck/Global Entry credit",
      "Capital One Travel portal access",
      "Annual anniversary bonus miles",
      "Premium rental car benefits",
    ],
    category: "Premium Travel",
    rating: 4.9,
    bestFor: "Frequent travelers who want premium perks",
    creditScoreNeeded: "Excellent (750+)",
    introAPR: "None",
    regularAPR: "21.49% - 28.49% Variable",
    balanceTransferAPR: "21.49% - 28.49% Variable",
    cashAdvanceAPR: "29.99% Variable",
    latePaymentFee: "Up to $40",
    foreignTransactionFee: "None",
    pros: [
      "Premium travel benefits",
      "$300 annual travel credit effectively reduces fee",
      "Airport lounge access",
      "Strong flat-rate earning",
    ],
    cons: [
      "High annual fee of $395",
      "Requires excellent credit",
      "Benefits best for frequent travelers",
    ],
    detailedRewards: {
      "All purchases": "2x miles",
      "Hotels & rental cars (Capital One Travel)": "5x miles",
      "Thousands of hotels": "10x miles",
    },
  },
  5: {
    id: 5,
    name: "Discover it Cash Back",
    issuer: "Discover",
    image: "/placeholder.svg?height=300&width=480",
    annualFee: 0,
    signupBonus: "Cashback Match",
    signupRequirement: "All cashback earned in first year matched",
    rewards: [
      "5% cash back on rotating quarterly categories (up to $1,500)",
      "1% cash back on all other purchases",
    ],
    benefits: [
      "No annual fee",
      "Cashback Match for first year",
      "Free FICO credit score",
      "0% intro APR for 15 months",
      "No foreign transaction fees",
      "Freeze account feature",
    ],
    category: "Rotating Categories",
    rating: 4.5,
    bestFor: "Category optimization and building credit",
    creditScoreNeeded: "Good (670+)",
    introAPR: "0% for 15 months on purchases and balance transfers",
    regularAPR: "17.99% - 26.99% Variable",
    balanceTransferAPR: "17.99% - 26.99% Variable",
    cashAdvanceAPR: "29.99% Variable",
    latePaymentFee: "Up to $41",
    foreignTransactionFee: "None",
    pros: [
      "No annual fee",
      "Cashback Match doubles first year rewards",
      "5% rotating categories",
      "Great for building credit",
    ],
    cons: [
      "Must activate quarterly categories",
      "5% limited to $1,500 per quarter",
      "Not widely accepted internationally",
    ],
    detailedRewards: {
      "Rotating quarterly categories":
        "5% cash back (up to $1,500 per quarter)",
      "All other purchases": "1% cash back",
    },
  },
  6: {
    id: 6,
    name: "Chase Freedom Unlimited",
    issuer: "Chase",
    image: "/placeholder.svg?height=300&width=480",
    annualFee: 0,
    signupBonus: "$200 cash back",
    signupRequirement: "$500 in 3 months",
    rewards: [
      "1.5% cash back on all purchases",
      "5% on travel through Chase Ultimate Rewards",
      "3% on dining and drugstores",
    ],
    benefits: [
      "No annual fee",
      "0% intro APR for 15 months",
      "No foreign transaction fees",
      "Cell phone protection",
      "Purchase protection",
      "Extended warranty",
    ],
    category: "Flat Rate",
    rating: 4.4,
    bestFor: "Simple earning with Chase ecosystem benefits",
    creditScoreNeeded: "Good (670+)",
    introAPR: "0% for 15 months on purchases and balance transfers",
    regularAPR: "19.74% - 28.49% Variable",
    balanceTransferAPR: "19.74% - 28.49% Variable",
    cashAdvanceAPR: "29.99% Variable",
    latePaymentFee: "Up to $40",
    foreignTransactionFee: "None",
    pros: [
      "No annual fee",
      "Simple flat-rate earning",
      "Integrates with Chase Ultimate Rewards",
      "Good intro APR period",
    ],
    cons: [
      "Lower earning rate than category cards",
      "Requires Chase ecosystem for best value",
      "Basic travel benefits",
    ],
    detailedRewards: {
      "Travel through Chase Ultimate Rewards": "5% cash back",
      "Dining and drugstores": "3% cash back",
      "All other purchases": "1.5% cash back",
    },
  },
};

interface CardPageProps {
  params: Promise<{ id: string }>;
}

export default function CardPage({ params }: CardPageProps) {
  const { id } = use(params);
  const [card, setCard] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true);
      const cardData = await getCardById(id);
      setCard(cardData || null);
      console.log(cardData);
      setIsLoading(false);
    };
    fetchCards();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50/30 via-white to-lime-50/20">
        <Header />
        <div className="flex items-center justify-center py-12">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!card) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/30 via-white to-lime-50/20">
      <Header />

      {/* Main Content */}
      <main className="pt-48 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 hover:bg-green-50 rounded-full px-6 transition-all duration-300"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Cards
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Card Image and Basic Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Card Image */}
              <Card className="border-0 shadow-xl rounded-3xl bg-white/80 backdrop-blur overflow-hidden">
                <CardContent className="p-8">
                  <img
                    src={card.image || "/placeholder.svg"}
                    alt={card.name}
                    className="w-full rounded-2xl shadow-lg"
                  />
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-0 shadow-xl rounded-3xl bg-white/80 backdrop-blur overflow-hidden">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-light text-gray-900">
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-6 pb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-light">Rating</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-normal">{card.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-light">Annual Fee</span>
                    <span className="font-normal">
                      {card.annual_fee === 0 ? "No Fee" : `$${card.annual_fee}`}
                    </span>
                  </div>
                  {/* <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-light">
                      Credit Score
                    </span>
                    <span className="font-normal text-sm">
                      {card.creditScoreNeeded}
                    </span>
                  </div> */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-light">Category</span>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 border-0 rounded-full font-light"
                    >
                      {card.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Apply Button */}
              <Button className="w-full bg-green-800 hover:bg-green-900 text-white py-6 rounded-full font-light text-base shadow-lg hover:shadow-xl transition-all duration-300">
                Apply Now
              </Button>
            </div>

            {/* Right Column - Detailed Information */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="text-4xl font-light text-gray-900 mb-3 tracking-tight">
                  {card.card_name}
                </h1>
                <p className="text-lg text-gray-600 mb-4 font-light">
                  {card.issuer}
                </p>
                <p className="text-gray-700 font-light leading-relaxed">
                  {card.best_for}
                </p>
              </div>

              <Card className="border-0 shadow-xl rounded-3xl bg-white/80 backdrop-blur overflow-hidden">
                <CardHeader className="p-6">
                  <CardTitle className="flex items-center text-green-800 font-light text-xl">
                    <Gift className="mr-3 h-5 w-5" />
                    Welcome Bonus
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="bg-gradient-to-r from-green-50 to-lime-50 border border-green-200/50 rounded-2xl p-6">
                    <p className="text-lg font-normal text-green-800 mb-2">
                      {card.welcome_bonus}
                    </p>
                    <p className="text-sm text-green-700/80 font-light">
                      After spending {card.signup_requirement}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Rewards Structure */}
              <Card className="border-0 shadow-xl rounded-3xl bg-white/80 backdrop-blur overflow-hidden">
                <CardHeader className="p-6">
                  <CardTitle className="flex items-center font-light text-xl">
                    <DollarSign className="mr-3 h-5 w-5 text-green-800" />
                    Rewards Structure
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="space-y-3">
                    {card.card_rewards?.length ? (
                      card.card_rewards.map((reward: any) => {
                        const categoryName =
                          reward?.reward_categories?.category_name ||
                          reward?.category?.category_name ||
                          reward?.category_name ||
                          "All other purchases";

                        const rewardRate = (() => {
                          const rate = reward?.reward_rate;
                          if (rate === null || rate === undefined || rate === "") {
                            return "Details coming soon";
                          }

                          const numericRate = Number(rate);
                          if (Number.isFinite(numericRate)) {
                            return `${numericRate}x`;
                          }

                          return `${rate}`;
                        })();

                        return (
                          <div
                            key={reward.id || categoryName}
                            className="flex items-center justify-between rounded-2xl border border-green-100/50 bg-gradient-to-r from-green-50/50 to-lime-50/50 p-4"
                          >
                            <span className="font-light text-gray-900">
                              {categoryName}
                            </span>
                            <span className="font-medium text-green-800">
                              {rewardRate}
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-4 bg-white/60 rounded-2xl border border-green-100 text-sm text-gray-600 font-light">
                        Reward details will be available soon.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl rounded-3xl bg-white/80 backdrop-blur overflow-hidden">
                <CardHeader className="p-6">
                  <CardTitle className="flex items-center font-light text-xl">
                    <Shield className="mr-3 h-5 w-5 text-green-800" />
                    Key Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  {card.card_benefits?.length ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {card.card_benefits.map((benefit: any) => (
                        <div
                          key={benefit.id || benefit.description}
                          className="flex items-start space-x-3"
                        >
                          <CheckCircle className="h-4 w-4 text-green-700 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700 font-light leading-relaxed">
                            {benefit.description || "Benefit details coming soon"}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-white/60 rounded-2xl border border-green-100 text-sm text-gray-600 font-light">
                      Benefit details will be available soon.
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-xl rounded-3xl bg-white/80 backdrop-blur overflow-hidden">
                  <CardHeader className="p-6">
                    <CardTitle className="flex items-center text-green-800 font-light text-lg">
                      <CheckCircle className="mr-3 h-5 w-5" />
                      Pros
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <ul className="space-y-3">
                      {card.pros.map((pro: string, index: number) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-green-700 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700 font-light leading-relaxed">
                            {pro}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl rounded-3xl bg-white/80 backdrop-blur overflow-hidden">
                  <CardHeader className="p-6">
                    <CardTitle className="flex items-center text-red-700 font-light text-lg">
                      <XCircle className="mr-3 h-5 w-5" />
                      Cons
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <ul className="space-y-3">
                      {card.cons.map((con: string, index: number) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700 font-light leading-relaxed">
                            {con}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* <Card className="border-0 shadow-xl rounded-3xl bg-white/80 backdrop-blur overflow-hidden">
                <CardHeader className="p-6">
                  <CardTitle className="flex items-center font-light text-xl">
                    <AlertCircle className="mr-3 h-5 w-5 text-green-800" />
                    Rates & Fees
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-light text-gray-500 mb-1">
                          Regular APR
                        </p>
                        <p className="text-sm text-gray-800 font-normal">
                          {card.regularAPR}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-light text-gray-500 mb-1">
                          Intro APR
                        </p>
                        <p className="text-sm text-gray-800 font-normal">
                          {card.introAPR}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-light text-gray-500 mb-1">
                          Balance Transfer APR
                        </p>
                        <p className="text-sm text-gray-800 font-normal">
                          {card.balanceTransferAPR}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-light text-gray-500 mb-1">
                          Cash Advance APR
                        </p>
                        <p className="text-sm text-gray-800 font-normal">
                          {card.cashAdvanceAPR}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-light text-gray-500 mb-1">
                          Late Payment Fee
                        </p>
                        <p className="text-sm text-gray-800 font-normal">
                          {card.latePaymentFee}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-light text-gray-500 mb-1">
                          Foreign Transaction Fee
                        </p>
                        <p className="text-sm text-gray-800 font-normal">
                          {card.foreignTransactionFee}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

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
  // Add more cards as needed
};

interface CardPageProps {
  params: Promise<{ id: string }>;
}

export default async function CardPage({ params }: CardPageProps) {
  const { id } = await params;
  const card = await getCardById(id);

  if (!card) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900"
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
              <Card>
                <CardContent className="p-6">
                  <img
                    src={card.image || "/placeholder.svg"}
                    alt={card.name}
                    className="w-full rounded-lg shadow-lg"
                  />
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-semibold">{card.rating}</span>
                    </div>
                  </div> */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Annual Fee</span>
                    <span className="font-semibold">
                      {card.annual_fee === 0 ? "No Fee" : `$${card.annual_fee}`}
                    </span>
                  </div>
                  {/* <div className="flex justify-between items-center">
                    <span className="text-gray-600">Credit Score</span>
                    <span className="font-semibold text-sm">
                      {card.creditScoreNeeded}
                    </span>
                  </div> */}
                  {/* <div className="flex justify-between items-center">
                    <span className="text-gray-600">Category</span>
                    <Badge variant="secondary">{card.category}</Badge>
                  </div> */}
                </CardContent>
              </Card>

              {/* Apply Button */}
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                Apply Now
              </Button>
            </div>

            {/* Right Column - Detailed Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {card.card_name}
                </h1>
                <p className="text-lg text-gray-600 mb-4">{card.issuer}</p>
                {/* <p className="text-gray-700">{card.best_for}</p> */}
              </div>

              {/* Sign-up Bonus */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-green-700">
                    <Gift className="mr-2 h-5 w-5" />
                    Sign-up Bonus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-lg font-semibold text-green-800 mb-1">
                      {card.welcome_bonus}
                    </p>
                    {/* <p className="text-sm text-green-700">
                      After spending {card.welcome_bonus_requirement}
                    </p> */}
                  </div>
                </CardContent>
              </Card>

              {/* Rewards Structure */}
              {/* <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="mr-2 h-5 w-5" />
                    Rewards Structure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(card.detailedRewards).map(
                      ([category, rate]) => (
                        <div
                          key={category}
                          className="flex justify-between items-center p-3 bg-blue-50 rounded-lg"
                        >
                          <span className="font-medium text-gray-900">
                            {category}
                          </span>
                          <span className="font-semibold text-blue-600">
                            {rate}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card> */}

              {/* Benefits */}
              {/* <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5" />
                    Key Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {card.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card> */}

              {/* Pros and Cons */}
              {/* <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-700">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Pros
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {card.pros.map((pro, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-red-700">
                      <XCircle className="mr-2 h-5 w-5" />
                      Cons
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {card.cons.map((con, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div> */}

              {/* Rates and Fees */}
              {/* <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="mr-2 h-5 w-5" />
                    Rates & Fees
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Regular APR
                        </p>
                        <p className="text-sm text-gray-600">
                          {card.regularAPR}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Intro APR
                        </p>
                        <p className="text-sm text-gray-600">{card.introAPR}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Balance Transfer APR
                        </p>
                        <p className="text-sm text-gray-600">
                          {card.balanceTransferAPR}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Cash Advance APR
                        </p>
                        <p className="text-sm text-gray-600">
                          {card.cashAdvanceAPR}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Late Payment Fee
                        </p>
                        <p className="text-sm text-gray-600">
                          {card.latePaymentFee}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Foreign Transaction Fee
                        </p>
                        <p className="text-sm text-gray-600">
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

import { Header } from "@/components/header";
import { CreditCardComponent } from "@/components/credit-card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data - in a real app, this would come from a database
const categoryData = {
  travel: {
    name: "Travel Rewards",
    description:
      "Earn points and miles on travel purchases, with bonus rewards for flights, hotels, and travel-related expenses.",
    icon: "✈️",
    cards: [1, 4], // Card IDs that belong to this category
  },
  cashback: {
    name: "Cash Back",
    description:
      "Simple cash rewards on everyday spending with no complicated point systems or redemption requirements.",
    icon: "💰",
    cards: [2, 6],
  },
  dining: {
    name: "Dining & Food",
    description:
      "Maximum rewards at restaurants, food delivery, and dining experiences worldwide.",
    icon: "🍽️",
    cards: [3],
  },
  gas: {
    name: "Gas & Fuel",
    description:
      "Save money at gas stations and fuel purchases with specialized rewards programs.",
    icon: "⛽",
    cards: [],
  },
  groceries: {
    name: "Groceries",
    description:
      "Earn more on supermarket and grocery shopping with enhanced reward rates.",
    icon: "🛒",
    cards: [3],
  },
  business: {
    name: "Business Cards",
    description:
      "Designed for business owners and entrepreneurs with expense management tools and business rewards.",
    icon: "💼",
    cards: [],
  },
  student: {
    name: "Student Cards",
    description:
      "Perfect for building credit as a student with lower requirements and educational resources.",
    icon: "🎓",
    cards: [],
  },
  "no-fee": {
    name: "No Annual Fee",
    description:
      "Great rewards without the annual cost, perfect for those who want benefits without fees.",
    icon: "🆓",
    cards: [2, 6, 5],
  },
  premium: {
    name: "Premium Cards",
    description:
      "Luxury perks and exclusive benefits including airport lounges, concierge services, and premium travel benefits.",
    icon: "👑",
    cards: [4, 3],
  },
  "balance-transfer": {
    name: "Balance Transfer",
    description:
      "0% intro APR for debt consolidation and balance transfers to help manage existing credit card debt.",
    icon: "🔄",
    cards: [2],
  },
};

// Mock credit cards data (subset for demo)
const creditCards = [
  {
    id: 1,
    name: "Chase Sapphire Preferred",
    issuer: "Chase",
    image: "/placeholder.svg?height=240&width=380",
    annualFee: 95,
    signupBonus: "60,000 points",
    signupRequirement: "$4,000 in 3 months",
    rewards: [
      "2x points on travel and dining",
      "1x points on all other purchases",
    ],
    benefits: [
      "25% more value when redeeming for travel",
      "No foreign transaction fees",
      "Trip cancellation/interruption insurance",
    ],
    category: "Travel",
    rating: 4.8,
    bestFor: "Travel enthusiasts who dine out frequently",
  },
  {
    id: 2,
    name: "Citi Double Cash",
    issuer: "Citi",
    image: "/placeholder.svg?height=240&width=380",
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
      "0% intro APR for 18 months",
    ],
    category: "Cash Back",
    rating: 4.6,
    bestFor: "Simple cash back without category tracking",
  },
  {
    id: 3,
    name: "American Express Gold",
    issuer: "American Express",
    image: "/placeholder.svg?height=240&width=380",
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
    ],
    category: "Dining",
    rating: 4.7,
    bestFor: "Heavy restaurant and grocery spenders",
  },
  {
    id: 4,
    name: "Capital One Venture X",
    issuer: "Capital One",
    image: "/placeholder.svg?height=240&width=380",
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
    ],
    category: "Premium Travel",
    rating: 4.9,
    bestFor: "Frequent travelers who want premium perks",
  },
  {
    id: 5,
    name: "Discover it Cash Back",
    issuer: "Discover",
    image: "/placeholder.svg?height=240&width=380",
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
    ],
    category: "Rotating Categories",
    rating: 4.5,
    bestFor: "Category optimization and building credit",
  },
  {
    id: 6,
    name: "Chase Freedom Unlimited",
    issuer: "Chase",
    image: "/placeholder.svg?height=240&width=380",
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
    ],
    category: "Flat Rate",
    rating: 4.4,
    bestFor: "Simple earning with Chase ecosystem benefits",
  },
];

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categoryData[slug as keyof typeof categoryData];

  if (!category) {
    notFound();
  }

  const categoryCards = creditCards.filter((card) =>
    category.cards.includes(card.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/30 via-white to-lime-50/20">
      <Header />

      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 hover:bg-green-50 rounded-full px-6 transition-all duration-300"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Category Header */}
          <div className="text-center mb-16">
            <div className="text-7xl mb-6">{category.icon}</div>
            <h1 className="text-5xl font-light text-gray-900 mb-6 tracking-tight">
              {category.name}
            </h1>
            <p className="text-xl text-green-800/70 max-w-3xl mx-auto font-light leading-relaxed">
              {category.description}
            </p>
            <div className="mt-8">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 text-sm px-6 py-2 rounded-full border-0"
              >
                {categoryCards.length}{" "}
                {categoryCards.length === 1 ? "Card" : "Cards"} Available
              </Badge>
            </div>
          </div>

          {/* Cards Grid */}
          {categoryCards.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryCards.map((card) => (
                <CreditCardComponent key={card.id} card={card} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <div className="text-5xl">🔍</div>
              </div>
              <h3 className="text-3xl font-light text-gray-900 mb-6">
                Coming Soon
              </h3>
              <p className="text-gray-600 mb-10 font-light text-lg max-w-md mx-auto leading-relaxed">
                We're curating the best {category.name.toLowerCase()} cards for
                you.
              </p>
              <Button
                asChild
                className="bg-green-800 hover:bg-green-900 text-white rounded-full px-8 py-6 font-light shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/chat">Ask Our AI for Recommendations</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

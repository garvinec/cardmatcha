import { Header } from "@/components/header";
import { CreditCardComponent } from "@/components/credit-card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data - in a real app, this would come from a database
const issuerData: Record<
  string,
  { name: string; description: string; icon: string; cards: number[] }
> = {
  "american-express": {
    name: "American Express",
    description:
      "Premium rewards and exclusive benefits with world-class customer service and unique card perks.",
    icon: "💳",
    cards: [3], // Card IDs that belong to this issuer
  },
  barclays: {
    name: "Barclays",
    description:
      "Travel and lifestyle rewards cards with competitive benefits and flexible redemption options.",
    icon: "🏦",
    cards: [],
  },
  "bank-of-america": {
    name: "Bank of America",
    description:
      "Cash back and travel rewards with relationship banking benefits and customizable rewards.",
    icon: "🏛️",
    cards: [],
  },
  "capital-one": {
    name: "Capital One",
    description:
      "No foreign fees and flexible rewards with innovative technology and straightforward earning structures.",
    icon: "💼",
    cards: [4],
  },
  chase: {
    name: "Chase",
    description:
      "Ultimate Rewards and premium perks with extensive transfer partners and valuable redemption options.",
    icon: "🏃",
    cards: [1, 6],
  },
  citi: {
    name: "Citi",
    description:
      "ThankYou points and cash back with competitive intro offers and diverse card portfolio.",
    icon: "🌆",
    cards: [2],
  },
  discover: {
    name: "Discover",
    description:
      "Rotating categories and cash back with excellent customer service and unique cashback matching.",
    icon: "🔍",
    cards: [5],
  },
  synchrony: {
    name: "Synchrony",
    description:
      "Store cards and financing options with promotional financing and retail partnerships.",
    icon: "🔄",
    cards: [],
  },
  td: {
    name: "TD Bank",
    description:
      "Simple rewards and low fees with straightforward earning and convenient banking integration.",
    icon: "🏢",
    cards: [],
  },
  usbank: {
    name: "US Bank",
    description:
      "FlexPerks and cash back rewards with solid earning rates and practical redemption options.",
    icon: "🇺🇸",
    cards: [],
  },
  "wells-fargo": {
    name: "Wells Fargo",
    description:
      "Go Far rewards and cash back with relationship banking benefits and diverse card options.",
    icon: "🐎",
    cards: [],
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

interface IssuerPageProps {
  params: Promise<{ slug: string }>;
}

export default async function IssuerPage({ params }: IssuerPageProps) {
  const { slug } = await params;
  const issuer = issuerData[slug as keyof typeof issuerData];

  if (!issuer) {
    notFound();
  }

  const issuerCards = creditCards.filter((card) =>
    issuer.cards.includes(card.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Issuer Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">{issuer.icon}</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {issuer.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {issuer.description}
            </p>
            <div className="mt-6">
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 text-sm px-4 py-2"
              >
                {issuerCards.length}{" "}
                {issuerCards.length === 1 ? "Card" : "Cards"} Available
              </Badge>
            </div>
          </div>

          {/* Cards Grid */}
          {issuerCards.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {issuerCards.map((card) => (
                <CreditCardComponent key={card.id} card={card} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                No Cards Available Yet
              </h3>
              <p className="text-gray-600 mb-8">
                We're working on adding more {issuer.name} cards to our
                database.
              </p>
              <Button asChild>
                <Link href="/chat">Ask Our AI for Recommendations</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

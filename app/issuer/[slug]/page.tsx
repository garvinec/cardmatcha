import { Header } from "@/components/header";
import { CreditCardComponent } from "@/components/credit-card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCardsByIssuer } from "@/lib/actions/cards.actions";

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

interface IssuerPageProps {
  params: Promise<{ slug: string }>;
}

export default async function IssuerPage({ params }: IssuerPageProps) {
  const { slug } = await params;
  const { cardsByIssuer, issuerName } = await getCardsByIssuer(slug);

  if (!cardsByIssuer) {
    notFound();
  }

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
            {/* <div className="text-6xl mb-4">{issuer.icon}</div> */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {issuerName}
            </h1>
            <div className="mt-6">
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 text-sm px-4 py-2"
              >
                {cardsByIssuer.length}{" "}
                {cardsByIssuer.length === 1 ? "Card" : "Cards"} Available
              </Badge>
            </div>
          </div>

          {/* Cards Grid */}
          {cardsByIssuer.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cardsByIssuer.map((card) => (
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
                We're working on adding more {issuerName} cards to our database.
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

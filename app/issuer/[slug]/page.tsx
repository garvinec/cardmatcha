import { Header } from "@/components/header";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCardsByIssuer } from "@/lib/actions/cards.actions";
import { IssuerCardsSection } from "./issuer-cards-section";

const issuerData = {
  "american-express": {
    name: "American Express",
    description:
      "Premium rewards and exclusive benefits with world-class customer service and unique card perks.",
    icon: "💳",
  },
  barclays: {
    name: "Barclays",
    description:
      "Travel and lifestyle rewards cards with competitive benefits and flexible redemption options.",
    icon: "🏦",
  },
  "bank-of-america": {
    name: "Bank of America",
    description:
      "Cash back and travel rewards with relationship banking benefits and customizable rewards.",
    icon: "🏛️",
  },
  "capital-one": {
    name: "Capital One",
    description:
      "No foreign fees and flexible rewards with innovative technology and straightforward earning structures.",
    icon: "💼",
  },
  chase: {
    name: "Chase",
    description:
      "Ultimate Rewards and premium perks with extensive transfer partners and valuable redemption options.",
    icon: "🏃",
  },
  citi: {
    name: "Citi",
    description:
      "ThankYou points and cash back with competitive intro offers and diverse card portfolio.",
    icon: "🌆",
  },
  discover: {
    name: "Discover",
    description:
      "Rotating categories and cash back with excellent customer service and unique cashback matching.",
    icon: "🔍",
  },
  synchrony: {
    name: "Synchrony",
    description:
      "Store cards and financing options with promotional financing and retail partnerships.",
    icon: "🔄",
  },
  td: {
    name: "TD Bank",
    description:
      "Simple rewards and low fees with straightforward earning and convenient banking integration.",
    icon: "🏢",
  },
  usbank: {
    name: "US Bank",
    description:
      "FlexPerks and cash back rewards with solid earning rates and practical redemption options.",
    icon: "🇺🇸",
  },
  "wells-fargo": {
    name: "Wells Fargo",
    description:
      "Go Far rewards and cash back with relationship banking benefits and diverse card options.",
    icon: "🐎",
  },
} satisfies Record<
  string,
  {
    name: string;
    description: string;
    icon: string;
  }
>;

interface IssuerPageProps {
  params: Promise<{ slug: string }>;
}

const CARDS_PER_PAGE = 15;

export default async function IssuerPage({ params }: IssuerPageProps) {
  const { slug } = await params;
  const issuerParam = issuerData[slug as keyof typeof issuerData];

  if (!issuerParam) {
    notFound();
  }

  const { data: initialCards, totalCount, issuerName } = await getCardsByIssuer(
    slug,
    {
      pageNumber: 1,
      cardsPerPage: CARDS_PER_PAGE,
    }
  );

  if (!initialCards || initialCards.length === 0) {
    notFound();
  }

  const displayName = issuerName ?? issuerParam.name;

  return (
    <div className="min-h-screen bg-gradient-to-b from-matcha-50/40 via-matcha-100 to-matcha-200/40">
      <Header />

      <main className="py-12 px-4 sm:px-6 lg:px-8 pt-48">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 hover:bg-matcha-50 rounded-full px-6 transition-all duration-300"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="text-center mb-16">
            <div className="text-7xl mb-6">{issuerParam.icon}</div>
            <h1 className="text-5xl font-light text-gray-900 mb-6 tracking-tight">
              {displayName}
            </h1>
          </div>

          <IssuerCardsSection
            initialCards={initialCards}
            totalCount={totalCount}
            cardsPerPage={CARDS_PER_PAGE}
            issuer={{
              slug,
              name: displayName,
              description: issuerParam.description,
              icon: issuerParam.icon,
              issuerCode: slug,
            }}
          />
        </div>
      </main>
    </div>
  );
}

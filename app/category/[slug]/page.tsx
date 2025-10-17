import { Header } from "@/components/header";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCardsByCategory } from "@/lib/actions/cards.actions";
import { CategoryCardsSection } from "./category-cards-section";

const categoryData = {
  travel: {
    name: "Travel Rewards",
    description:
      "Earn points and miles on travel purchases, with bonus rewards for flights, hotels, and travel-related expenses.",
    icon: "✈️",
    category_tag: "Travel",
  },
  shopping: {
    name: "Shopping Rewards",
    description:
      "Earn points on shopping purchases, with bonus rewards for online shopping, retail stores, and department stores.",
    icon: "🛍️",
    category_tag: "Shopping",
  },
  dining: {
    name: "Dining & Food",
    description:
      "Maximum rewards at restaurants, food delivery, and dining experiences worldwide.",
    icon: "🍽️",
    category_tag: "Dining & Food Delivery",
  },
  gas: {
    name: "Gas & Fuel",
    description:
      "Save money at gas stations and fuel purchases with specialized rewards programs.",
    icon: "⛽",
    category_tag: "Gas & Transit",
  },
  groceries: {
    name: "Groceries",
    description:
      "Earn more on supermarket and grocery shopping with enhanced reward rates.",
    icon: "🛒",
    category_tag: "Groceries & Supermarkets",
  },
  entertainment: {
    name: "Entertainment Rewards",
    description:
      "Earn points on entertainment purchases, with bonus rewards for streaming services, movies, and concerts.",
    icon: "🎥",
    category_tag: "Entertainment",
  },
};

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CARDS_PER_PAGE = 15;

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryParam = categoryData[slug as keyof typeof categoryData];

  if (!categoryParam) {
    notFound();
  }

  const { data: initialCards, totalCount } = await getCardsByCategory(
    categoryParam.category_tag,
    {
      pageNumber: 1,
      cardsPerPage: CARDS_PER_PAGE,
    }
  );

  if (!initialCards || initialCards.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-matcha-50/40 via-matcha-100 to-matcha-200/40">
      <Header />

      <main className="py-12 px-4 sm:px-6 lg:px-8 pt-48">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
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

          {/* Category Header */}
          <div className="text-center mb-16">
            <div className="text-7xl mb-6">{categoryParam.icon}</div>
            <h1 className="text-5xl font-light text-gray-900 mb-6 tracking-tight">
              {categoryParam.name}
            </h1>
          </div>

          <CategoryCardsSection
            initialCards={initialCards}
            totalCount={totalCount}
            cardsPerPage={CARDS_PER_PAGE}
            category={{
              ...categoryParam,
              slug,
            }}
          />
        </div>
      </main>
    </div>
  );
}

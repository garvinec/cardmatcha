import { Header } from "@/components/header";
import { CreditCardComponent } from "@/components/credit-card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryWithCards } from "@/lib/actions/cards.actions";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const formatSlug = (value: string) =>
  value
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const { category, cards: categoryCards } = await getCategoryWithCards(slug);

  if (!category && categoryCards.length === 0) {
    notFound();
  }

  const categoryName =
    category?.name ?? category?.category_name ?? formatSlug(slug);
  const categoryDescription =
    category?.description ??
    category?.summary ??
    `Discover top ${categoryName.toLowerCase()} credit cards curated to maximize your rewards.`;
  const categoryIcon = category?.icon ?? category?.emoji ?? "💳";

  return (
    <div className="min-h-screen bg-gradient-to-b from-matcha-50/40 via-matcha-100 to-matcha-200/40">
      <Header />

      <main className="py-12 px-4 sm:px-6 lg:px-8">
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
            <div className="text-7xl mb-6">{categoryIcon}</div>
            <h1 className="text-5xl font-light text-gray-900 mb-6 tracking-tight">
              {categoryName}
            </h1>
            <p className="text-xl text-matcha-800/80 max-w-3xl mx-auto font-light leading-relaxed">
              {categoryDescription}
            </p>
            <div className="mt-8">
              <Badge
                variant="secondary"
                className="bg-matcha-100 text-matcha-800 text-sm px-6 py-2 rounded-full border-0"
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
              <div className="w-24 h-24 bg-gradient-to-br from-matcha-100 to-matcha-200 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <div className="text-5xl">🔍</div>
              </div>
              <h3 className="text-3xl font-light text-gray-900 mb-6">
                Coming Soon
              </h3>
              <p className="text-gray-600 mb-10 font-light text-lg max-w-md mx-auto leading-relaxed">
                We're curating the best {categoryName.toLowerCase()} cards for
                you.
              </p>
              <Button
                asChild
                className="bg-matcha-700 hover:bg-matcha-800 text-white rounded-full px-8 py-6 font-light shadow-lg hover:shadow-xl transition-all duration-300"
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

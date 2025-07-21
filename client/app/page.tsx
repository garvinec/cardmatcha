import { CreditCardGrid } from "@/components/credit-card-grid";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { CreditCard, MessageCircle, TrendingUp } from "lucide-react";
import { TopPopularCards } from "@/components/top-popular-cards";
import { CategoryGrid, IssuerGrid } from "@/components/browse-by-grid";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header currentPage="home" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Maximize Your Credit Card Rewards
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover the perfect credit cards for your spending habits and
            unlock maximum rewards, cashback, and benefits with our AI-powered
            recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Find My Perfect Card
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
              asChild
            >
              <a href="/chat">
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat with AI Advisor
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Top 5 Most Popular Cards */}
      <TopPopularCards />

      {/* Credit Cards Grid */}
      <section id="cards" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Credit Cards
            </h3>
            <p className="text-lg text-gray-600">
              Browse our curated selection of top-performing credit cards
            </p>
          </div>
          <CreditCardGrid />
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
              asChild
            >
              <a href="/cards">
                <CreditCard className="mr-2 h-5 w-5" />
                View All Cards
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Credit Card Categories */}
      <CategoryGrid />

      {/* Card Issuers */}
      <IssuerGrid />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span
                className="text-xl font-bold"
                style={{
                  fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
                  letterSpacing: "-0.02em",
                  fontWeight: "700",
                }}
              >
                Credexa
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Maximizing your credit card rewards, one recommendation at a time.
            </p>
            <p className="text-sm text-gray-500">
              © 2025 Credexa. All rights reserved. Credit card offers subject to
              approval.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

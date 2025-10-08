import { CreditCardGrid } from "@/components/credit-card-grid";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { TopPopularCards } from "@/components/most-popular-cards";
import { CategoryGrid } from "@/components/browse-by-grid";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/30 via-white to-lime-50/20">
      <Header currentPage="home" />

      {/* Hero Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-7xl font-light text-green-900 mb-8 tracking-tight leading-tight">
            Find Your Perfect Card
          </h2>
          <p className="text-xl md:text-2xl text-green-800/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Discover credit cards that align with your lifestyle. Maximize
            rewards naturally, effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-green-800 hover:bg-green-900 text-white rounded-full px-8 py-6 text-lg font-light shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Explore Cards
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/80 backdrop-blur text-green-800 border-green-200 hover:bg-green-50 rounded-full px-8 py-6 text-lg font-light shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <a href="/chat">
                <MessageCircle className="mr-2 h-5 w-5" />
                Ask Our AI
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Top 5 Most Popular Cards */}
      <section className="py-20">
        <TopPopularCards />
      </section>

      {/* Credit Cards Grid */}
      <section id="cards" className="py-20 bg-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-light text-green-900 mb-6 tracking-tight">
              Featured Cards
            </h3>
            <p className="text-lg md:text-xl text-green-800/70 font-light">
              Curated selections for mindful spending
            </p>
          </div>
          <CreditCardGrid />
        </div>
      </section>

      {/* Credit Card Categories */}
      <section className="py-20">
        <CategoryGrid />
      </section>

      {/* Footer */}
      <footer className="bg-green-900/95 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <span className="text-2xl font-light tracking-wide">
                CardMatcha
              </span>
            </div>
            <p className="text-green-200/80 mb-6 font-light text-lg">
              Mindful credit, maximized rewards.
            </p>
            <p className="text-sm text-green-300/60 font-light">
              © 2025 CardMatcha. Credit card offers subject to approval.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

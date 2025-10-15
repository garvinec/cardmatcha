import { CreditCardGrid } from "@/components/credit-card-grid";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, Search } from "lucide-react";
import { TopPopularCards } from "@/components/most-popular-cards";
import { CategoryGrid, IssuerGrid } from "@/components/browse-by-grid";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-offwhite via-matcha-muted/40 to-offwhite overflow-x-hidden">
      <Header currentPage="home" />

      {/* Hero Section */}
      <section className="pt-48 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left text-matcha-foreground">
              <h2 className="text-6xl md:text-7xl font-light text-matcha-deep mb-8 tracking-tight leading-tight">
                Find Your Perfect Card
              </h2>
              <p className="text-xl md:text-2xl text-matcha-foreground/80 mb-12 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                Discover credit cards that align with your lifestyle. Maximize
                rewards naturally, effortlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-matcha text-matcha-foreground hover:bg-matcha-dark/80 rounded-full px-8 py-6 text-lg font-light shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <Link href="/cards">
                    <span className="inline-flex items-center">
                      <svg className="hidden" />{" "}
                      {/* for hydration warning prevention */}
                      <Search className="mr-2 h-5 w-5" />
                      Explore Cards
                    </span>
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-offwhite/80 backdrop-blur text-matcha-dark border-matcha-muted hover:bg-matcha-muted/40 rounded-full px-8 py-6 text-lg font-light shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <a href="/chat">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Ask Our AI
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="flex justify-center lg:justify-start overflow-visible -mt-32 lg:-mt-40">
              <div className="relative w-full max-w-4xl lg:max-w-none lg:w-[120%] rounded-2xl p-4 lg:p-0">
                <Image
                  src="/cardmatcha_landing.png"
                  alt="CardMatcha Credit Cards"
                  width={1000}
                  height={750}
                  className="w-full h-auto lg:scale-125 lg:translate-x-12"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top 5 Most Popular Cards */}
      <section className="py-20">
        <TopPopularCards />
      </section>

      {/* Credit Cards Grid */}
      <section id="cards" className="py-20 bg-offwhite/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-light text-matcha-deep mb-6 tracking-tight">
              Featured Cards
            </h3>
            <p className="text-lg md:text-xl text-matcha-foreground/80 font-light">
              Curated selections for mindful spending
            </p>
          </div>
          <CreditCardGrid />
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="bg-offwhite/80 backdrop-blur text-matcha-dark border-matcha-muted hover:bg-matcha-muted/40 rounded-full px-8 py-6 font-light text-base shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/cards">
                View All Cards
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Credit Card Categories */}
      <section className="py-20">
        <CategoryGrid />
      </section>

      {/* Credit Card Issuers */}
      <section className="py-20">
        <IssuerGrid />
      </section>

      {/* Footer */}
      <footer className="bg-matcha-deep text-offwhite py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <span className="text-2xl font-light tracking-wide">
                CardMatcha
              </span>
            </div>
            <p className="text-offwhite/80 mb-6 font-light text-lg">
              Mindful credit, maximized rewards.
            </p>
            <p className="text-sm text-offwhite/60 font-light">
              © 2025 CardMatcha. Credit card offers subject to approval.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

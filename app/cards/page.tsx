"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { CreditCardComponent } from "@/components/credit-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getCards } from "@/lib/actions/cards.actions";

// Mock data - replace with actual API call
const mockCards = Array.from({ length: 47 }, (_, i) => ({
  id: i + 1,
  name: `Credit Card ${i + 1}`,
  issuer: [
    "Chase",
    "American Express",
    "Capital One",
    "Citi",
    "Bank of America",
  ][i % 5],
  image: `/api/placeholder/300/200?text=Card${i + 1}`,
  annualFee: i % 3 === 0 ? 0 : Math.floor(Math.random() * 500) + 95,
  signupBonus: `$${Math.floor(Math.random() * 500) + 200} bonus`,
  signupRequirement: `$${Math.floor(Math.random() * 3000) + 1000} in ${
    Math.floor(Math.random() * 3) + 3
  } months`,
  rewards: [
    `${Math.floor(Math.random() * 5) + 1}% cashback on all purchases`,
    `${Math.floor(Math.random() * 3) + 2}% on bonus categories`,
  ],
  benefits: [
    "No foreign transaction fees",
    "Purchase protection",
    "Extended warranty",
  ],
  category: ["Travel", "Cash Back", "Business", "Student", "Rewards"][i % 5],
  rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
  bestFor: [
    "Everyday spending",
    "Travel enthusiasts",
    "Business expenses",
    "Students building credit",
    "Maximizing rewards",
  ][i % 5],
}));

const CARDS_PER_PAGE = 15;
const INITIAL_PAGE = 1;

export default function AllCardsPage() {
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  // TODO: Change the type later
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchCards = async () => {
      const { data: initialCards, totalCount } = await getCards({
        pageNumber: INITIAL_PAGE,
        cardsPerPage: CARDS_PER_PAGE,
      });
      setCards(initialCards || []);
      setTotalPages(Math.ceil(totalCount / CARDS_PER_PAGE));
      setTotalCount(totalCount);
    };
    fetchCards();
  }, []);

  useEffect(() => {
    const fetchCards = async () => {
      const { data: returnedCards } = await getCards({
        pageNumber: currentPage,
        cardsPerPage: CARDS_PER_PAGE,
      });
      setCards(returnedCards || []);
    };
    fetchCards();
  }, [currentPage]);

  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const endIndex = startIndex + CARDS_PER_PAGE;

  const handlePageChange = (page: number) => {
    setLoading(true);
    setCurrentPage(page);
    // Simulate loading delay
    setTimeout(() => setLoading(false), 300);
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header currentPage="cards" />

      {/* Page Header */}
      <section className="pt-48 pb-8 px-4 sm:px-6 lg:px-8">
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

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              All Credit Cards
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Browse our complete collection of {cards.length} credit cards
            </p>
            <div className="text-sm text-gray-500">
              Showing {startIndex + 1}-{Math.min(endIndex, totalCount)} of{" "}
              {totalCount} cards
            </div>
          </div>

          {/* Cards Grid */}
          <div id="cards-grid" className="mb-12">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cards.map((card) => (
                  <CreditCardComponent key={card.id} card={card} />
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {generatePageNumbers().map((page, index) => (
                  <div key={index}>
                    {page === "..." ? (
                      <span className="px-3 py-2 text-gray-500">...</span>
                    ) : (
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page as number)}
                        className={`min-w-[40px] ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "hover:bg-blue-50"
                        }`}
                      >
                        {page}
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { CreditCardComponent } from "@/components/credit-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getCardsByCategory } from "@/lib/actions/cards.actions";

const INITIAL_PAGE = 1;

interface CategoryInfo {
  name: string;
  description: string;
  icon: string;
  category_tag: string;
  slug: string;
}

interface CategoryCardsSectionProps {
  initialCards: any[];
  totalCount: number;
  cardsPerPage: number;
  category: CategoryInfo;
}

export function CategoryCardsSection({
  initialCards,
  totalCount,
  cardsPerPage,
  category,
}: CategoryCardsSectionProps) {
  const [cards, setCards] = useState(initialCards);
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(totalCount);

  useEffect(() => {
    setCards(initialCards);
    setCount(totalCount);
    setCurrentPage(INITIAL_PAGE);
  }, [initialCards, totalCount, category.slug]);

  useEffect(() => {
    if (currentPage === INITIAL_PAGE) {
      setCards(initialCards);
      setCount(totalCount);
      setError(null);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    let isMounted = true;

    const fetchCards = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, totalCount: fetchedCount } = await getCardsByCategory(
          category.category_tag,
          {
            pageNumber: currentPage,
            cardsPerPage,
          }
        );

        if (!isMounted) {
          return;
        }

        setCards(data ?? []);
        if (typeof fetchedCount === "number") {
          setCount(fetchedCount);
        }
      } catch (err) {
        if (!isMounted) {
          return;
        }
        setError("Unable to load cards right now. Please try again later.");
      } finally {
        if (!isMounted) {
          return;
        }
        setLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    fetchCards();

    return () => {
      isMounted = false;
    };
  }, [
    cardsPerPage,
    category.category_tag,
    currentPage,
    initialCards,
    totalCount,
  ]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(count / cardsPerPage)),
    [count, cardsPerPage]
  );

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = Math.min(startIndex + cardsPerPage, count);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }
    setCurrentPage(page);
  };

  const generatePageNumbers = () => {
    const pages: (number | "...")[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
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

    return pages;
  };

  return (
    <div>
      <div className="text-center">
        <p className="text-xl text-matcha-800/80 max-w-3xl mx-auto font-light leading-relaxed">
          {category.description}
        </p>
        <div className="mt-8">
          <Badge
            variant="secondary"
            className="bg-matcha-100 text-matcha-800 text-sm px-6 py-2 rounded-full border-0"
          >
            {count} {count === 1 ? "Card" : "Cards"} Available
          </Badge>
        </div>
      </div>

      <div className="mt-16">
        <div className="text-center mb-12">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1}-{endIndex} of {count} cards
          </div>
        </div>

        {error ? (
          <div className="text-center py-20 text-red-600">{error}</div>
        ) : loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-matcha-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((card) => (
              <CreditCardComponent key={card.id} card={card} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {generatePageNumbers().map((page, index) => (
              <div key={`${page}-${index}`}>
                {page === "..." ? (
                  <span className="px-3 py-2 text-gray-500">...</span>
                ) : (
                  <Button
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page as number)}
                    disabled={loading}
                    className={`min-w-[40px] ${
                      currentPage === page
                        ? "bg-matcha-700 text-white"
                        : "hover:bg-matcha-50"
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
            disabled={currentPage === totalPages || loading}
            className="flex items-center gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

import { cn } from "@/lib/utils";

interface HeaderSearchProps {
  className?: string;
}

interface CardSuggestion {
  id: string;
  card_name: string;
}

export function HeaderSearch({ className }: HeaderSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<CardSuggestion[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const router = useRouter();
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (searchQuery.trim().length < 3) {
      setSuggestions([]);
      setIsDropdownVisible(false);
      setHighlightedIndex(-1);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `/api/cards/search?q=${encodeURIComponent(searchQuery.trim())}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch suggestions");
        }

        const data = await response.json();
        setSuggestions(data.results ?? []);
        setIsDropdownVisible(Boolean(data.results?.length));
        setHighlightedIndex(-1);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error(error);
          setSuggestions([]);
          setIsDropdownVisible(false);
          setHighlightedIndex(-1);
        }
      }
    };

    fetchSuggestions();

    return () => {
      controller.abort();
    };
  }, [searchQuery]);

  const handleNavigation = (cardId: string) => {
    if (!cardId) return;
    router.push(`/card/${cardId}`);
    setIsDropdownVisible(false);
    setHighlightedIndex(-1);
    setSuggestions([]);
    setSearchQuery("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) {
      if (event.key === "Enter" && searchQuery.trim().length >= 3) {
        event.preventDefault();
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsDropdownVisible(true);
      setHighlightedIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex >= suggestions.length ? 0 : nextIndex;
      });
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setIsDropdownVisible(true);
      setHighlightedIndex((prevIndex) => {
        if (prevIndex <= 0) {
          return suggestions.length - 1;
        }
        return prevIndex - 1;
      });
    } else if (event.key === "Enter") {
      event.preventDefault();
      const targetIndex = highlightedIndex >= 0 ? highlightedIndex : 0;
      const targetCard = suggestions[targetIndex];
      if (targetCard) {
        handleNavigation(targetCard.id);
      }
    } else if (event.key === "Escape") {
      setIsDropdownVisible(false);
      setHighlightedIndex(-1);
    }
  };

  const handleSuggestionMouseDown = (
    event: MouseEvent<HTMLLIElement>,
    cardId: string
  ) => {
    event.preventDefault();
    handleNavigation(cardId);
  };

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-matcha-400 h-5 w-5" />
      <input
        type="text"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search cards..."
        className="w-full pl-12 pr-4 py-3 border border-matcha-100 rounded-full focus:ring-2 focus:ring-matcha-500/20 focus:border-matcha-300 text-sm bg-matcha-50/30 placeholder:text-matcha-600/50 transition-all duration-300"
      />
      {isDropdownVisible && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-matcha-cream/90 backdrop-blur-md border border-matcha-100/60 rounded-3xl shadow-lg overflow-hidden">
          <ul className="py-2">
            {suggestions.map((card, index) => (
              <li
                key={card.id}
                className={cn(
                  "px-4 py-2 cursor-pointer text-sm transition-colors duration-200",
                  highlightedIndex === index
                    ? "bg-matcha-100/70 text-matcha-900"
                    : "text-matcha-900 hover:bg-matcha-50/80"
                )}
                onMouseDown={(event) => handleSuggestionMouseDown(event, card.id)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {card.card_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

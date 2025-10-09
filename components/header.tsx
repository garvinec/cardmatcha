"use client";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface HeaderProps {
  currentPage?: string;
}

export function Header({ currentPage = "home" }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white/50 backdrop-blur-md shadow-sm border border-green-100/30 fixed top-0 left-0 right-0 z-50 rounded-full mx-4 mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/cardmatcha_logo_transparent.png"
                alt="CardMatcha"
                width={150}
                height={40}
                className="h-20 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Centered Search Bar */}
          <div className="flex-1 max-w-xl mx-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400 h-5 w-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cards..."
                className="w-full pl-12 pr-4 py-3 border border-green-100 rounded-full focus:ring-2 focus:ring-green-500/20 focus:border-green-300 text-sm bg-green-50/30 placeholder:text-green-600/50 transition-all duration-300"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-shrink-0 hidden md:flex space-x-10">
            <Link
              href="/"
              className={`font-light text-base transition-all duration-300 ${
                currentPage === "home"
                  ? "text-green-900"
                  : "text-gray-600 hover:text-green-700"
              }`}
            >
              Home
            </Link>
            <Link
              href="/chat"
              className={`font-light text-base transition-all duration-300 ${
                currentPage === "chat"
                  ? "text-green-900"
                  : "text-gray-600 hover:text-green-700"
              }`}
            >
              Ask AI
            </Link>
            <Link
              href="/profile"
              className={`font-light text-base transition-all duration-300 ${
                currentPage === "profile"
                  ? "text-green-900"
                  : "text-gray-600 hover:text-green-700"
              }`}
            >
              Profile
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

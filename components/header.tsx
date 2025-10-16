"use client";
import Link from "next/link";
import Image from "next/image";

import { HeaderSearch } from "./header-search";

interface HeaderProps {
  currentPage?: string;
}

export function Header({ currentPage = "home" }: HeaderProps) {
  return (
    <header className="bg-matcha-50/70 backdrop-blur-md shadow-sm border border-matcha-200/60 fixed top-0 left-0 right-0 z-50 rounded-full mx-4 mt-4">
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
            <HeaderSearch />
          </div>

          {/* Navigation */}
          <nav className="flex-shrink-0 hidden md:flex space-x-10">
            <Link
              href="/"
              className={`font-light text-base transition-all duration-300 ${
                currentPage === "home"
                  ? "text-matcha-900"
                  : "text-gray-600 hover:text-matcha-700"
              }`}
            >
              Home
            </Link>
            <Link
              href="/chat"
              className={`font-light text-base transition-all duration-300 ${
                currentPage === "chat"
                  ? "text-matcha-900"
                  : "text-gray-600 hover:text-matcha-700"
              }`}
            >
              Ask AI
            </Link>
            <Link
              href="/profile"
              className={`font-light text-base transition-all duration-300 ${
                currentPage === "profile"
                  ? "text-matcha-900"
                  : "text-gray-600 hover:text-matcha-700"
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

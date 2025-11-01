import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-matcha-900 text-white border-t border-matcha-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-[20%_60%_20%] gap-8 md:gap-12">
          {/* Left Column - Logo */}
          <div className="flex items-start">
            <Link
              href="/"
              className="flex items-start hover:opacity-80 transition-opacity"
            >
              <Image
                src="/cardmatcha_logo_transparent.png"
                alt="CardMatcha Logo"
                width={384}
                height={128}
                className="h-32 w-auto"
              />
            </Link>
          </div>

          {/* Center Column - Disclaimer */}
          <div className="flex items-start">
            <p className="text-xs text-matcha-200/70 font-light leading-relaxed">
              CardMatcha strives to keep its information accurate and up to
              date. However, this information may be different than what you see
              when you visit a financial institution, service provider or
              specific product&apos;s site. We strongly encourage you to conduct
              your own research and verify all details directly on the
              product&apos;s official website to ensure you have the most
              current and accurate information. All financial products, shopping
              products and services are presented without warranty. When
              evaluating offers, please review the financial institution&apos;s
              Terms and Conditions. Pre-qualified offers are not binding. If you
              find discrepancies with your credit score or information from your
              credit report, please contact TransUnion directly.
            </p>
          </div>

          {/* Right Column - Links */}
          <div className="flex flex-col items-end md:items-end space-y-3">
            <Link
              href="/about"
              className="text-sm text-matcha-200 hover:text-white transition-colors font-light"
            >
              About
            </Link>
            <Link
              href="/feedback"
              className="text-sm text-matcha-200 hover:text-white transition-colors font-light"
            >
              Feedback
            </Link>
            <Link
              href="/submit-missing-card"
              className="text-sm text-matcha-200 hover:text-white transition-colors font-light"
            >
              Missing Card? Let us know!
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-48">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <span className="text-2xl font-light tracking-wide">
              CardMatcha
            </span>
          </div>
          <p className="text-matcha-200/80 mb-6 font-light text-lg">
            Mindful credit, maximized rewards.
          </p>
          <p className="text-sm text-matcha-200/70 font-light">
            © 2025 CardMatcha. Credit card offers subject to approval.
          </p>
        </div>
      </div>
    </footer>
  );
}

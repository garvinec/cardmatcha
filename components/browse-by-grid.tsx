import Link from "next/link";

const categories = [
  {
    name: "Travel",
    slug: "travel",
    description: "Points and miles",
    gradient: "from-orange-400/80 to-orange-600/80",
    icon: "✈️",
  },
  {
    name: "Cash Back",
    slug: "cashback",
    description: "Simple rewards",
    gradient: "from-matcha-400/80 to-matcha-600/80",
    icon: "💰",
  },
  {
    name: "Dining",
    slug: "dining",
    description: "Restaurant rewards",
    gradient: "from-purple-400/80 to-indigo-600/80",
    icon: "🍽️",
  },
  {
    name: "Gas",
    slug: "gas",
    description: "Fuel savings",
    gradient: "from-teal-400/80 to-teal-600/80",
    icon: "⛽",
  },
  {
    name: "Groceries",
    slug: "groceries",
    description: "Supermarket perks",
    gradient: "from-cyan-400/80 to-blue-500/80",
    icon: "🛒",
  },
  {
    name: "Premium",
    slug: "premium",
    description: "Luxury benefits",
    gradient: "from-yellow-400/80 to-orange-500/80",
    icon: "👑",
  },
];

const issuers = [
  {
    name: "American Express",
    slug: "american-express",
    gradient: "from-blue-500 to-blue-700",
    icon: "💳",
  },
  {
    name: "Barclays",
    slug: "barclays",
    gradient: "from-teal-500 to-cyan-600",
    icon: "🏦",
  },
  {
    name: "Bank of America",
    slug: "bank-of-america",
    gradient: "from-red-500 to-red-700",
    icon: "🏛️",
  },
  {
    name: "Capital One",
    slug: "capital-one",
    gradient: "from-orange-500 to-red-600",
    icon: "💼",
  },
  {
    name: "Chase",
    slug: "chase",
    gradient: "from-blue-600 to-indigo-700",
    icon: "🏃",
  },
  {
    name: "Citi",
    slug: "citi",
    gradient: "from-blue-400 to-blue-600",
    icon: "🌆",
  },
  {
    name: "Discover",
    slug: "discover",
    gradient: "from-orange-400 to-orange-600",
    icon: "🔍",
  },
  {
    name: "Synchrony",
    slug: "synchrony-bank",
    gradient: "from-purple-500 to-purple-700",
    icon: "🔄",
  },
  {
    name: "TD Bank",
    slug: "td-bank",
    gradient: "from-matcha-500 to-matcha-700",
    icon: "🏢",
  },
  {
    name: "US Bank",
    slug: "us-bank",
    gradient: "from-red-400 to-red-600",
    icon: "🇺🇸",
  },
  {
    name: "Wells Fargo",
    slug: "wells-fargo",
    gradient: "from-yellow-500 to-red-500",
    icon: "🐎",
  },
];

export function CategoryGrid() {
  return (
    <section className="py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-light text-matcha-900 mb-4 tracking-tight">
            Browse by Category
          </h3>
          <p className="text-lg text-matcha-800/80 font-light">
            Find cards that match your lifestyle
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <div
                className={`relative overflow-hidden rounded-3xl p-8 h-48 bg-gradient-to-br ${category.gradient} hover:scale-105 transition-all duration-500 cursor-pointer group shadow-lg hover:shadow-2xl`}
              >
                {/* Decorative blur circles */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-matcha-50/30 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-matcha-50/20 rounded-full blur-2xl"></div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <div>
                    <h4 className="text-white font-light text-lg mb-1 leading-tight">
                      {category.name}
                    </h4>
                    <p className="text-white/90 text-sm font-light leading-tight">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IssuerGrid() {
  return (
    <section className="py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-light text-matcha-900 mb-4 tracking-tight">
            Browse by Card Issuer
          </h3>
          <p className="text-lg text-matcha-800/80 font-light">
            Explore cards from your preferred financial institution
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {issuers.map((issuer) => (
            <Link key={issuer.slug} href={`/issuer/${issuer.slug}`}>
              <div
                className={`relative overflow-hidden rounded-3xl p-8 h-48 bg-gradient-to-br ${issuer.gradient} hover:scale-105 transition-all duration-500 cursor-pointer group shadow-lg hover:shadow-2xl`}
              >
                {/* Decorative blur circles */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-matcha-50/30 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-matcha-50/20 rounded-full blur-2xl"></div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="text-4xl mb-3">{issuer.icon}</div>
                  <div>
                    <h4 className="text-white font-light text-lg mb-1 leading-tight">
                      {issuer.name}
                    </h4>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

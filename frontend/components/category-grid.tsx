import Link from "next/link"

const categories = [
  {
    name: "Travel Rewards",
    slug: "travel",
    description: "Earn points and miles on travel purchases",
    gradient: "from-orange-400 to-orange-600",
    icon: "✈️",
  },
  {
    name: "Cash Back",
    slug: "cashback",
    description: "Simple cash rewards on everyday spending",
    gradient: "from-blue-400 to-blue-600",
    icon: "💰",
  },
  {
    name: "Dining & Food",
    slug: "dining",
    description: "Maximum rewards at restaurants and food delivery",
    gradient: "from-purple-500 to-indigo-600",
    icon: "🍽️",
  },
  {
    name: "Gas & Fuel",
    slug: "gas",
    description: "Save money at gas stations and fuel purchases",
    gradient: "from-green-400 to-teal-600",
    icon: "⛽",
  },
  {
    name: "Groceries",
    slug: "groceries",
    description: "Earn more on supermarket and grocery shopping",
    gradient: "from-cyan-400 to-blue-500",
    icon: "🛒",
  },
  {
    name: "Business Cards",
    slug: "business",
    description: "Designed for business owners and entrepreneurs",
    gradient: "from-pink-400 to-rose-600",
    icon: "💼",
  },
  {
    name: "Student Cards",
    slug: "student",
    description: "Perfect for building credit as a student",
    gradient: "from-purple-400 to-pink-500",
    icon: "🎓",
  },
  {
    name: "No Annual Fee",
    slug: "no-fee",
    description: "Great rewards without the annual cost",
    gradient: "from-emerald-400 to-green-600",
    icon: "🆓",
  },
  {
    name: "Premium Cards",
    slug: "premium",
    description: "Luxury perks and exclusive benefits",
    gradient: "from-yellow-400 to-orange-500",
    icon: "👑",
  },
  {
    name: "Balance Transfer",
    slug: "balance-transfer",
    description: "0% intro APR for debt consolidation",
    gradient: "from-indigo-400 to-purple-600",
    icon: "🔄",
  },
]

export function CategoryGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h3>
          <p className="text-lg text-gray-600">Find the perfect card for your spending habits</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <div
                className={`relative overflow-hidden rounded-2xl p-6 h-32 bg-gradient-to-br ${category.gradient} hover:scale-105 transition-transform duration-200 cursor-pointer group`}
              >
                {/* Decorative Elements */}
                <div className="absolute top-2 right-2 opacity-20">
                  <div className="w-16 h-16 bg-white rounded-lg transform rotate-12"></div>
                </div>
                <div className="absolute -bottom-4 -right-4 opacity-10">
                  <div className="w-20 h-20 bg-white rounded-full"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1 leading-tight">{category.name}</h4>
                    <p className="text-white/80 text-xs leading-tight">{category.description}</p>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

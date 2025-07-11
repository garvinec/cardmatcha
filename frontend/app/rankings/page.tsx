import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, TrendingUp } from "lucide-react"
import Link from "next/link"

const fullRankings = [
  {
    id: 1,
    rank: 1,
    name: "Chase Sapphire Preferred",
    issuer: "Chase",
    rating: 4.8,
    category: "Travel",
    annualFee: 95,
    signupBonus: "60,000 points",
    popularityScore: 98,
    monthlySearches: "45K",
  },
  {
    id: 4,
    rank: 2,
    name: "Capital One Venture X",
    issuer: "Capital One",
    rating: 4.9,
    category: "Premium Travel",
    annualFee: 395,
    signupBonus: "75,000 miles",
    popularityScore: 95,
    monthlySearches: "38K",
  },
  {
    id: 2,
    rank: 3,
    name: "Citi Double Cash",
    issuer: "Citi",
    rating: 4.6,
    category: "Cash Back",
    annualFee: 0,
    signupBonus: "$200 cash back",
    popularityScore: 92,
    monthlySearches: "42K",
  },
  {
    id: 3,
    rank: 4,
    name: "American Express Gold",
    issuer: "American Express",
    rating: 4.7,
    category: "Dining",
    annualFee: 250,
    signupBonus: "60,000 points",
    popularityScore: 89,
    monthlySearches: "35K",
  },
  {
    id: 6,
    rank: 5,
    name: "Chase Freedom Unlimited",
    issuer: "Chase",
    rating: 4.4,
    category: "Flat Rate",
    annualFee: 0,
    signupBonus: "$200 cash back",
    popularityScore: 87,
    monthlySearches: "40K",
  },
  {
    id: 5,
    rank: 6,
    name: "Discover it Cash Back",
    issuer: "Discover",
    rating: 4.5,
    category: "Rotating Categories",
    annualFee: 0,
    signupBonus: "Cashback Match",
    popularityScore: 84,
    monthlySearches: "32K",
  },
]

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return (
        <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
          {rank}
        </div>
      )
    case 2:
      return (
        <div className="w-6 h-6 bg-gray-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
          {rank}
        </div>
      )
    case 3:
      return (
        <div className="w-6 h-6 bg-yellow-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
          {rank}
        </div>
      )
    default:
      return (
        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
          {rank}
        </div>
      )
  }
}

export default function RankingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="h-10 w-10 text-blue-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">Credit Card Rankings</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete rankings based on user popularity, expert ratings, and search volume
            </p>
          </div>

          {/* Rankings List */}
          <div className="space-y-4">
            {fullRankings.map((card) => (
              <Card key={card.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Rank Icon */}
                      <div className="flex-shrink-0">{getRankIcon(card.rank)}</div>

                      {/* Card Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{card.name}</h3>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            {card.category}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{card.issuer}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="font-medium">{card.rating} Rating</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Annual Fee: </span>
                            <span className="font-medium">
                              {card.annualFee === 0 ? "No Fee" : `$${card.annualFee}`}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Searches: </span>
                            <span className="font-medium">{card.monthlySearches}/month</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Popularity: </span>
                            <span className="font-medium text-green-600">{card.popularityScore}/100</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="text-green-600 font-medium text-sm">{card.signupBonus}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0">
                      <Button asChild>
                        <Link href={`/card/${card.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Methodology */}
          <Card className="mt-12">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ranking Methodology</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">User Popularity (40%)</h4>
                  <p>Based on user searches, applications, and engagement metrics</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Expert Rating (35%)</h4>
                  <p>Professional analysis of rewards, benefits, and overall value</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Market Performance (25%)</h4>
                  <p>Application approval rates, customer satisfaction, and market trends</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

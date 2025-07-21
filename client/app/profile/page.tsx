"use client"
import { Header } from "@/components/header"
import { Trophy, Plus, MoreHorizontal, Edit, Trash2, X, Search, Calculator, Minus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

// Mock user data
const userData = {
  currentCards: [
    {
      id: 1,
      name: "Chase Sapphire Preferred",
      issuer: "Chase",
      since: "Jan 2023",
      annualFee: 95,
      primaryCategory: "Travel",
      monthlySpend: 1200,
      rewardsEarned: "24,500 points",
    },
    {
      id: 2,
      name: "Citi Double Cash",
      issuer: "Citi",
      since: "Mar 2022",
      annualFee: 0,
      primaryCategory: "Cash Back",
      monthlySpend: 800,
      rewardsEarned: "$156 cash back",
    },
    {
      id: 3,
      name: "American Express Gold",
      issuer: "American Express",
      since: "Jun 2023",
      annualFee: 250,
      primaryCategory: "Dining",
      monthlySpend: 600,
      rewardsEarned: "18,200 points",
    },
  ],
  bestCards: {
    "Grocery stores": {
      card: "American Express Gold",
      reason: "4x points at U.S. supermarkets (up to $25k/year)",
    },
    "Gas & fuel": {
      card: "None",
      reason: "Consider adding a gas-specific rewards card",
    },
    "Restaurants & dining": {
      card: "American Express Gold",
      reason: "4x points at restaurants worldwide",
    },
    "Travel & hotels": {
      card: "Chase Sapphire Preferred",
      reason: "2x points on travel, 25% bonus on redemptions",
    },
    "Online shopping": {
      card: "Chase Freedom Unlimited",
      reason: "1.5% cash back on all purchases including online",
    },
    "Everything else": {
      card: "Citi Double Cash",
      reason: "2% on all purchases with no categories",
    },
  },
  recommendedActions: [
    "Consider adding a gas rewards card for 3x-4x earnings",
    "Your Amex Gold dining credits expire in 2 months",
    "Chase Sapphire travel credit available: $50 remaining",
  ],
}

// Mock credit card database for search
const availableCards = [
  { id: 101, name: "Chase Sapphire Reserve", issuer: "Chase", category: "Premium Travel" },
  { id: 102, name: "Chase Freedom Unlimited", issuer: "Chase", category: "Cash Back" },
  { id: 103, name: "Chase Freedom Flex", issuer: "Chase", category: "Rotating Categories" },
  { id: 104, name: "Capital One Venture X", issuer: "Capital One", category: "Premium Travel" },
  { id: 105, name: "Capital One Venture", issuer: "Chase", category: "Travel" },
  { id: 106, name: "Capital One Savor", issuer: "Capital One", category: "Dining" },
  { id: 107, name: "American Express Platinum", issuer: "American Express", category: "Premium Travel" },
  { id: 108, name: "American Express Blue Cash Preferred", issuer: "American Express", category: "Cash Back" },
  { id: 109, name: "Discover it Cash Back", issuer: "Discover", category: "Rotating Categories" },
  { id: 110, name: "Wells Fargo Active Cash", issuer: "Wells Fargo", category: "Cash Back" },
  { id: 111, name: "Bank of America Travel Rewards", issuer: "Bank of America", category: "Travel" },
  { id: 112, name: "Citi Premier", issuer: "Citi", category: "Travel" },
]

export default function ProfilePage() {
  const [currentCards, setCurrentCards] = useState(userData.currentCards)
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCards, setFilteredCards] = useState<typeof availableCards>([])
  const [activeCardMenu, setActiveCardMenu] = useState<number | null>(null)

  const [spendingCategories, setSpendingCategories] = useState([
    { id: 1, name: "Grocery stores", rewardRate: "4%", amount: 800 },
    { id: 2, name: "Gas & fuel", rewardRate: "3%", amount: 300 },
    { id: 3, name: "Restaurants & dining", rewardRate: "4%", amount: 400 },
    { id: 4, name: "Travel & hotels", rewardRate: "2%", amount: 200 },
    { id: 5, name: "Online shopping", rewardRate: "2%", amount: 150 },
    { id: 6, name: "Everything else", rewardRate: "1%", amount: 300 },
  ])

  const updateSpending = (categoryId: number, newAmount: number) => {
    setSpendingCategories((categories) =>
      categories.map((cat) => (cat.id === categoryId ? { ...cat, amount: newAmount } : cat)),
    )
  }

  const totalEstimatedRewards = spendingCategories
    .reduce((total, category) => {
      const rate = Number.parseFloat(category.rewardRate.replace("%", "")) / 100
      return total + category.amount * rate
    }, 0)
    .toFixed(0)

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    if (value.trim()) {
      const filtered = availableCards.filter(
        (card) =>
          card.name.toLowerCase().includes(value.toLowerCase()) ||
          card.issuer.toLowerCase().includes(value.toLowerCase()) ||
          card.category.toLowerCase().includes(value.toLowerCase()),
      )
      setFilteredCards(filtered.slice(0, 5)) // Show max 5 results
    } else {
      setFilteredCards([])
    }
  }

  const addCard = (card: (typeof availableCards)[0]) => {
    const newCard = {
      id: Date.now(),
      name: card.name,
      issuer: card.issuer,
      since: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      annualFee: 0, // Default values
      primaryCategory: card.category,
      monthlySpend: 0,
      rewardsEarned: "0 points",
    }
    setCurrentCards([...currentCards, newCard])
    setShowAddModal(false)
    setSearchQuery("")
    setFilteredCards([])
  }

  const deleteCard = (cardId: number) => {
    setCurrentCards(currentCards.filter((card) => card.id !== cardId))
    setActiveCardMenu(null)
  }

  const editCard = (cardId: number) => {
    // For now, just close the menu. In a real app, this would open an edit modal
    setActiveCardMenu(null)
    console.log("Edit card:", cardId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header currentPage="profile" />
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Current Credit Cards */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>My Credit Cards ({currentCards.length})</CardTitle>
                <Button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Card
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentCards.map((card) => (
                  <div key={card.id} className="border rounded-lg p-4 bg-white relative">
                    {/* Card Menu Button */}
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => setActiveCardMenu(activeCardMenu === card.id ? null : card.id)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                      </button>

                      {/* Dropdown Menu */}
                      {activeCardMenu === card.id && (
                        <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-[120px]">
                          <button
                            onClick={() => editCard(card.id)}
                            className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          >
                            <Edit className="mr-2 h-3 w-3" />
                            Edit
                          </button>
                          <button
                            onClick={() => deleteCard(card.id)}
                            className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center"
                          >
                            <Trash2 className="mr-2 h-3 w-3" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-start mb-3 pr-8">
                      <div>
                        <h3 className="font-semibold text-gray-900">{card.name}</h3>
                        <p className="text-sm text-gray-600">{card.issuer}</p>
                      </div>
                      <Badge variant="outline">{card.primaryCategory}</Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Since:</span>
                        <span className="font-medium">{card.since}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Annual Fee:</span>
                        <span className="font-medium">{card.annualFee === 0 ? "No Fee" : `$${card.annualFee}`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Spend:</span>
                        <span className="font-medium">${card.monthlySpend}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rewards Earned:</span>
                        <span className="font-medium text-green-600">{card.rewardsEarned}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Best Cards by Category */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2 h-5 w-5" />
                Best Cards by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(userData.bestCards).map(([category, info]) => (
                  <div key={category} className="border rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{category}</h3>
                      {info.card !== "None" ? (
                        <Badge className="bg-green-100 text-green-800">Optimized</Badge>
                      ) : (
                        <Badge variant="outline" className="text-orange-600 border-orange-300">
                          Gap
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm font-medium text-blue-600 mb-1">{info.card}</p>
                    <p className="text-xs text-gray-600">{info.reason}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Estimated Savings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="mr-2 h-5 w-5" />
                Estimated Savings
              </CardTitle>
              <p className="text-sm text-gray-600">Estimate your monthly rewards based on your spending patterns</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Spending category</span>
                  <span className="text-sm font-medium text-gray-700">Monthly spending</span>
                </div>

                {/* Spending Categories */}
                <div className="space-y-4">
                  {spendingCategories.map((category) => (
                    <div key={category.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-blue-600 font-medium">Earn {category.rewardRate} on</p>
                          <p className="text-sm font-semibold text-gray-900">{category.name}</p>
                        </div>
                        <div className="text-lg font-bold text-blue-600">${category.amount}</div>
                      </div>

                      {/* Slider */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateSpending(category.id, Math.max(0, category.amount - 50))}
                          className="w-8 h-8 rounded-full border-2 border-blue-500 flex items-center justify-center hover:bg-blue-50 transition-colors"
                        >
                          <Minus className="h-4 w-4 text-blue-500" />
                        </button>

                        <div className="flex-1 relative">
                          <input
                            type="range"
                            min="0"
                            max="2000"
                            step="50"
                            value={category.amount}
                            onChange={(e) => updateSpending(category.id, Number.parseInt(e.target.value))}
                            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                            style={{
                              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                                (category.amount / 2000) * 100
                              }%, #dbeafe ${(category.amount / 2000) * 100}%, #dbeafe 100%)`,
                            }}
                          />
                        </div>

                        <button
                          onClick={() => updateSpending(category.id, Math.min(2000, category.amount + 50))}
                          className="w-8 h-8 rounded-full border-2 border-blue-500 flex items-center justify-center hover:bg-blue-50 transition-colors"
                        >
                          <Plus className="h-4 w-4 text-blue-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total Estimated Rewards */}
                <div className="bg-blue-600 text-white rounded-lg p-4 text-center">
                  <p className="text-lg font-semibold">Estimated monthly rewards: ${totalEstimatedRewards}/mo</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userData.recommendedActions.map((action, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">{action}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Add Card Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Add Credit Card</h3>
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    setSearchQuery("")
                    setFilteredCards([])
                  }}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search for credit cards..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                  />
                </div>

                {/* Dropdown Results */}
                {filteredCards.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                    {filteredCards.map((card) => (
                      <button
                        key={card.id}
                        onClick={() => addCard(card)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">{card.name}</p>
                            <p className="text-sm text-gray-600">{card.issuer}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {card.category}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* No Results */}
                {searchQuery && filteredCards.length === 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-4 text-center text-gray-500 text-sm">
                    No credit cards found matching "{searchQuery}"
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddModal(false)
                    setSearchQuery("")
                    setFilteredCards([])
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close menu */}
      {activeCardMenu && <div className="fixed inset-0 z-0" onClick={() => setActiveCardMenu(null)} />}
    </div>
  )
}

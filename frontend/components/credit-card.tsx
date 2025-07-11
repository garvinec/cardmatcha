import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, DollarSign, Gift, CreditCard } from "lucide-react"
import Link from "next/link"

interface CreditCardType {
  id: number
  name: string
  issuer: string
  image: string
  annualFee: number
  signupBonus: string
  signupRequirement: string
  rewards: string[]
  benefits: string[]
  category: string
  rating: number
  bestFor: string
}

interface CreditCardProps {
  card: CreditCardType
}

export function CreditCardComponent({ card }: CreditCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{card.name}</h3>
            <p className="text-sm text-gray-600">{card.issuer}</p>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {card.category}
          </Badge>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 text-white relative overflow-hidden">
          <div className="absolute top-2 right-2">
            <CreditCard className="h-6 w-6 opacity-50" />
          </div>
          <div className="mt-8">
            <p className="text-xs opacity-75">Annual Fee</p>
            <p className="text-lg font-bold">{card.annualFee === 0 ? "No Fee" : `$${card.annualFee}`}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{card.rating}</span>
          </div>
          <span className="ml-2 text-xs text-gray-500">Expert Rating</span>
        </div>

        {/* Signup Bonus */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <div className="flex items-center mb-1">
            <Gift className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-sm font-medium text-green-800">Sign-up Bonus</span>
          </div>
          <p className="text-sm text-green-700 font-semibold">{card.signupBonus}</p>
          <p className="text-xs text-green-600">{card.signupRequirement}</p>
        </div>

        {/* Rewards */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
            <DollarSign className="h-4 w-4 mr-1" />
            Rewards
          </h4>
          <ul className="space-y-1">
            {card.rewards.slice(0, 2).map((reward, index) => (
              <li key={index} className="text-xs text-gray-600 flex items-start">
                <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {reward}
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Key Benefits</h4>
          <ul className="space-y-1">
            {card.benefits.slice(0, 2).map((benefit, index) => (
              <li key={index} className="text-xs text-gray-600 flex items-start">
                <span className="w-1 h-1 bg-green-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* Best For */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Best for:</p>
          <p className="text-sm text-gray-700 font-medium">{card.bestFor}</p>
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
            <Link href={`/card/${card.id}`}>Learn More</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

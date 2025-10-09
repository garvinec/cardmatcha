import { CreditCardComponent } from "./credit-card";

const creditCards = [
  {
    id: 1,
    name: "Chase Sapphire Preferred",
    issuer: "Chase",
    image: "/placeholder.svg?height=240&width=380",
    annualFee: 95,
    signupBonus: "60,000 points",
    signupRequirement: "$4,000 in 3 months",
    rewards: [
      "2x points on travel and dining",
      "1x points on all other purchases",
    ],
    benefits: [
      "25% more value when redeeming for travel",
      "No foreign transaction fees",
      "Trip cancellation/interruption insurance",
    ],
    category: "Travel",
    rating: 4.8,
    bestFor: "Travel enthusiasts who dine out frequently",
  },
  {
    id: 2,
    name: "Citi Double Cash",
    issuer: "Citi",
    image: "/placeholder.svg?height=240&width=380",
    annualFee: 0,
    signupBonus: "$200 cash back",
    signupRequirement: "$1,500 in 6 months",
    rewards: [
      "2% cash back on all purchases",
      "1% when you buy, 1% when you pay",
    ],
    benefits: [
      "No annual fee",
      "No category restrictions",
      "0% intro APR for 18 months",
    ],
    category: "Cash Back",
    rating: 4.6,
    bestFor: "Simple cash back without category tracking",
  },
  {
    id: 3,
    name: "American Express Gold",
    issuer: "American Express",
    image: "/placeholder.svg?height=240&width=380",
    annualFee: 250,
    signupBonus: "60,000 points",
    signupRequirement: "$4,000 in 6 months",
    rewards: [
      "4x points at restaurants worldwide",
      "4x points at U.S. supermarkets (up to $25,000/year)",
      "3x points on flights",
    ],
    benefits: [
      "$120 dining credit annually",
      "$120 Uber Cash annually",
      "No foreign transaction fees",
    ],
    category: "Dining",
    rating: 4.7,
    bestFor: "Heavy restaurant and grocery spenders",
  },
  {
    id: 4,
    name: "Capital One Venture X",
    issuer: "Capital One",
    image: "/placeholder.svg?height=240&width=380",
    annualFee: 395,
    signupBonus: "75,000 miles",
    signupRequirement: "$4,000 in 3 months",
    rewards: [
      "2x miles on all purchases",
      "5x miles on hotels and rental cars (through Capital One Travel)",
      "10x miles on thousands of hotels",
    ],
    benefits: [
      "$300 annual travel credit",
      "Priority Pass Select lounge access",
      "TSA PreCheck/Global Entry credit",
    ],
    category: "Premium Travel",
    rating: 4.9,
    bestFor: "Frequent travelers who want premium perks",
  },
  {
    id: 5,
    name: "Discover it Cash Back",
    issuer: "Discover",
    image: "/placeholder.svg?height=240&width=380",
    annualFee: 0,
    signupBonus: "Cashback Match",
    signupRequirement: "All cashback earned in first year matched",
    rewards: [
      "5% cash back on rotating quarterly categories (up to $1,500)",
      "1% cash back on all other purchases",
    ],
    benefits: [
      "No annual fee",
      "Cashback Match for first year",
      "Free FICO credit score",
    ],
    category: "Rotating Categories",
    rating: 4.5,
    bestFor: "Category optimization and building credit",
  },
  {
    id: 6,
    name: "Chase Freedom Unlimited",
    issuer: "Chase",
    image: "/placeholder.svg?height=240&width=380",
    annualFee: 0,
    signupBonus: "$200 cash back",
    signupRequirement: "$500 in 3 months",
    rewards: [
      "1.5% cash back on all purchases",
      "5% on travel through Chase Ultimate Rewards",
      "3% on dining and drugstores",
    ],
    benefits: [
      "No annual fee",
      "0% intro APR for 15 months",
      "No foreign transaction fees",
    ],
    category: "Flat Rate",
    rating: 4.4,
    bestFor: "Simple earning with Chase ecosystem benefits",
  },
];

export function CreditCardGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {creditCards.map((card) => (
        <CreditCardComponent key={card.id} card={card} />
      ))}
    </div>
  );
}

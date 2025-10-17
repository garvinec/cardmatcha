import { CreditCardComponent, type CreditCardType } from "./credit-card";

interface CreditCardGridProps {
  cards: CreditCardType[];
}

export function CreditCardGrid({ cards }: CreditCardGridProps) {
  if (!cards.length) {
    return (
      <div className="text-center text-matcha-800/80 font-light">
        No featured cards available yet. Check back soon.
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <CreditCardComponent key={card.id} card={card} />
      ))}
    </div>
  );
}

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';

export type BestCardRecommendation = {
  card: string;
  reason: string;
};

type BestCardsByCategorySectionProps = {
  bestCards: Record<string, BestCardRecommendation>;
};

export function BestCardsByCategorySection({
  bestCards,
}: BestCardsByCategorySectionProps) {
  return (
    <Card className="border-0 shadow-xl rounded-3xl bg-matcha-50/80 backdrop-blur overflow-hidden">
      <CardHeader className="p-8">
        <CardTitle className="flex items-center text-2xl font-light text-gray-900">
          <Trophy className="mr-3 h-6 w-6 text-matcha-800" />
          Best Cards by Category
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(bestCards).map(([category, info]) => (
            <div
              key={category}
              className="border border-matcha-200/50 rounded-2xl p-6 bg-gradient-to-br from-matcha-50 to-matcha-100/30 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-normal text-gray-900">{category}</h3>
                {info.card !== 'None' ? (
                  <Badge className="bg-matcha-100 text-matcha-800 border-0 rounded-full font-light">
                    Optimized
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="text-orange-600 border-orange-300/50 rounded-full font-light bg-orange-50"
                  >
                    Gap
                  </Badge>
                )}
              </div>
              <p className="text-sm font-normal text-matcha-800 mb-2">
                {info.card}
              </p>
              <p className="text-xs text-gray-600 font-light leading-relaxed">
                {info.reason}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

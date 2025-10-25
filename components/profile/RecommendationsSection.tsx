'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type RecommendationsSectionProps = {
  recommendations: string[];
};

export function RecommendationsSection({
  recommendations,
}: RecommendationsSectionProps) {
  return (
    <Card className="border-0 shadow-xl rounded-3xl bg-matcha-50/80 backdrop-blur overflow-hidden">
      <CardHeader className="p-8">
        <CardTitle className="text-2xl font-light text-gray-900">
          Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <div className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-5 bg-gradient-to-r from-matcha-50/50 to-matcha-100/50 rounded-2xl border border-matcha-200/50"
            >
              <div className="w-2 h-2 bg-matcha-700 rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-gray-700 font-light leading-relaxed">
                {recommendation}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

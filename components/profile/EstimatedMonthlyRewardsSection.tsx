'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Minus, Plus } from 'lucide-react';

export type SpendingCategory = {
  id: number;
  name: string;
  rewardRate: string;
  amount: number;
};

type EstimatedMonthlyRewardsSectionProps = {
  categories: SpendingCategory[];
  onUpdateCategory: (categoryId: number, amount: number) => void;
  totalEstimatedRewards: string;
};

export function EstimatedMonthlyRewardsSection({
  categories,
  onUpdateCategory,
  totalEstimatedRewards,
}: EstimatedMonthlyRewardsSectionProps) {
  return (
    <>
      <style jsx>{`
        .matcha-slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 9999px;
          background: hsl(var(--matcha-600));
          border: 2px solid hsl(var(--matcha-50));
          box-shadow: 0 2px 8px hsl(var(--matcha-600) / 0.3);
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .matcha-slider::-webkit-slider-thumb:hover {
          transform: scale(1.05);
        }
        .matcha-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 9999px;
          background: hsl(var(--matcha-600));
          border: 2px solid hsl(var(--matcha-50));
          box-shadow: 0 2px 8px hsl(var(--matcha-600) / 0.3);
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .matcha-slider::-moz-range-thumb:hover {
          transform: scale(1.05);
        }
      `}</style>
      <Card className="border-0 shadow-xl rounded-3xl bg-matcha-50/80 backdrop-blur overflow-hidden">
        <CardHeader className="p-8">
          <CardTitle className="flex items-center text-2xl font-light text-gray-900">
            <Calculator className="mr-3 h-6 w-6 text-matcha-800" />
            Estimated Monthly Rewards
          </CardTitle>
          <p className="text-sm text-gray-600 font-light mt-2">
            Customize your monthly spending to see potential rewards
          </p>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="space-y-8">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-sm font-light text-gray-600">Category</span>
              <span className="text-sm font-light text-gray-600">
                Monthly amount
              </span>
            </div>

            <div className="space-y-6">
              {categories.map((category) => (
                <div key={category.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-matcha-800 font-light mb-1">
                        Earn {category.rewardRate}
                      </p>
                      <p className="text-sm font-normal text-gray-900">
                        {category.name}
                      </p>
                    </div>
                    <div className="text-xl font-light text-matcha-800">
                      ${category.amount}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() =>
                        onUpdateCategory(
                          category.id,
                          Math.max(0, category.amount - 50),
                        )
                      }
                      className="w-9 h-9 rounded-full border-2 border-matcha-600/50 flex items-center justify-center hover:bg-matcha-50 transition-all duration-300 shadow-sm"
                    >
                      <Minus className="h-4 w-4 text-matcha-700" />
                    </button>

                    <div className="flex-1 relative">
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        step="50"
                        value={category.amount}
                        onChange={(event) =>
                          onUpdateCategory(
                            category.id,
                            Number.parseInt(event.target.value, 10),
                          )
                        }
                        className="matcha-slider w-full h-2 bg-matcha-200/50 rounded-full appearance-none cursor-pointer slider"
                        style={{
                          background: `linear-gradient(to right, hsl(var(--matcha-600)) 0%, hsl(var(--matcha-600)) ${
                            (category.amount / 2000) * 100
                          }%, hsl(var(--matcha-200)) ${
                            (category.amount / 2000) * 100
                          }%, hsl(var(--matcha-200)) 100%)`,
                        }}
                      />
                    </div>

                    <button
                      onClick={() =>
                        onUpdateCategory(
                          category.id,
                          Math.min(2000, category.amount + 50),
                        )
                      }
                      className="w-9 h-9 rounded-full border-2 border-matcha-600/50 flex items-center justify-center hover:bg-matcha-50 transition-all duration-300 shadow-sm"
                    >
                      <Plus className="h-4 w-4 text-matcha-700" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-matcha-700 to-matcha-600 text-white rounded-2xl p-6 text-center shadow-lg">
              <p className="text-sm font-light mb-1 opacity-90">
                Estimated monthly rewards
              </p>
              <p className="text-3xl font-light">${totalEstimatedRewards}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

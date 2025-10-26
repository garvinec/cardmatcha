import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Star,
  DollarSign,
  Gift,
  Shield,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCardById } from "@/lib/actions/card.actions";

interface CardPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CardPage({
  params,
  searchParams,
}: CardPageProps) {
  const { id } = await params;
  const resolvedSearchParams =
    (searchParams ? await searchParams : undefined) ?? {};
  const fromParam = resolvedSearchParams.from;
  const from =
    typeof fromParam === "string"
      ? fromParam
      : Array.isArray(fromParam)
      ? fromParam[0]
      : undefined;
  const backHref = from === "profile" ? "/profile" : "/";
  const card = await getCardById(id);

  if (!card) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-matcha-50/40 via-matcha-100 to-matcha-200/40">
      <Header />

      {/* Main Content */}
      <main className="pt-48 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link href={backHref}>
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 hover:bg-matcha-50 rounded-full px-6 transition-all duration-300"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Card Image and Basic Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Card Image */}
              <Card className="border-0 shadow-xl rounded-3xl bg-matcha-50/80 backdrop-blur overflow-hidden">
                <CardContent className="p-8">
                  <Image
                    src={card.image_url || "/placeholder.svg"}
                    alt={card.card_name}
                    width={400}
                    height={250}
                    className="w-full rounded-2xl shadow-lg"
                  />
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-0 shadow-xl rounded-3xl bg-matcha-50/80 backdrop-blur overflow-hidden">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-light text-gray-900">
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-6 pb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-light">Rating</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-normal">{card.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-light">Annual Fee</span>
                    <span className="font-normal">
                      {card.annual_fee === 0 ? "No Fee" : `$${card.annual_fee}`}
                    </span>
                  </div>
                  {/* <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-light">
                      Credit Score
                    </span>
                    <span className="font-normal text-sm">
                      {card.creditScoreNeeded}
                    </span>
                  </div> */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-light">Category</span>
                    <Badge
                      variant="secondary"
                      className="bg-matcha-100 text-matcha-800 border-0 rounded-full font-light"
                    >
                      {card.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Apply Button */}
              <Button
                asChild
                className="w-full bg-matcha-700 hover:bg-matcha-800 text-white py-6 rounded-full font-light text-base shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <a href={card.url} target="_blank" rel="noopener noreferrer">
                  Apply Now
                </a>
              </Button>
            </div>

            {/* Right Column - Detailed Information */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="text-4xl font-light text-gray-900 mb-3 tracking-tight">
                  {card.card_name}
                </h1>
                <p className="text-lg text-gray-600 mb-4 font-light">
                  {card.issuer}
                </p>
                <p className="text-gray-700 font-light leading-relaxed">
                  {card.best_for}
                </p>
              </div>

              <Card className="border-0 shadow-xl rounded-3xl bg-matcha-50/80 backdrop-blur overflow-hidden">
                <CardHeader className="p-6">
                  <CardTitle className="flex items-center text-matcha-800 font-light text-xl">
                    <Gift className="mr-3 h-5 w-5" />
                    Welcome Bonus
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="bg-gradient-to-r from-matcha-50 to-matcha-100 border border-matcha-200/50 rounded-2xl p-6">
                    <p className="text-lg font-normal text-matcha-800 mb-2">
                      {card.welcome_bonus || "No Welcome Bonus Available"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Rewards Structure */}
              <Card className="border-0 shadow-xl rounded-3xl bg-matcha-50/80 backdrop-blur overflow-hidden">
                <CardHeader className="p-6">
                  <CardTitle className="flex items-center font-light text-xl">
                    <DollarSign className="mr-3 h-5 w-5 text-matcha-800" />
                    Rewards Structure
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="space-y-3">
                    {card.card_rewards?.length ? (
                      card.card_rewards.map((reward: any) => {
                        const categoryName =
                          reward?.reward_categories?.category_name ||
                          reward?.category?.category_name ||
                          reward?.category_name ||
                          "All other purchases";

                        const rewardRate = (() => {
                          const rate = reward?.reward_rate;
                          if (
                            rate === null ||
                            rate === undefined ||
                            rate === ""
                          ) {
                            return "Details coming soon";
                          }

                          const numericRate = Number(rate);
                          if (Number.isFinite(numericRate)) {
                            return `${numericRate}x`;
                          }

                          return `${rate}`;
                        })();

                        return (
                          <div
                            key={reward.id || categoryName}
                            className="flex items-center justify-between rounded-2xl border border-matcha-200/50 bg-gradient-to-r from-matcha-50/60 to-matcha-100/60 p-4"
                          >
                            <span className="font-light text-gray-900">
                              {categoryName}
                            </span>
                            <span className="font-medium text-matcha-800">
                              {rewardRate}
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-4 bg-matcha-50/70 rounded-2xl border border-matcha-200 text-sm text-gray-600 font-light">
                        Reward details will be available soon.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl rounded-3xl bg-matcha-50/80 backdrop-blur overflow-hidden">
                <CardHeader className="p-6">
                  <CardTitle className="flex items-center font-light text-xl">
                    <Shield className="mr-3 h-5 w-5 text-matcha-800" />
                    Key Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  {card.card_benefits?.length ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {card.card_benefits.map((benefit: any) => (
                        <div
                          key={benefit.id || benefit.description}
                          className="flex items-start space-x-3"
                        >
                          <CheckCircle className="h-4 w-4 text-matcha-700 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700 font-light leading-relaxed">
                            {benefit.description ||
                              "Benefit details coming soon"}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-matcha-50/70 rounded-2xl border border-matcha-200 text-sm text-gray-600 font-light">
                      Benefit details will be available soon.
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-xl rounded-3xl bg-matcha-50/80 backdrop-blur overflow-hidden">
                  <CardHeader className="p-6">
                    <CardTitle className="flex items-center text-matcha-800 font-light text-lg">
                      <CheckCircle className="mr-3 h-5 w-5" />
                      Pros
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <ul className="space-y-3">
                      {card.pros.map((pro: string, index: number) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-matcha-700 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700 font-light leading-relaxed">
                            {pro}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl rounded-3xl bg-matcha-50/80 backdrop-blur overflow-hidden">
                  <CardHeader className="p-6">
                    <CardTitle className="flex items-center text-red-700 font-light text-lg">
                      <XCircle className="mr-3 h-5 w-5" />
                      Cons
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <ul className="space-y-3">
                      {card.cons.map((con: string, index: number) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700 font-light leading-relaxed">
                            {con}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

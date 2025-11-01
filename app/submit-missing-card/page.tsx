import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { submitMissingCard } from "@/lib/actions/missing-card.actions";

const SUCCESS_MESSAGE = "Thanks for helping us keep things up to date!";
const FIELD_ERROR_MESSAGE = "Please provide both the card name and issuer.";
const SERVER_ERROR_MESSAGE =
  "We couldn't save your submission. Please try again in a moment.";

type SubmitMissingCardPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function SubmitMissingCardPage({
  searchParams,
}: SubmitMissingCardPageProps) {
  const submittedParam = searchParams?.submitted;
  const submittedValue = Array.isArray(submittedParam)
    ? submittedParam[0]
    : submittedParam;
  const errorParam = searchParams?.error;
  const errorType = Array.isArray(errorParam) ? errorParam[0] : errorParam;

  const success = submittedValue === "1";

  let errorMessage: string | null = null;

  if (errorType === "missing-fields") {
    errorMessage = FIELD_ERROR_MESSAGE;
  } else if (errorType === "server-error") {
    errorMessage = SERVER_ERROR_MESSAGE;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-matcha-50/40 via-white to-matcha-100/50">
      <Header />
      <main className="px-4 pb-24 pt-48 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8 rounded-3xl border border-matcha-200/60 bg-white/80 p-8 shadow-xl backdrop-blur">
          <div className="space-y-3 text-center">
            <h1 className="text-4xl font-light text-matcha-900">
              Missing a card?
            </h1>
            <p className="text-base font-light text-matcha-800/80">
              Let us know the card details and we&apos;ll work on adding it to
              CardMatcha.
            </p>
          </div>

          {success ? (
            <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
              {SUCCESS_MESSAGE}
            </div>
          ) : (
            <form
              action={submitMissingCard}
              className="w-full space-y-6"
              aria-describedby={errorMessage ? "form-error" : undefined}
            >
              <div className="space-y-2">
                <Label
                  htmlFor="card_name"
                  className="text-lg font-medium text-matcha-900"
                >
                  Credit card name
                </Label>
                <Input
                  id="card_name"
                  name="card_name"
                  placeholder="e.g. Sapphire Reserve"
                  className="border-matcha-200 bg-white/80 focus-visible:ring-matcha-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="card_issuer"
                  className="text-lg font-medium text-matcha-900"
                >
                  Card issuer
                </Label>
                <Input
                  id="card_issuer"
                  name="card_issuer"
                  placeholder="e.g. Chase"
                  className="border-matcha-200 bg-white/80 focus-visible:ring-matcha-500"
                  required
                />
              </div>

              {errorMessage ? (
                <p
                  id="form-error"
                  className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600"
                  role="alert"
                >
                  {errorMessage}
                </p>
              ) : null}

              <Button
                type="submit"
                className="bg-matcha-600 hover:bg-matcha-700 text-white"
              >
                Submit missing card
              </Button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

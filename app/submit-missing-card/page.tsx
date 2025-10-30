import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <div className="min-h-screen bg-matcha-950 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-matcha-900/60 border border-matcha-800 rounded-2xl p-8 shadow-xl space-y-8">
          <div>
            <h1 className="text-3xl font-semibold text-white">
              Missing a card?
            </h1>
            <p className="mt-3 text-base text-matcha-200/80">
              Let us know the card details and we&apos;ll work on adding it to
              CardMatcha.
            </p>
          </div>

          {success ? (
            <div className="rounded-lg border border-matcha-700 bg-matcha-800/60 px-4 py-3 text-matcha-100">
              {SUCCESS_MESSAGE}
            </div>
          ) : (
            <form
              action={submitMissingCard}
              className="space-y-6"
              aria-describedby={errorMessage ? "form-error" : undefined}
            >
              <div className="space-y-2">
                <Label htmlFor="card_name" className="text-sm text-matcha-100">
                  Credit card name
                </Label>
                <Input
                  id="card_name"
                  name="card_name"
                  placeholder="e.g. Sapphire Reserve"
                  className="bg-matcha-950 border-matcha-700 focus-visible:ring-matcha-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card_issuer" className="text-sm text-matcha-100">
                  Card issuer
                </Label>
                <Input
                  id="card_issuer"
                  name="card_issuer"
                  placeholder="e.g. Chase"
                  className="bg-matcha-950 border-matcha-700 focus-visible:ring-matcha-500"
                  required
                />
              </div>

              {errorMessage ? (
                <p
                  id="form-error"
                  className="text-sm text-red-400"
                  role="alert"
                >
                  {errorMessage}
                </p>
              ) : null}

              <Button
                type="submit"
                className="w-full bg-matcha-500 hover:bg-matcha-400 text-matcha-950"
              >
                Submit missing card
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

import { loginWithEmail, loginWithGoogle, signupWithEmail } from "./actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { CheckCircle2 } from "lucide-react";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  const user = data?.user;

  if (user) {
    redirect("/profile");
  }

  const errorParam = ((await searchParams)?.error as string) || "";
  const signupSuccess = ((await searchParams)?.signup as string) === "success";
  const signupEmail = ((await searchParams)?.email as string) || "";
  const passwordErrorMessage =
    errorParam === "empty_password"
      ? "Password is required."
      : errorParam === "short_password"
      ? "Password must be longer than 6 characters."
      : "";
  const credentialsErrorMessage =
    errorParam === "invalid_credentials" ? "Invalid email or password." : "";

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage="profile" />
      <div className="flex-1 w-full flex items-center justify-center px-4 py-10 bg-background pt-48">
        <Card className="w-full max-w-md shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Sign in to continue to CardMatcha</CardDescription>
          </CardHeader>
          <CardContent>
            {signupSuccess && (
              <Alert className="mb-6 border-matcha-200 bg-matcha-50">
                <CheckCircle2 className="h-4 w-4 text-matcha-600" />
                <AlertTitle className="text-matcha-900">
                  Check your email
                </AlertTitle>
                <AlertDescription className="text-matcha-700">
                  We&apos;ve sent a confirmation email to{" "}
                  <span className="font-semibold">{signupEmail}</span>. Please
                  click the link in the email to confirm your account, then come
                  back here to log in.
                </AlertDescription>
              </Alert>
            )}
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                />
                {passwordErrorMessage ? (
                  <p className="text-xs text-red-600 mt-1">
                    {passwordErrorMessage}
                  </p>
                ) : null}
              </div>
              {credentialsErrorMessage ? (
                <p className="text-xs text-red-600">
                  {credentialsErrorMessage}
                </p>
              ) : null}
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1 bg-matcha-600 text-white hover:bg-matcha-700"
                  formAction={loginWithEmail}
                >
                  Log in
                </Button>
                <Button
                  type="submit"
                  variant="secondary"
                  className="flex-1"
                  formAction={signupWithEmail}
                >
                  Sign up
                </Button>
              </div>
              <div className="relative">
                <Separator className="my-4" />
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-card px-2 text-xs text-muted-foreground">
                  or
                </span>
              </div>
              <div>
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full"
                  formAction={loginWithGoogle}
                >
                  Continue with Google
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}

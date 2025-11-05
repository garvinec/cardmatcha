import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MobileBlock } from "@/components/mobile-block";
import { MobileContentWrapper } from "@/components/mobile-content-wrapper";
import { isMobileDevice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "CardMatcha",
  description: "CardMatcha Site",
  icons: {
    icon: "/cardmatcha_logo_transparent.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent");
  const initialIsMobile = isMobileDevice(userAgent);

  return (
    <html lang="en">
      <body>
        <MobileBlock initialIsMobile={initialIsMobile} />
        <MobileContentWrapper initialIsMobile={initialIsMobile}>
          {children}
          <SpeedInsights />
        </MobileContentWrapper>
      </body>
    </html>
  );
}

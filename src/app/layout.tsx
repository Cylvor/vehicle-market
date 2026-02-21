import type { Metadata } from "next";
import { Asap, Quicksand } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const fontHeading = Asap({
  variable: "--font-heading",
  subsets: ["latin"],
});

const fontBody = Quicksand({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RideMarket | Buy & Sell Vehicles Online",
  description: "Australia's leading marketplace for new and used cars. Buy, sell, and research vehicles with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "hsl(var(--primary))",
        },
      }}
    >
      <html lang="en">
        <body
          className={`${fontHeading.variable} ${fontBody.variable} font-sans antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

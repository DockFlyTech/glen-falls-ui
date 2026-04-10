import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Lora,
  Libre_Franklin,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Glen Falls Chronicle | Northern New York's Leading Newspaper",
  description: "Northern New York's Leading Newspaper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} ${libreFranklin.variable} ${playfair.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <div className="flex-grow">{children}</div>
        <div className="max-w-[1400px] mx-auto w-full px-4 py-3">
          <AdPlaceholder variant="banner" label="Footer ad — 728×90 leaderboard" />
        </div>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tripel — Your trips, elevated.",
  description:
    "The travel companion app for unforgettable group adventures. Photo sharing, trip planning, games, and printed photo books — all in one place.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Tripel — Your trips, elevated.",
    description:
      "The travel companion app for unforgettable group adventures.",
    type: "website",
    images: [{ url: "/android-chrome-512x512.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}

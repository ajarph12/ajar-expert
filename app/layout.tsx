import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const displayFont = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const bodyFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ajar.expert | Airline IT Veteran & Custom AI Builder",
  description:
    "Custom AI chatbot, workflow automation, website, dan solusi airline IT yang dibangun langsung di Next.js Anda.",
  keywords: [
    "custom ai chatbot",
    "next.js chatbot",
    "vercel ai sdk",
    "airline it consultant",
    "workflow automation",
    "ajar expert",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

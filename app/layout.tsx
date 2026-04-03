import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ajar.expert — Airline IT Veteran & AI Builder",
  description:
    "Lebih dari 25 tahun membangun solusi teknologi untuk industri penerbangan. Konsultasi Airline Systems, AI Automation, dan Website/MVP.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/favicon-192.png", sizes: "192x192" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}

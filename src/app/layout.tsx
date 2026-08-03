import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cioclovina Tribe",
  description: "A Next.js app for Cioclovina Tribe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

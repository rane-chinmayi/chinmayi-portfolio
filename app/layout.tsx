import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StarField from "@/components/StarField";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Chinmayi Rane",
  description: "Personal portfolio of Chinmayi Rane.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <StarField />
        {children}
      </body>
    </html>
  );
}

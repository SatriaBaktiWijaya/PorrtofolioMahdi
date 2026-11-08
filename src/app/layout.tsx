import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mahdi Wirawan — Industrial & Automotive Product Design",
  description:
    "Portfolio of Mahdi Wirawan, Industrial & Automotive Product Designer at Telkom University Purwokerto. Featuring Mazda Project Kensei, Twist n Pour Watering Can, Esprit Otoped, and Automotive Styling CAD.",
  keywords: [
    "Mahdi Wirawan",
    "Industrial Design",
    "Automotive Design",
    "Product Design",
    "Telkom University Purwokerto",
    "Mazda Kensei",
    "Twist n Pour",
    "Esprit Otoped",
    "Rhinoceros 8",
    "NURBS CAD",
    "HIDEO",
  ],
  authors: [{ name: "Mahdi Wirawan" }],
  creator: "Mahdi Wirawan",
  openGraph: {
    title: "Mahdi Wirawan — Industrial & Automotive Product Design",
    description:
      "Precision engineering, ergonomic human factors, and emotional automotive styling. Case studies in CAD, physical prototyping, and CMF.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#0a0a0c] text-[#f4f4f6]">
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

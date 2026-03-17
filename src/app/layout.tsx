import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorDot from "@/components/CursorDot";
import ScrollToTop from "@/components/ScrollToTop";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BULU AGENCY | Dal sogno alla strategia",
  description:
    "BULU AGENCY è la tua agenzia digitale per brand strategy, web development, content & social e digital advertising. Dal sogno alla strategia, fino ai risultati concreti.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CursorDot />
        <div className="flex min-h-screen flex-col">
          <ScrollToTop />
          <Navbar />
          <main className="mx-auto w-full max-w-[var(--content-max)] flex-1 px-6 pt-32 pb-0">
            {children}
          </main>
          <Footer />
        <ChatWidget />
        </div>
      </body>
    </html>
  );
}

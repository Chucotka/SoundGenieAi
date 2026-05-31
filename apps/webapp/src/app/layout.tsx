import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: '--font-inter' });
const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: '--font-instrument-serif'
});

export const metadata: Metadata = {
  title: "SoundGenie AI",
  description: "Музыкальный AI-помощник",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <body className={`${inter.variable} ${instrumentSerif.variable} font-sans bg-bg text-text min-h-screen overflow-x-hidden pb-24`}>
        {children}
        <BottomNav />
      </body>
    </html>
  );
}

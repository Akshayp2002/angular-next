
// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import HomeNav from "@/components/HomeNav";
import ThemeProvider from "./theme-provider";
import PageTransition from "./page-transition";
import DelayedFooter from "@/delayed-footer";

export const metadata: Metadata = {
  title: "Akshay | Software Developer",
  description: "Bento-style personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="antialiased px-6 hide-scrollbar">
        <ThemeProvider>
          <HomeNav />
          <PageTransition>{children}</PageTransition>
          <DelayedFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
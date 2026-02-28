
// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import HomeNav from "@/components/HomeNav";
import ThemeProvider from "./theme-provider";

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
      <body className="antialiased px-6">
        <ThemeProvider>
          <HomeNav />
          {children}
          <footer className="text-center py-6 text-sm text-gray-500">
            <p>Made with Next.js ❤️</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
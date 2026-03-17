"use client";

import { useEffect, useState } from "react";

export default function DelayedFooter() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowFooter(true);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <footer className="text-center py-6 text-sm min-h-[3.25rem]">
      <p
        className={`text-gray-500 transition-opacity duration-300 ${
          showFooter ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        Made with Next.js ❤️
      </p>
    </footer>
  );
}
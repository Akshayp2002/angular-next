"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
// components/tiles/home/IntroTile.tsx
export default function IntroTile() {
    const [activeBubble, setActiveBubble] = useState(0);
    const [showBubble, setShowBubble] = useState(false);

    const greeting = useMemo(() => {
        const hour = new Date().getHours();

        if (hour < 5) return "Working late 🌙";
        if (hour < 12) return "Good morning ☀️";
        if (hour < 15) return "Good noon 🌤️";
        if (hour < 18) return "Good afternoon 🌞";
        if (hour < 22) return "Good evening 🌆";
        return "Good night 🌃";
    }, []);

    const chatLines = useMemo(
        () => [
            `${greeting}`,
            "Welcome, glad you are here ✨",
            "I build clean, useful web apps 💻",
            "Let us create something great together 🚀",
        ],
        [greeting]
    );

    useEffect(() => {
        let revealTimeout: number | null = null;

        const startDelay = window.setTimeout(() => {
            setShowBubble(true);
        }, 2600);

        const rotateBubbles = window.setInterval(() => {
            setShowBubble(false);

            revealTimeout = window.setTimeout(() => {
                setActiveBubble((current) => (current + 1) % chatLines.length);
                setShowBubble(true);
            }, 2200);
        }, 8500);

        return () => {
            window.clearTimeout(startDelay);
            window.clearInterval(rotateBubbles);
            if (revealTimeout !== null) {
                window.clearTimeout(revealTimeout);
            }
        };
    }, [chatLines.length]);

    return (
        <div className="flex flex-col justify-center h-full px-10 lg:px-16 bg-white dark:bg-[#0d1117] rounded-4xl dark:ring-2 dark:ring-gray-700">
            <div className="flex items-center gap-3 mb-2">
                {/* Placeholder for 3D Avatar Image */}
                <div className="relative w-24 h-24">
                    <Image src="/memoji.png" alt="Akshay's Avatar" width={60} height={100} className="rounded-full" />
                </div>
                <div className="-ml-2 -mt-7 min-h-[60px]" aria-live="polite" aria-label="Greeting chat">
                    <div
                        className={`relative w-fit max-w-[230px] rounded-[30px] bg-[#0A84FF] px-5 py-2 text-sm font-semibold leading-snug text-white shadow-[0_10px_22px_rgba(10,132,255,0.45)] ring-1 ring-[#a5dbff]/45 transition-all duration-700
                        ${showBubble ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"}`}
                    >
                        <span className="break-words">{chatLines[activeBubble]}</span>
                        <svg className="pointer-events-none absolute -left-[9px] top-[17px] h-[15px] w-[15px]" viewBox="0 0 15 15" aria-hidden="true">
                            <path d="M14 1C9.3 3.2 5.7 7 3.5 12C6.5 11.1 9.6 11.5 13.8 14L14 1Z" fill="#0A84FF" />
                        </svg>
                    </div>

                    {!showBubble && (
                        <div className="mt-1 flex w-fit items-center gap-1 rounded-[20px] bg-[#2491ff] px-3 py-2 text-white/95 shadow-[0_8px_16px_rgba(29,143,243,0.38)] ring-1 ring-[#9ad9ff]/40">
                            <span className="h-1.5 w-1.5 rounded-full bg-white/95 animate-bounce" style={{ animationDuration: "1s", animationDelay: "0ms" }} />
                            <span className="h-1.5 w-1.5 rounded-full bg-white/95 animate-bounce" style={{ animationDuration: "1s", animationDelay: "150ms" }} />
                            <span className="h-1.5 w-1.5 rounded-full bg-white/95 animate-bounce" style={{ animationDuration: "1s", animationDelay: "300ms" }} />
                        </div>
                    )}
                </div>
            </div>

            <h1 className="text-gray-500 text-base leading-relaxed">
                I'm{" "}
                <span className="relative inline-block whitespace-nowrap z-10 font-bold text-gray-800">
                    <span className="relative z-20 font-decorative text-[20px]">Akshay</span>
                    <img src="/line-1.svg" alt="underline" className="absolute left-0 w-full top-[-16%] -z-10 pointer-events-none" />
                </span>
                , a Software developer from Kerala...
            </h1>
            <p className="mt-1 text-gray-500 text-base leading-relaxed max-w-[500px]">
                Building clean, efficient web solutions with PHP, Laravel & Tailwind CSS. I love solving problems through code and creating tools that matter.
            </p>
        </div>
    );
}
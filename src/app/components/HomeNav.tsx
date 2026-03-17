"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
const links = ["Home", "About", "Tools", "Projects", "Blog"];

export default function HomeNav() {
    const pathname = usePathname();
    const activeIndex = Math.max(
        0,
        links.findIndex((link) => {
            const url = `/${link.toLowerCase()}`;
            return pathname === url || pathname.startsWith(`${url}/`);
        })
    );

    return (
        <div className="flex flex-col items-center w-full">
            {/* 1. SVG Logo - Centered on mobile, left on desktop */}
            <div className="w-[140px] h-10 flex items-center select-none dark:bg-[#0d1117] mb-2 sm:mb-0 sm:mr-auto">
                <svg viewBox="0 0 1000 400" preserveAspectRatio="xMinYMid meet" className="w-full h-full">
                    <defs>
                        <linearGradient id="akshayGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: "#ff3b71", stopOpacity: 1 }} />
                            <stop offset="30%" style={{ stopColor: "#9146ff", stopOpacity: 1 }} />
                            <stop offset="65%" style={{ stopColor: "#ff7d2a", stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: "#ffc233", stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <text
                        x="0"
                        y="220"
                        dominantBaseline="middle"
                        textAnchor="start"
                        fontFamily="Quicksand, sans-serif"
                        fontSize="320"
                        fontWeight="700"
                        fill="url(#akshayGradient)"
                        style={{ letterSpacing: "-0.05em" }}
                    >
                        Akshay
                    </text>
                </svg>
            </div>

            {/* 2. Centered Pill Menu - reduced width on mobile */}
            <nav className="w-full flex justify-center">
                <ul className="relative grid grid-cols-5 items-center p-1 bg-[#eeeeee] dark:bg-[#0d1117] rounded-full ring-2 ring-transparent dark:ring-gray-700 md:max-w-[400px] max-w-[310px] w-full">
                    {/* Animated active indicator */}
                    <div
                        className="absolute left-1 top-1 h-[calc(100%-0.5rem)] rounded-full bg-white dark:bg-[#1f2732] z-0 transition-transform duration-300 ease-out"
                        style={{
                            width: `calc((100% - 0.5rem)/${links.length})`,
                            transform: `translateX(${activeIndex * 100}%)`,
                        }}
                    />
                    {links.map((link) => {
                        const url = `/${link.toLowerCase()}`;
                        const isActive = pathname === url || pathname.startsWith(`${url}/`);
                        return (
                            <li key={link} className="relative z-10 w-full">
                                <Link
                                    href={url}
                                    className={`block w-full text-center rounded-full px-1 py-2 font-semibold text-sm font-[geometric,sans-serif] transition-colors duration-200
                                        ${isActive ? "text-gray-900 dark:text-white" : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"}`}
                                >
                                    {link}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* 3. Right-aligned Contact Link - hidden on mobile */}
            <div className="font-semibold text-sm text-gray-900 cursor-pointer hover:opacity-70 transition-opacity hidden sm:block">
                {/* <span className={`font-[geometric,sans-serif]`}>Contact</span> */}
            </div>
        </div>
    );
}
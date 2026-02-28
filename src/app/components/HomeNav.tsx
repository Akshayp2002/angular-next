"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
const links = ["Home", "About", "Tools", "Projects", "Blog"];

export default function HomeNav() {
    const pathname = usePathname();
    return (
        <nav className="flex items-center justify-between max-w-[1200px] mx-auto py-8 px-8 w-full">

            {/* 1. SVG Logo - Left Aligned */}
            <div className="w-[140px] h-10 flex items-center select-none dark:bg-[#0d1117]">
                {/* <svg viewBox="0 0 1000 400" preserveAspectRatio="xMinYMid meet" className="w-full h-full">
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
                        akshay
                    </text>
                </svg> */}
            </div>

            {/* 2. Centered Pill Menu */}
            <ul className="relative flex items-center p-2 bg-[#eeeeee] dark:bg-[#0d1117] rounded-full ring-2 ring-transparent dark:ring-gray-700">
                {/* Animated active indicator */}
                <div
                    className="absolute top-2 left-2 h-[calc(100%-1rem)] rounded-full bg-white z-0 transition-all duration-300 dark:bg-[#0d1117] text-white"
                    style={{
                        width: `calc(100%/${links.length})`,
                        transform: `translateX(${links.findIndex(link => {
                            const url = `/${link.toLowerCase()}`;
                            return pathname === url || (pathname === "/" && link === "Home");
                        }) * 93}%)`,
                    }}
                />
                {links.map((link, idx) => {
                    const url = `/${link.toLowerCase()}`;
                    const isActive = pathname === url || (pathname === "/" && link === "Home");
                    return (
                        <li key={link} className="relative z-10 w-full flex justify-center">
                            <Link
                                href={url}
                                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 font-[geometric,sans-serif] w-full text-center
                                    ${isActive ? "text-gray-900 dark:text-white dark:bg-gray-700" : "text-gray-600 hover:text-gray-900"}`}
                            >
                                {link}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            {/* 3. Right-aligned Contact Link */}
            <div className="font-semibold text-sm text-gray-900 cursor-pointer hover:opacity-70 transition-opacity">
                <span className={`font-[geometric,sans-serif]`}>Contact</span>
            </div>

        </nav>
    );
}
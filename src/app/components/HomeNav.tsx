"use client";

import Link from "next/link";
import Image from "next/image";
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
        <div className="relative flex flex-col items-center w-full py-2 sm:py-0">
            {/* 1. SVG Logo - Top on mobile, Absolute Left on desktop */}
            <div className="flex items-center select-none mb-4 sm:mb-0 sm:absolute sm:left-0 sm:top-1/2 sm:-translate-y-1/2">
                <Image src="/logo.svg" alt="Logo" width={170} height={100} className="w-[140px] h-auto" />
            </div>

            {/* 2. Centered Pill Menu */}
            <nav className="w-full flex justify-center items-center sm:h-20">
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

            {/* 3. Right side placeholder for future content - Absolute Right on desktop */}
            <div className="hidden sm:flex items-center sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2">
                {/* Future content goes here */}
            </div>
        </div>
    );
}
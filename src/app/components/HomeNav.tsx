"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const baseLinks = ["Home", "About", "Tools", "Projects", "Blog"];

export default function HomeNav() {
    const pathname = usePathname();
    
    // Dynamically add "Testimonies" only if on that page
    const links = pathname.startsWith("/testimonies") 
        ? [...baseLinks, "Testimonies"] 
        : baseLinks;

    const findIndex = () => {
        const index = links.findIndex((link) => {
            const url = `/${link.toLowerCase()}`;
            return pathname === url || pathname.startsWith(`${url}/`);
        });
        return index === -1 ? 0 : index;
    };

    const activeIndex = findIndex();
    const isExpanded = links.length > 5;

    return (
        <div className="relative flex flex-col items-center w-full py-2 sm:py-0 overflow-x-hidden">
            {/* 1. SVG Logo - Top on mobile, Absolute Left on desktop */}
            <div className="flex items-center select-none mb-4 sm:mb-0 sm:absolute sm:left-0 sm:top-1/2 sm:-translate-y-1/2">
                <Link href="/home" className="hover:opacity-80 transition-all active:scale-95 cursor-pointer">
                    <Image src="/logo.svg" alt="Logo" width={170} height={100} className="w-[140px] h-auto" />
                </Link>
            </div>

            {/* 2. Centered Pill Menu */}
            <nav className="w-full flex justify-center items-center sm:h-20 px-2 sm:px-0">
                <ul 
                    className={`relative grid items-center p-1 bg-[#eeeeee] dark:bg-[#0d1117] rounded-full ring-2 ring-transparent dark:ring-gray-700 w-full transition-all duration-500 overflow-hidden mx-auto`}
                    style={{ 
                        gridTemplateColumns: `repeat(${links.length}, minmax(0, 1fr))`,
                        maxWidth: isExpanded ? '520px' : '400px'
                    }}
                >
                    {/* Animated active indicator */}
                    <div
                        className="absolute left-1 top-1 h-[calc(100%-0.5rem)] rounded-full bg-white dark:bg-[#1f2732] z-0 transition-transform duration-300 ease-out shadow-sm"
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
                                    className={`block w-full text-center rounded-full px-0.5 py-2 font-semibold transition-colors duration-200 truncate
                                        ${isExpanded ? 'text-[9px] sm:text-[11px] md:text-sm' : 'text-xs sm:text-sm'}
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
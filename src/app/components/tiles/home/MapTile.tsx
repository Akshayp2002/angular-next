"use client";

import Image from "next/image";
import MapComponent from "./MapComponent";

export default function MapTile() {
    return (
        <div className="group w-full h-full relative overflow-hidden rounded-4xl border border-gray-100 shadow-sm bg-[#e0f2f1] dark:bg-[#0d1117] dark:border-transparent dark:ring-2 dark:ring-gray-700 cursor-grab active:cursor-grabbing">
            <MapComponent />

            <div className="absolute inset-0 z-10 pointer-events-none dark:bg-[#0d1117]/45" />

            <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                <div className="pointer-events-auto relative w-[120px] h-[120px] rounded-full bg-cyan-400/50 border border-cyan-300/70 shadow-[0_10px_30px_rgba(14,165,233,0.35)] flex items-center justify-center transition-transform duration-300 ease-out group-hover:rotate-[-10deg] group-hover:scale-105">
                    <Image
                        src="/head-hand.png"
                        alt="Akshay profile"
                        width={90}
                        height={90}
                        className="w-[90px] h-[90px] object-contain drop-shadow-md transition-transform duration-300 ease-out group-hover:rotate-[10deg] group-hover:translate-y-[-4px]"
                        priority
                    />
                </div>
            </div>

        </div>
    );
}
"use client";

import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./MapComponent'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-[#e0f2f1] animate-pulse rounded-[2.5rem] lg:rounded-[3rem]" />
});

export default function MapTile() {
    return (
        <div className="w-full h-full relative overflow-hidden rounded-[2.5rem] lg:rounded-[3rem] border border-gray-100 shadow-sm bg-[#e0f2f1]">
            <MapComponent />

            {/* Visual UI Elements stay outside the dynamic component */}
            <div className="absolute bottom-4 right-4 z-[1000] pointer-events-none">
                <div className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400">
                    <span className="text-xl font-bold">+</span>
                </div>
            </div>
        </div>
    );
}
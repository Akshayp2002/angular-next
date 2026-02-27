// components/tiles/home/TechStackTile.tsx
// Define icons array for a future loop
const techIcons = ['php', 'js', 'laravel', 'tailwind', 'next', 'react'];

export default function TechStackTile() {
    return (
        <div className="w-full h-full p-8 flex flex-col items-center justify-center gap-6 relative">
            {/* (Add topographic background pattern image here) */}

            {/* Grid of icons - hardcoded for now to match visual position */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                <div className="p-4 bg-white rounded-3xl border border-gray-100 shadow-sm">PHP</div>
                <div className="p-4 bg-white rounded-3xl border border-gray-100 shadow-sm">JS</div>
                <div className="p-4 bg-white rounded-3xl border border-gray-100 shadow-sm col-span-2 text-center font-bold">LARAVEL</div>
                <div className="p-4 bg-white rounded-3xl border border-gray-100 shadow-sm">Tailwind</div>
                <div className="p-4 bg-white rounded-3xl border border-gray-100 shadow-sm">NextJS</div>
            </div>

        </div>
    );
}
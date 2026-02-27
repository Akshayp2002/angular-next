// components/tiles/home/IntroTile.tsx
export default function IntroTile() {
    return (
        <div className="flex flex-col justify-center h-full px-10 lg:px-16">
            <div className="flex items-center gap-6 mb-6">
                {/* Placeholder for 3D Avatar Image */}
                <div className="w-24 h-24 bg-blue-50 rounded-full border border-blue-100 flex items-center justify-center">
                    <span className="text-4xl">👨‍💻</span>
                </div>
                <div className="bg-orange-600 text-white px-5 py-2 rounded-full font-bold text-sm tracking-tight">
                    Good Afternoon!
                </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 leading-tight">
                I'm <span className="underline decoration-blue-500 decoration-4 underline-offset-4">Akshay</span>, a Software developer from Kerala...
            </h1>
            <p className="mt-3 text-gray-500 text-base leading-relaxed max-w-[500px]">
                Building clean, efficient web solutions with PHP, Laravel & Tailwind CSS. I love solving problems through code and creating tools that matter.
            </p>
        </div>
    );
}
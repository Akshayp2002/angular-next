// components/tiles/home/GitHubTile.tsx
import Image from 'next/image';

export default function GitHubTile() {
    return (
        <div className="w-full h-full bg-gradient-to-tr from-[#161618] to-[#252a32] p-8 flex items-center justify-center">
            {/* Replace with your accurate Github SVG logo asset */}
            <div className="relative w-40 h-40">
                <div className="absolute inset-0 bg-white rounded-full flex items-center justify-center">
                    <Image
                        src="https://raw.githubusercontent.com/github/explore/2c6872a0385209b9d0dcab73c412acc72c8e391d/topics/github/github.png"
                        alt="GitHub logo"
                        width={100}
                        height={100}
                        className="opacity-90"
                    />
                </div>
            </div>
        </div>
    );
}
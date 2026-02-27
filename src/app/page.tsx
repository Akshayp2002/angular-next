// app/page.tsx
import BentoTile from "@/components/BentoTile";
import IntroTile from "@/components/tiles/home/IntroTile";
import GitHubTile from "@/components/tiles/home/GitHubTile";
import TechStackTile from "@/components/tiles/home/TechStackTile";

export default function Home() {
  return (
    <main className="min-h-screen py-10 flex justify-center">
      {/* This is THE GRID that assembles the lunchbox. 
        Note the h- mobile vs h- desktop.
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-flow-row-dense max-w-[1200px] w-full">
        
        {/* Row 1 */}
        {/* Intro (Wide) */}
        <BentoTile className="lg:col-span-2 h-[400px] lg:h-[300px]">
          <IntroTile />
        </BentoTile>

        {/* Map (Square) */}
        <BentoTile className="col-span-1 h-[400px] lg:h-[300px]">
          <div className="bg-[#e8f5e9] w-full h-full flex items-center justify-center text-gray-500 italic">Kozhikode Map View</div>
        </BentoTile>

        {/* Tech Stack (Tall) */}
        <BentoTile className="col-span-1 lg:row-span-2 h-[400px] lg:h-[600px]">
          <TechStackTile />
        </BentoTile>

        {/* Row 2 */}
        {/* Light/Dark (Square) */}
        <BentoTile className="col-span-1 h-[400px] lg:h-[300px]">
           <div className="bg-white w-full h-full flex items-center justify-center text-gray-500 italic">Theme Toggle</div>
        </BentoTile>

        {/* Instagram (Square) */}
        <BentoTile className="col-span-1 h-[400px] lg:h-[300px]">
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
             <div className="w-20 h-20 bg-white rounded-2xl">IG</div>
          </div>
        </BentoTile>

        {/* Placeholders for the rest of your tiles to finalize structure */}
        {/* Blog Journey (Wide) */}
        <BentoTile className="lg:col-span-2 h-[400px] lg:h-[300px]">
          <div className="bg-[#fff9c4] w-full h-full p-8 italic text-gray-600">Blog Journey Content</div>
        </BentoTile>

        {/* Project Showcase (Tall) */}
        <BentoTile className="col-span-1 lg:row-span-2 h-[400px] lg:h-[600px]">
           <div className="bg-[#e0f7fa] w-full h-full p-8 italic text-gray-600">Project Portrait</div>
        </BentoTile>

        {/* Black Github Square (Square) */}
        <BentoTile className="col-span-1 h-[400px] lg:h-[300px]">
          <GitHubTile />
        </BentoTile>

        {/* Business App Wide (Wide) */}
        <BentoTile className="lg:col-span-2 h-[400px] lg:h-[300px]">
          <div className="bg-[#f3e5f5] w-full h-full p-8 italic text-gray-600">Business App Preview</div>
        </BentoTile>

        {/* Get In Touch (Wide) */}
        <BentoTile className="lg:col-span-2 h-[400px] lg:h-[300px]">
          <div className="bg-white w-full h-full p-8 italic text-gray-600">Contact Footer Content</div>
        </BentoTile>

      </div>
    </main>
  );
}
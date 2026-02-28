import BentoTile from "@/components/BentoTile";
import AboutTools from "@/components/tiles/tools/aboutTile";

export default function ToolsPage() {
    return (
        <main className="min-h-screen py-5 flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-flow-row-dense max-w-[1200px] w-full">
                {/* Row 1 */}
                <BentoTile className="lg:col-span-2 h-[400px] lg:h-[300px]">
                    <AboutTools />
                </BentoTile>

            </div>
        </main>
    );
}

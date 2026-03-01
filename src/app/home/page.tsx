"use client";

import { useState, useEffect, useRef } from "react";
import {
    DndContext,
    closestCorners,
    DragOverlay,
    useDndContext,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent,
    DragOverEvent,
    defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    rectSortingStrategy,
} from "@dnd-kit/sortable";
import {
    restrictToWindowEdges,
    restrictToParentElement,
} from "@dnd-kit/modifiers";
import { SortableItem } from "@/components/SortableItem";

import BentoTile from "@/components/BentoTile";
import IntroTile from "@/components/tiles/home/IntroTile";
import GitHubTile from "@/components/tiles/home/GitHubTile";
import TechStackTile from "@/components/tiles/home/TechStackTile";
import ThemeToggleTile from "@/components/tiles/home/ThemeToggleTile";

const TILE_CONFIG: Record<string, { className: string; content: React.ReactNode }> = {
    intro: { className: "md:col-span-2 lg:col-span-2 h-75", content: <IntroTile /> },
    mapView: {
        className: "col-span-1 h-75",
        content: (
            <div className="bg-[#e8f5e9] w-full dark:ring-2 dark:ring-gray-700 h-full flex items-center justify-center rounded-4xl text-green-900 font-medium">
                Kozhikode Map View
            </div>
        ),
    },
    techStack: { className: "col-span-1 lg:row-span-2 h-155", content: <TechStackTile /> },
    themeToggle: { className: "col-span-1 h-75", content: <ThemeToggleTile /> },
    instagram: {
        className: "col-span-1 h-75",
        content: (
            <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-500 rounded-4xl" />
        ),
    },
    blog: {
        className: "md:col-span-2 h-75",
        content: (
            <div className="bg-[#ffeb38] w-full h-full p-8 rounded-4xl text-black">
                Blog Journey Content
            </div>
        ),
    },
    portrait: {
        className: "col-span-1 lg:row-span-2 h-155",
        content: (
            <div className="bg-[#0093a7] w-full h-full p-8 rounded-4xl text-white">Project Portrait</div>
        ),
    },
    github: { className: "col-span-1 h-75", content: <GitHubTile /> },
    business: {
        className: "md:col-span-2 h-75",
        content: (
            <div className="bg-[#d41df0] w-full h-full p-8 rounded-4xl text-white">
                Business App Preview
            </div>
        ),
    },
    contact: {
        className: "md:col-span-2 h-75",
        content: (
            <div className="bg-white w-full h-full p-8 rounded-4xl border border-gray-100">
                Contact Footer Content
            </div>
        ),
    },
};

function DraggedItemOverlay({ id }: { id: string }) {
    const { activeNodeRect } = useDndContext();
    const tile = TILE_CONFIG[id];
    if (!tile || !activeNodeRect) return null;

    return (
        <div style={{ width: activeNodeRect.width, height: activeNodeRect.height }}>
            <BentoTile className="w-full h-full cursor-grabbing rounded-4xl ">
                {tile.content}
            </BentoTile>
        </div>
    );
}

export default function HomeInner() {
    const [items, setItems] = useState(() => Object.keys(TILE_CONFIG));
    const [activeId, setActiveId] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const lastUpdate = useRef<number>(0);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id.toString());
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id.toString();
        const overId = over.id.toString();

        if (activeId !== overId) {
            const now = Date.now();
            if (now - lastUpdate.current > 150) {
                setItems((prev) => {
                    const oldIndex = prev.indexOf(activeId);
                    const newIndex = prev.indexOf(overId);
                    return arrayMove(prev, oldIndex, newIndex);
                });
                lastUpdate.current = now;
            }
        }
    };

    const handleDragEnd = () => {
        setActiveId(null);
        lastUpdate.current = 0;
    };

    if (!isMounted) return null;

    return (
        <main className="min-h-screen py-5 flex justify-center overflow-hidden">
            <div className="max-w-[1200px] w-full p-4 relative">
                <DndContext
                    id="final-stable-bento"
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToWindowEdges, restrictToParentElement]}
                >
                    <SortableContext items={items} strategy={rectSortingStrategy}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-flow-row-dense gap-4 w-full auto-rows-min">
                            {items.map((id) => (
                                <SortableItem key={id} id={id} className={TILE_CONFIG[id].className}>
                                    {TILE_CONFIG[id].content}
                                </SortableItem>
                            ))}
                        </div>
                    </SortableContext>

                    <DragOverlay adjustScale={false}>
                        {activeId ? <DraggedItemOverlay id={activeId} /> : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </main>
    );
}
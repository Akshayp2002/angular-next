"use client";
import { useState, useRef } from "react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { arrayMove, SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";
import { SortableItem } from "@/components/SortableItem";
import BentoTile from "@/components/BentoTile";
import ProjectTile from "@/components/tiles/projects/projectTile";
import { projectsData } from "@/components/tiles/projects/projects";

export default function ProjectPage() {
    const [items, setItems] = useState(projectsData.map(p => p.name));
    const [activeId, setActiveId] = useState<string | null>(null);
    const [overId, setOverId] = useState<string | null>(null);

    const gridRef = useRef<HTMLDivElement>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // Drag only starts after moving 8px
            },
        })
    );

    const handleDragStart = (event: import("@dnd-kit/core").DragStartEvent) => {
        setActiveId(event.active.id?.toString());
    };

    const handleDragOver = (event: import("@dnd-kit/core").DragOverEvent) => {
        setOverId(event.over?.id ? event.over.id.toString() : null);
    };

    const handleDragEnd = (event: import("@dnd-kit/core").DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);
        setOverId(null);

        if (over?.id && items.includes(over.id.toString()) && active.id !== over.id) {
            const oldIndex = items.indexOf(active.id.toString());
            const newIndex = items.indexOf(over.id.toString());
            setItems(arrayMove(items, oldIndex, newIndex));
        }
    };

    let renderItems = items;
    if (activeId) {
        const tempItems = [...items];
        const oldIndex = tempItems.indexOf(activeId);
        tempItems.splice(oldIndex, 1);

        let newIndex;
        if (overId && overId !== activeId) {
            newIndex = tempItems.indexOf(overId);
        } else if (!overId) {
            newIndex = tempItems.length;
        }

        if (typeof newIndex === "number") {
            tempItems.splice(newIndex, 0, "placeholder");
        }
        renderItems = tempItems;
    }

    return (
        <div className="min-h-screen py-5 flex justify-center">
            <div className="w-full max-w-[1200px] p-4">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToFirstScrollableAncestor]}
                >
                    <SortableContext items={items} strategy={rectSortingStrategy}>
                        <div
                            ref={gridRef}
                            className="grid grid-cols-1 md:grid-cols-2 max-w-[1200px] w-full">
                            {renderItems.map((name, idx) => {
                                if (name === "placeholder") {
                                    return (
                                        <div
                                            key={`placeholder-${idx}`}
                                            className="w-full h-full md:h-75 bg-orange-50 rounded-4xl flex items-center justify-center opacity-80 transition-all duration-200"
                                            style={{ minHeight: "100px" }}
                                        >
                                            {/* <span className="text-gray-500 font-semibold">Drop here</span> */}
                                        </div>
                                    );
                                }
                                if (activeId === name) {
                                    return null;
                                }
                                const project = projectsData.find(p => p.name === name);
                                if (!project) return null;
                                return (
                                    <SortableItem key={name} id={name}>
                                        <BentoTile className="w-full h-full md:h-75 transition-all duration-200">
                                            <ProjectTile project={project} />
                                        </BentoTile>
                                    </SortableItem>
                                );
                            })}
                        </div>
                    </SortableContext>
                    <DragOverlay>
                        {activeId ? (
                            (() => {
                                const activeProject = projectsData.find(p => p.name === activeId);
                                if (!activeProject) return null;
                                return (
                                    <BentoTile className="w-full h-full md:h-75">
                                        <ProjectTile project={activeProject} />
                                    </BentoTile>
                                );
                            })()
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </div>
    );
}
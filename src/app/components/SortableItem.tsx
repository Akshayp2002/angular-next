import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem({ id, className = "", children }: { id: string, className?: string, children: React.ReactNode }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        zIndex: isDragging ? 0 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`touch-none relative outline-none rounded-[2.5rem] lg:rounded-[3rem] ${className}`}
        >
            {/* GRAY PLACEHOLDER */}
            {isDragging && (
                <div className="absolute inset-0 bg-gray-200/50 dark:bg-zinc-800/50 rounded-[2.5rem] lg:rounded-[3rem] border-2 border-dashed border-gray-400/50 z-0" />
            )}

            {/* MAP/CONTENT: Fully hidden during drag to prevent Leaflet WebGL crashes */}
            <div className={`w-full h-full transition-opacity duration-300 ${isDragging ? "opacity-0" : "opacity-100"}`}>
                {children}
            </div>
        </div>
    );
}
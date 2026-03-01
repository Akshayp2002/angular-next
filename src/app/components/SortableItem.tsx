import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
    id: string;
    className?: string;
    children: React.ReactNode;
}

export function SortableItem({ id, className = "", children }: SortableItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

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
            className={`touch-none relative outline-none rounded-4xl ${className}`}
        >
            {/* PLACEMENT INDICATOR: Shown only when this specific item is being dragged */}
            {isDragging && (
                <div className="absolute inset-0 bg-gray-200/50 dark:bg-gray-800/50 rounded-4xl border-2 border-dashed border-gray-300 dark:border-gray-700 z-0" />
            )}

            {/* ACTUAL CONTENT: Hidden while dragging so it doesn't overlay */}
            <div
                className={`w-full h-full transition-opacity duration-300 ${isDragging ? "opacity-0" : "opacity-100"
                    }`}
            >
                {children}
            </div>
        </div>
    );
}
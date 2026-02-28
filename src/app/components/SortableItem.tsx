import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem({ id, children }: { id: string; children: React.ReactNode }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging // Destructure this to style the placeholder
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="touch-none" // Prevents mobile scrolling issues when grabbing
        >
            {isDragging ? (
                // This renders in the original spot while the DragOverlay follows the cursor
                <div
                    className="w-full h-full md:h-75 bg-gray-50 dark:bg-gray-700 rounded-4xl opacity-80 transition-all duration-200"
                    style={{ minHeight: "100px" }}
                />
            ) : (
                children
            )}
        </div>
    );
}
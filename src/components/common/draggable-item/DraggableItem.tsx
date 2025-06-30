import React from "react";
import { useDraggable, type UniqueIdentifier } from "@dnd-kit/core";

interface DraggableItemProps {
  id: UniqueIdentifier;
  children?: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const DraggableItem = ({
  id,
  children,
  onMouseEnter,
  onMouseLeave,
}: DraggableItemProps) => {
  const { setNodeRef, attributes, listeners, transform, isDragging } =
    useDraggable({
      id,
      data: { originalIndex: id },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      className={`cursor-grab w-full transition-opacity duration-200 ${isDragging ? "opacity-50" : "opacity-100"}`}
      style={style}
      {...attributes}
      {...listeners}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};

export default DraggableItem;

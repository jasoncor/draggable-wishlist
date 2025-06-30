import React from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableListProps {
  id: string;
  children: React.ReactNode;
}

export const DroppableList = ({ id, children }: DroppableListProps) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      className="w-full min-h-[60px] rounded-lg flex flex-col gap-2"
      ref={setNodeRef}
    >
      {children}
    </div>
  );
};

export default DroppableList;

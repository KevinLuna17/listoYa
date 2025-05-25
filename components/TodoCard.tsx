"use client";

import { XCircleIcon } from "@heroicons/react/24/solid";
import { DraggableProvidedDraggableProps, DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

type Props = {
    id: TypedColumn;
    todo: Todo;
    index: number;
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

function TodoCard({ todo, id, index, innerRef, draggableProps, dragHandleProps }: Props) {
  return (
    <div
    className="bg-white rounded-md space-y-2 drop-shadow-md"
    {...draggableProps}
    {...dragHandleProps}
    ref={innerRef}
    >
        <div className="flex justify-between items-center p-5">
            <p className="">{todo.title}</p>
            <button className="text-red-500 hover:text-red-600">
            <XCircleIcon className="size-8 ml-5"/>
            </button>
        </div>

        {/* Add image here... */}
    </div>
  )
}

export default TodoCard
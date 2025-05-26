"use client";

import { useBoardStore } from '@/store/BoardStore';
import { useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import Column from './Column';

function Board() {
    //when you have more than 1 thing in your store you need to do an array
    const board = useBoardStore((state) => state.board);
    const getBoard = useBoardStore((state) => state.getBoard);
    const setBoardState = useBoardStore((state) => state.setBoardState);
     

    useEffect(() => {
        getBoard();
    }, [getBoard]);
    
    const handleOnDragEnd = (result: DropResult) => {
        const { destination, source, type } = result;

        // Check if user dragged card outside of board
        if (!destination) return;

        // Handle column drag
        if (type==="column") {
            const entries = Array.from(board.columns.entries());
            const [removed] = entries.splice(source.index, 1);
            entries.splice(destination.index, 0, removed);
            const rearrangedColumns = new Map(entries);
            setBoardState({
                ...board, 
                columns: rearrangedColumns,
            })
        }
        
    };
    
  return (
    <DragDropContext
    onDragEnd={handleOnDragEnd}
    >
        <Droppable droppableId="board" type="column" direction="horizontal">
            {(provided) => (
                <div
                className='grid grid-cols-1
                md:grid-cols-3 gap-5 max-w-7xl mx-auto'
                {...provided.droppableProps}
                ref={provided.innerRef}
                >
                    {Array.from(board.columns.entries()).map(([id, column],index) => (
                    <Column 
                    key={id}
                    id={id}
                    todos={column.todos}
                    index={index}
                    />
                    ))}
                </div>
            )}
        </Droppable>
    </DragDropContext>
  );
}

export default Board
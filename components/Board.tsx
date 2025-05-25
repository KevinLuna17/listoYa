"use client";

import { useBoardStore } from '@/store/BoardStore';
import { useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import Column from './Column';

function Board() {
    //when you have more than 1 thing in your store you need to do an array
    const getBoard = useBoardStore((state) => state.getBoard);     
    const board = useBoardStore((state) => state.board);

    useEffect(() => {
        getBoard();
    }, [getBoard]);

    console.log(board);
    
    const handleOnDragEnd = (result: DropResult) => {
        const { destination, source, type } = result;

        console.log(destination);
        console.log(source);
        console.log(type);
        
        
        
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
                    {
                    Array.from(board.columns.entries()).map(([id, column],index) => (
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
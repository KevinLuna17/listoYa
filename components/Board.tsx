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
    const updateTodoInDB = useBoardStore((state) => state.updateTodoInDB);

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

        // This step is needed as the indexes are stored as numbers 0,1,2 etc. instead of id's with DND library
        const columns = Array.from(board.columns);
        const startColIndex = columns[Number(source.droppableId)];
        const finishColIndex = columns[Number(destination.droppableId)];

        const startCol: Column = {
            id: startColIndex[0],
            todos: startColIndex[1].todos,
        };

        const finishCol: Column = {
            id: finishColIndex[0],
            todos: finishColIndex[1].todos,
        };

        if (!startCol || !finishCol) return;

        if (source.index === destination.index && startCol === finishCol) return;

        const newTodos = startCol.todos;
        const [todoMoved] = newTodos.splice(source.index, 1);

        if (startCol.id === finishCol.id) {
            // Same column task drag
            newTodos.splice(destination.index, 0, todoMoved);
            const newCol = {
                id: startCol.id,
                todos: newTodos,
            };
            const newColumns = new Map(board.columns);
            newColumns.set(startCol.id, newCol);

            setBoardState({ ...board, columns: newColumns });
        } else {
            // Dragging to another column
            const finishTodos = Array.from(finishCol.todos);
            finishTodos.splice(destination.index, 0, todoMoved);

            const newColumns = new Map(board.columns);
            const newCol = {
                id: startCol.id,
                todos: newTodos,
            };

            newColumns.set(startCol.id, newCol);
            newColumns.set(finishCol.id, {
                id: finishCol.id,
                todos: finishTodos,
            });

            // Update in DB
            updateTodoInDB(todoMoved, finishCol.id);

            setBoardState({ ...board, columns: newColumns });
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
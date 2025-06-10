"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useBoardStore } from "@/store/BoardStore"
import { PhotoIcon, PlusCircleIcon } from "@heroicons/react/24/solid"
import TaskTypeRadioGroup from "./TaskTypeRadioGroup"
import { FormEvent, useRef } from "react"
import Image from "next/image"

type Props = {
    id: TypedColumn;
    todos: Todo[];
    index: number;
};

function Modal({id, todos, index}: Props) {
    const newTaskInput = useBoardStore((state) => state.newTaskInput);
    const setNewTaskInput = useBoardStore((state) => state.setNewTaskInput);
    const imagePickerRef = useRef<HTMLInputElement>(null);
    const image = useBoardStore((state) => state.image);
    const setImage = useBoardStore((state) => state.setImage);
    const addTask = useBoardStore((state) => state.addTask);
    const newTaskType = useBoardStore((state) => state.newTaskType);
    const setNewTaskType = useBoardStore((state) => state.setNewTaskType);
    // const openModal = useModalStore((state) => state.openModal);
    // const isClose = useModalStore((state) => state.closeModal);

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if(!setNewTaskInput) return;

      // add task to board
      addTask(newTaskInput, newTaskType,image);
      setImage(null);
    }

  return (
    <Dialog>
      <DialogContent className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium leading-6 text-gray-900 pb-2">Add a Task</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2">
            <Input
                type="text"
                value={newTaskInput}
                onChange={(e) => setNewTaskInput(e.target.value)}
                placeholder="Enter a task here..."
                className="w-full border border-gray-300 rounded-md outline-none p-5"
            />
        </div>
        <TaskTypeRadioGroup />

        <div>
          <button 
          type="button"
          onClick={() => {
            imagePickerRef.current?.click();
          }}
          className="w-full border border-gray-300 rounded-md p-5 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
            <PhotoIcon className="size-6 mr-2 inline-block"/>
            Upload Image
          </button>

          {image && (
            <Image
            alt="Uploaded Image"
            width={200}
            height={200}
            className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed"
            src={URL.createObjectURL(image)}
            onClick={() => {
              setImage(null);
            }}
            />
          )}
            <Input 
                type="file"
                ref={imagePickerRef}
                hidden
                onChange={(e) => {
                    //check e is an image
                    if (!e.target.files![0].type.startsWith("image/")) return;
                    setImage(e.target.files![0]);
                }}
            />
        </div>
        <DialogFooter>
          <Button
          type="submit"
          disabled={!newTaskInput}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
          >
            Add Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
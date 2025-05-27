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
import { Label } from "@/components/ui/label"
//import { useModalStore } from "@/store/ModalStore"
import { PlusCircleIcon } from "@heroicons/react/24/solid"

function Modal() {
    // const isOpen = useModalStore((state) => state.isOpen);
    // const openModal = useModalStore((state) => state.openModal);
    // const isClose = useModalStore((state) => state.closeModal);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
            className="text-green-500 hover:text-green-600"
        >
            <PlusCircleIcon className="size-10"/>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium leading-6 text-gray-900 pb-2">Add a Task</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
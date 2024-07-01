import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { FormEvent, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { addTodo } from "../../redux/features/todoSlice";

const AddTodoModal = () => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const randomString = Math.random().toString(36).substring(2, 9);

    const taskDetails = {
      id: randomString,
      title: task,
      description: description,
    };

    dispatch(addTodo(taskDetails));

    const form = event.target as HTMLFormElement;
    form.reset();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-primary-gradient text-white px-3 py-2  rounded-md">
          Add Todo
        </button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
            <DialogDescription>
              Add your task that you want to finish.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Task
              </Label>
              <Input
                onBlur={(e) => setTask(e.target.value)}
                id="task"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Description</Label>
              <Input
                onBlur={(e) => setDescription(e.target.value)}
                id="description"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoModal;

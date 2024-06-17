import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import Form from '@/app/(main)/todos/Todos/form';
import { TodoTagType, TodoType } from '@/app/(main)/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

type AddTodoActionProps = {
  userId: string;
  tags: Array<TodoTagType>;
  onAddFinish: (todo: TodoType) => void;
};

export const AddTodoAction = ({ userId, onAddFinish, tags }: AddTodoActionProps) => {
  const [open, setOpen] = useState(false);
  const onFinish = (newTodo: TodoType) => {
    onAddFinish(newTodo);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-4 w-full py-6 todo-label-hover">
          <Plus />
          <span>New Todo</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="p-4">New Todo</DialogTitle>
        </DialogHeader>
        <Form userId={userId} onFinish={onFinish} tags={tags} />
      </DialogContent>
    </Dialog>
  );
};

type EditTodoActionProps = {
  userId: string;
  onEditFinish: (editedTodo: TodoType) => void;
  tags: Array<TodoTagType>;
  todo: TodoType;
};

export const EditTodoAction = ({ userId, onEditFinish, tags, todo }: EditTodoActionProps) => {
  const [open, setOpen] = useState(false);
  const onFinish = (newTodo: TodoType) => {
    onEditFinish(newTodo);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex mx-2 w-4 h-4 p-0 border-0 bg-none hover:bg-none">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="p-4">New Todo</DialogTitle>
        </DialogHeader>
        <Form userId={userId} onFinish={onFinish} tags={tags} todoData={todo} />
      </DialogContent>
    </Dialog>
  );
};

type DeleteTodoActionProps = {
  todoId: string;
  todoTitle: string;
  onDeleteFinish: (todoId: string) => void;
};

export const DeleteTododAction = ({ todoId, todoTitle, onDeleteFinish }: DeleteTodoActionProps) => {
  const [open, setOpen] = useState(false);
  const onDelete = async () => {
    setOpen(false);
    try {
      const response = await fetch('/api/tasks', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: todoId }),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse?.message);
      }
      toast({ title: `Tag ${todoTitle} removed successfully`, variant: 'info' });
      onDeleteFinish(todoId);
    } catch (error: any) {
      toast({ title: 'Problem deleting todo', description: error.message, variant: 'destructive' });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex mx-2 w-4 h-4 p-0 border-0 bg-none hover:bg-none">
          <Trash2 className="w-4 h-4 fill-none" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px]">
        <DialogHeader>
          <DialogTitle className="text-sm">Are you sure you want to delete "{todoTitle}"?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="default" onClick={() => setOpen(false)}>
            No
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

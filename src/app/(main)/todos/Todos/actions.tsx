import { Plus } from 'lucide-react';
import { useState } from 'react';

import Form from '@/app/(main)/todos/Todos/form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export const AddTodoAction = ({ userId }: { userId: string }) => {
  const [open, setOpen] = useState(false);
  const onFinish = () => {
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
        <Form userId={userId} onFinish={onFinish} />
      </DialogContent>
    </Dialog>
  );
};
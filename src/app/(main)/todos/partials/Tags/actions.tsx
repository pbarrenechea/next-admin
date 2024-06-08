import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import Form from '@/app/(main)/todos/partials/Tags/form';
import { TodoTagType } from '@/app/(main)/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

type ActionTagProps = {
  userId: string;
  onUpdate: (tag: TodoTagType) => void;
};

type EditTagProps = ActionTagProps & {
  tag: TodoTagType;
};

type DeleteTagProps = { tagId: string; tagName: string; onUpdate: (tagId: string) => void };

export const EditTag = ({ tag, userId, onUpdate }: EditTagProps) => {
  const [open, setOpen] = useState(false);
  const onFinish = (tag: TodoTagType) => {
    setOpen(false);
    onUpdate(tag);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-8 h-8 border-0 p-0 bg-none">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="p-4">Edit Tag</DialogTitle>
          <Form onFinish={onFinish} tagData={tag} userId={userId} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export const NewTag = ({ onUpdate, userId }: ActionTagProps) => {
  const [open, setOpen] = useState(false);
  const onFinish = (tag: TodoTagType) => {
    setOpen(false);
    onUpdate(tag);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="pl-0 mb-2 todo-label-hover">
          <Plus className="w-6 h-6" /> <span>New tag</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="p-4">New Tag</DialogTitle>
          <Form onFinish={onFinish} userId={userId} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export function DeleteTag({ tagId, tagName, onUpdate }: DeleteTagProps) {
  const [open, setOpen] = useState(false);
  const onDelete = async () => {
    setOpen(false);
    try {
      const response = await fetch('/api/taskLabels', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: tagId }),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse?.message);
      }
      toast({ title: `Tag ${tagName} removed successfully`, variant: 'info' });
      onUpdate(tagId);
    } catch (error: any) {
      toast({ title: 'Problem deleting tag', description: error.message, variant: 'destructive' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-8 h-8 border-0 p-0 bg-none hover:bg-none ml-2">
          <Trash2 width="20" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px]">
        <DialogHeader>
          <DialogTitle className="text-sm">Are you sure you want to delete {tagName}?</DialogTitle>
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
}

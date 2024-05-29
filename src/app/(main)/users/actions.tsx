import { Eye, Plus, Trash2 } from 'lucide-react';
import { User } from 'next-auth';
import { useEffect, useState } from 'react';

import Form from '@/app/(main)/users/form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Spinner from '@/components/ui/spinner';
import { toast } from '@/components/ui/use-toast';

type UserType = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: string;
  photoUrl: string;
  active: boolean;
};

export function DeleteUserAction({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const onDelete = async () => {
    setOpen(false);
    try {
      const response = await fetch('/api/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId }),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse?.message);
      }
      toast({ title: `User ${userId} removed successfully`, variant: 'info' });
      window.location.reload();
    } catch (error: any) {
      toast({ title: 'Problem deleting user', description: error.message, variant: 'destructive' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="action-btn p-0">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px]">
        <DialogHeader>
          <DialogTitle className="text-sm">Are you sure you want to delete the user {userId}?</DialogTitle>
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

export function ViewUserAction({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<UserType | null>(null);
  const getUserData = async () => {
    try {
      const response = await fetch(`/api/users?id=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse?.message);
      }
      const currentData = await response.json();
      setData(currentData);
      setIsLoading(false);
    } catch (error: any) {
      toast({ title: 'Problem getting the user', description: error.message, variant: 'destructive' });
    }
  };
  useEffect(() => {
    if (open && !data) {
      getUserData();
    }
  }, [getUserData, open, data]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="action-btn p-0">
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px]">
        {isLoading && <Spinner className="left-1/2 top-1/2 absolute" width="50" height="50" />}
        {!isLoading && (
          <>
            <DialogHeader>
              <DialogTitle className="text-sm">
                Details for {data?.name} {data?.lastName}
              </DialogTitle>
              <div>Here goes the content</div>
            </DialogHeader>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function NewUserAction() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-4">
          <Plus />
          <span>New User</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>New user</DialogTitle>
        </DialogHeader>

        <Form
          onFinish={() => {
            setOpen(false);
            window.location.reload();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

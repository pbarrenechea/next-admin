import { Eye, LucideProps, Plus, SquarePen, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { getUserData } from '@/app/(main)/requests/users';
import type { UserType } from '@/app/(main)/types';
import Form from '@/app/(main)/users/form';
import ViewUser from '@/app/(main)/users/view';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Spinner from '@/components/ui/spinner';
import { toast } from '@/components/ui/use-toast';

export function DeleteUserAction({ userId, userEmail }: { userId: string; userEmail: string }) {
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
      toast({ title: `User ${userEmail} removed successfully`, variant: 'info' });
      window.location.reload();
    } catch (error: any) {
      toast({ title: 'Problem deleting user', description: error.message, variant: 'destructive' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="action-btn p-0">
          <Trash2 width="20" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px]">
        <DialogHeader>
          <DialogTitle className="text-sm">Are you sure you want to delete the user {userEmail}?</DialogTitle>
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

/**
 * Properties for the inner Component of DialogUserData
 */
type UserDataComponentProps = {
  user: UserType | null;
  closeCallback: () => void;
  isLoading: boolean;
};

/**
 * @desc When a dialog needs user data, we can use this component and then
 * pass another Functional component as property in order to add the inner content.
 * @param userId
 * @param Component
 * @param Icon
 * @param title
 * @param paddingContent
 * @constructor
 */

const DialogUserData = ({
  userId,
  Component,
  Icon,
  title,
  paddingContent,
}: {
  userId: string;
  Component: React.FC<UserDataComponentProps>;
  Icon: React.FC<LucideProps>;
  title?: string;
  paddingContent?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<UserType | null>(null);
  const onError = (message: string) => {
    toast({ title: 'Problem getting the user', description: message, variant: 'destructive' });
  };
  const onSuccess = (data: UserType | null) => {
    setData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (open && !data) {
      getUserData({ userId, onError, onSuccess });
    }
  }, [open, data]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="action-btn p-0" title={title}>
          <Icon width="20" />
        </Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[600px] min-h-96 z-[90] ${paddingContent ? 'p-4' : 'p-0'}`}>
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        <Component isLoading={isLoading} user={data} closeCallback={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export function ViewUserAction({ userId }: { userId: string }) {
  return (
    <DialogUserData
      userId={userId}
      Icon={Eye}
      Component={({ user, closeCallback, isLoading }) => (
        <>
          {isLoading && <Spinner className="left-1/2 top-1/2 absolute" width="50" height="50" />}
          {!isLoading && (
            <>
              <button className="text-slate-100 absolute right-2 top-2 z-[1000]" onClick={closeCallback}>
                <X />
              </button>
              <ViewUser user={user} />
            </>
          )}
        </>
      )}
    />
  );
}

export function EditUserAction({ userId }: { userId: string }) {
  return (
    <DialogUserData
      userId={userId}
      Icon={SquarePen}
      title={'Edit user'}
      paddingContent
      Component={({ user, closeCallback, isLoading }) => (
        <>
          {isLoading && <Spinner className="left-1/2 top-1/2 absolute" width="50" height="50" />}
          {!isLoading && (
            <>
              {isLoading && <Spinner className="left-1/2 top-1/2 absolute" width="50" height="50" />}
              {!isLoading && (
                <Form
                  onFinish={() => {
                    closeCallback();
                    window.location.reload();
                  }}
                  userData={user || undefined}
                />
              )}
            </>
          )}
        </>
      )}
    />
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
          <DialogTitle className="p-4">New user</DialogTitle>
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

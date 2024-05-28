import { Plus } from 'lucide-react';
import { useState } from 'react';

import Form from '@/app/(main)/users/form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

function UserDialog() {
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
        <Form onFinish={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

export default UserDialog;

import { Pencil } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import ImageCropper from '@/app/(main)/profile/imageCropper';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

export function EditPictureAction({ image, userId }: { image?: string; userId?: string }) {
  const [open, setOpen] = useState(false);
  const { data: session, update } = useSession();
  const onSave = async (image: string) => {
    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          photoUrl: image,
          _id: userId,
        }),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse?.message);
      }
      await update({ ...session!.user, photoUrl: image });
    } catch (error: any) {
      toast({ title: 'Problem added user', description: error.message, variant: 'destructive' });
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center top-[100px]"
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="p-4">Edit profile picture</DialogTitle>
        </DialogHeader>
        <ImageCropper initialImage={image} onSave={onSave} />
      </DialogContent>
    </Dialog>
  );
}

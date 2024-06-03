import { Pencil, Save } from 'lucide-react';
import { useRef, useState } from 'react';

import { UserType } from '@/app/(main)/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Spinner from '@/components/ui/spinner';
import { toast } from '@/components/ui/use-toast';

type FieldEditorProps = {
  user: UserType | null;
  propName: 'jobTitle' | 'email' | 'location' | 'phone';
  setPropValue: (propName: string) => void;
};

const FieldEditor = ({ user, propName, setPropValue }: FieldEditorProps) => {
  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentValue, setCurrentValue] = useState(user?.[propName] || '');
  const inputRef = useRef(null);
  const updateField = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // @ts-ignore
          [propName]: inputRef?.current?.value,
          _id: user?._id,
        }),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse?.message);
      }

      // @ts-ignore
      setPropValue(inputRef?.current?.value);
    } catch (error: any) {
      toast({ title: 'Problem updating user', description: error.message, variant: 'destructive' });
    }
    setIsSaving(false);
    setEditMode(false);
  };
  return (
    <>
      {!editMode && <span className="inline-flex">{currentValue}</span>}
      {editMode && (
        <Input
          ref={inputRef}
          className="inline-flex w-1/2"
          value={currentValue}
          disabled={isSaving}
          onChange={(e) => setCurrentValue(e.target.value)}
        />
      )}
      {!editMode && (
        <Button variant="ghost" className="h-8 w-8 bg-none text-slate-600 inline-flex p-0">
          <Pencil
            className="w-4 h-4"
            onClick={() => {
              setEditMode(true);
            }}
          />
        </Button>
      )}
      {editMode && (
        <Button variant="ghost" className="h-8 w-8 bg-none text-slate-600 inline-flex p-0">
          <Save className="w-4 h-4" onClick={updateField} />
        </Button>
      )}
      {isSaving && <Spinner className="inline-flex" width="16" height="16" />}
    </>
  );
};

export default FieldEditor;

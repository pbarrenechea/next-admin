import { useEffect, useState } from 'react';

import { getTodoTagsData } from '@/app/(main)/requests/todoTags';
import { TodoTagType } from '@/app/(main)/types';
import { toast } from '@/components/ui/use-toast';

const Tags = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<Array<TodoTagType>>([]);

  const onError = (message: string) => {
    toast({ title: 'Problem getting the tags', description: message, variant: 'destructive' });
  };
  const onSuccess = (data: Array<TodoTagType>) => {
    setTags(data);
    setLoading(false);
  };

  useEffect(() => {
    if (userId) {
      getTodoTagsData({ userId, onError, onSuccess });
    }
  }, [userId]);
  return (
    <>
      {!loading && (
        <ul>
          {tags.map((tag: TodoTagType, index) => (
            <li
              key={`${tag.name}-${index}`}
              className=" flex space-x-2 text-sm capitalize py-2 cursor-pointer items-center font-medium text-slate-800 dark:text-slate-300"
            >
              <span
                className="ring-danger-500 ring-4 inline-block h-2 w-2 rounded-full ring-opacity-30 transition-all duration-150"
                style={{ background: tag.bgColor }}
              ></span>
              <span className="transition duration-150">{tag.name}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Tags;

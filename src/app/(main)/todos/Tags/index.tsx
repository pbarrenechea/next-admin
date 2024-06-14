import { useState } from 'react';

import { MAX_TODO_TAGS_PER_USER } from '@/app/(main)/config/settings';
import { DeleteTag, EditTag, NewTag } from '@/app/(main)/todos/Tags/actions';
import { TodoTagType } from '@/app/(main)/types';

type TagListProps = {
  userId: string;
  tags: Array<TodoTagType>;
  setTags: (tags: Array<TodoTagType>) => void;
};

const TagsList = ({ userId, tags, setTags }: TagListProps) => {
  const [selectedTag, setSelectedTag] = useState(-1);

  const addTag = (tag: TodoTagType) => {
    setTags([...tags, tag]);
  };

  const deleteTag = (tagId: string) => {
    setTags(tags.filter((t) => t._id !== tagId));
  };

  const updateTags = (tag: TodoTagType) => {
    setTags(
      // Update the item that matches with the tag param, otherwise return the same item.
      tags.map((item) => {
        if (item._id === tag._id) return tag;
        return item;
      }),
    );
  };
  const selectTag = (index: number) => {
    if (index !== selectedTag) {
      setSelectedTag(index);
    } else {
      setSelectedTag(-1);
    }
  };

  return (
    <>
      {tags.length < MAX_TODO_TAGS_PER_USER && <NewTag onUpdate={addTag} userId={userId} />}
      <ul>
        {tags.map((tag: TodoTagType, index) => (
          <li
            key={`${tag.name}-${index}`}
            className={`flex text-sm capitalize p-2 rounded-md mb-2 cursor-pointer items-center font-medium text-slate-800 dark:text-slate-300 todo-label-hover ${index === selectedTag ? 'todo-status-item-selected' : ''}`}
          >
            <div onClick={() => selectTag(index)} className="min-w-[130px]">
              <span
                className={`${index === selectedTag ? 'ring-gray-400 ring-4' : ''} inline-block h-2 w-2 rounded-full ring-opacity-30 transition-all duration-150`}
                style={{ background: tag.bgColor }}
              ></span>
              <span className="transition duration-150 ml-2">{tag.name}</span>
            </div>
            <EditTag tag={tag} onUpdate={updateTags} userId={userId} />
            <DeleteTag tagId={tag._id} onUpdate={deleteTag} tagName={tag.name} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default TagsList;

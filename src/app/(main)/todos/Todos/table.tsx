'use client';

import { Search, Star } from 'lucide-react';

import TimerTooltip from '@/app/(main)/todos/Todos/TimerTooltip';
import { DeleteTododAction, EditTodoAction } from '@/app/(main)/todos/Todos/actions';
import { TodoStatusType, TodoTagType, TodoType } from '@/app/(main)/types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import LoadingSpinner from '@/components/ui/spinner';
import { convertHexToRGBA } from '@/lib/utils';

type TodosTableProps = {
  tags: Array<TodoTagType>;
  isLoading: boolean;
  todos: Array<TodoType>;
  onCompletitionUpdate: (todoId: string, value: boolean) => void;
  onStarredUpdate: (todoId: string, value: boolean) => void;
  onDeleteFinish: (id: string) => void;
  onEditFinish: (todo: TodoType) => void;
  onLoadMore: () => void;
  totalResults: number;
  onQueryChange: (query: string) => void;
};

const TodosTable = ({
  isLoading,
  todos,
  onStarredUpdate,
  onCompletitionUpdate,
  onDeleteFinish,
  onEditFinish,
  tags,
  onLoadMore,
  totalResults,
  onQueryChange,
}: TodosTableProps) => {
  return (
    <div className="card rounded-md bg-white dark:bg-slate-800 shadow-base mx-2">
      {isLoading && <LoadingSpinner className="left-1/2 top-1/2 absolute" width="50" height="50" />}
      {!isLoading && (
        <>
          <div className="w-full inline-flex p-4 items-center">
            <Search className="w-6 h-6" />
            <input
              onChange={(e) => onQueryChange(e.target.value)}
              type="text"
              className="w-[30%] bg-transparent text-sm font-regular text-slate-600 dark:text-slate-300 transition duration-150 rounded px-2 py-1 focus:outline-none"
            />
          </div>
          <ul className="divide-y divide-slate-100 dark:divide-slate-700 -mb-6 h-full">
            {todos.map((todo: TodoType, index: number) => (
              <li
                key={`${todo.name}-${index}`}
                className="flex w-full items-center px-6 space-x-4 py-6 hover:-translate-y-1 hover:shadow-todo transition-all duration-200"
              >
                <div className="w-6">
                  <Checkbox
                    defaultChecked={todo.status === 'done'}
                    onCheckedChange={(value) => onCompletitionUpdate(todo._id, value as boolean)}
                  />
                </div>
                <div className="w-6">
                  {todo.starred ? (
                    <Star
                      className="w-4 h-4 text-amber-400 cursor-pointer fill-amber-500"
                      onClick={() => onStarredUpdate(todo._id, false)}
                    />
                  ) : (
                    <Star className="w-4 h-4 cursor-pointer" onClick={() => onStarredUpdate(todo._id, true)} />
                  )}
                </div>
                <div className="w-3/5">
                  <span
                    className={`flex-1 text-sm text-slate-600 dark:text-slate-300 truncate ${todo.status === TodoStatusType.Done ? 'line-through' : ''}`}
                  >
                    {todo.name}
                  </span>
                </div>
                <div className="flex">
                  <TimerTooltip dueDate={todo.dueDate} status={todo.status} />
                </div>
                <div className="w-1/4">
                  {todo.labels.map((label, index) => {
                    const tag = tags.find((t) => t._id === label._id);
                    return (
                      tag && (
                        <div
                          className="inline-block px-1 md:px-1 min-w-[60px] md:min-w-[70px] text-center mx-1 py-1 rounded-[999px] bg-opacity-50 text-[12px]"
                          key={`${index}-${tag.name}`}
                          style={{
                            background: convertHexToRGBA(tag.bgColor, 0.2),
                            color: convertHexToRGBA(tag.fontColor),
                          }}
                        >
                          {label.name}
                        </div>
                      )
                    );
                  })}
                </div>
                <div className="flex">
                  <EditTodoAction userId={todo.user} onEditFinish={onEditFinish} tags={tags} todo={todo} />
                  <DeleteTododAction todoId={todo._id} todoTitle={todo.name} onDeleteFinish={onDeleteFinish} />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="w-full text-center p-4 mt-20">
        <div className="w-full text-center">
          {totalResults > 0 && (
            <div className="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700  w-[25%] inline-block">
              <div
                className="bg-accent-foreground h-2.5 rounded-full"
                style={{
                  width: (todos.length / totalResults) * 100 + '%',
                }}
              ></div>
              <span className="text-[12px]">
                Showing {todos.length} of {totalResults}
              </span>
            </div>
          )}
        </div>
        {todos.length < totalResults && (
          <Button variant="ghost" onClick={onLoadMore} className="mt-2">
            <span>Load More</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default TodosTable;

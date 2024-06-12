'use client';

import { Star, Timer } from 'lucide-react';

import TimerTooltip from '@/app/(main)/todos/Todos/TimerTooltip';
import { TodoStatusType, TodoType } from '@/app/(main)/types';
import { Checkbox } from '@/components/ui/checkbox';
import LoadingSpinner from '@/components/ui/spinner';

type TodosTableProps = {
  isLoading: boolean;
  todos: Array<TodoType>;
  onCompletitionUpdate: (todoId: string, value: boolean) => void;
  onStarredUpdate: (todoId: string, value: boolean) => void;
};

const TodosTable = ({ isLoading, todos, onStarredUpdate, onCompletitionUpdate }: TodosTableProps) => {
  const currentDate = new Date();
  return (
    <div className="card rounded-md bg-white dark:bg-slate-800 shadow-base h-full mx-2">
      {isLoading && <LoadingSpinner className="left-1/2 top-1/2 absolute" width="50" height="50" />}
      {!isLoading && (
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
                {todo.labels.map((label, index) => (
                  <span
                    className="px-1 md:px-3 min-w-[60px] md:min-w-[90px] text-center mx-1 py-1 rounded-[999px] bg-opacity-25 text-xs"
                    key={`${index}-${label.name}`}
                    style={{ background: label.bgColor, color: label.fontColor }}
                  >
                    {label.name}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodosTable;

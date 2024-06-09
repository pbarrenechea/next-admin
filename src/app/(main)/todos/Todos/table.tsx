'use client';

import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/app/(main)/config/settings';
import { getTodosData } from '@/app/(main)/requests/todos';
import { TodoStatusType, TodoType } from '@/app/(main)/types';
import { Checkbox } from '@/components/ui/checkbox';
import LoadingSpinner from '@/components/ui/spinner';
import { toast } from '@/components/ui/use-toast';
import { formatTodoDate } from '@/lib/date';

const TodosTable = ({ userId }: { userId: string }) => {
  const [todos, setTodos] = useState<Array<TodoType>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const onSuccess = (newtTodos: Array<TodoType>) => {
    setTodos([...todos, ...newtTodos]);
  };
  const onError = (message: string) => {
    toast({ title: 'Problem getting the todos', description: message, variant: 'destructive' });
  };
  useEffect(() => {
    getTodosData({ userId, page, pageSize: DEFAULT_PAGE_SIZE, onError, onSuccess });
  }, [page]);

  const onStarredUpdate = (todoId: string, value: boolean) => {
    setTodos(
      todos.map((item) => {
        if (item._id === todoId) return { ...item, starred: value };
        return item;
      }),
    );
  };

  const onCompletitionUpdate = (todoId: string, value: boolean) => {
    setTodos(
      todos.map((item) => {
        if (item._id === todoId) return { ...item, status: value ? TodoStatusType.Done : TodoStatusType.Todo };
        return item;
      }),
    );
  };

  return (
    <div className="card rounded-md bg-white dark:bg-slate-800 shadow-base h-full mx-2">
      {isLoading && <LoadingSpinner className="left-1/2 top-1/2 absolute" width="50" height="50" />}
      {!isLoading && (
        <ul className="divide-y divide-slate-100 dark:divide-slate-700 -mb-6 h-full">
          {todos.map((todo, index) => (
            <li
              key={`${todo.name}-${index}`}
              className="flex items-center px-6 space-x-4 py-6 hover:-translate-y-1 hover:shadow-todo transition-all duration-200"
            >
              <div>
                <Checkbox
                  defaultChecked={todo.status === 'done'}
                  onCheckedChange={(value) => onCompletitionUpdate(todo._id, value as boolean)}
                />
              </div>
              <div>
                {todo.starred ? (
                  <Star
                    className="w-4 h-4 text-amber-400 cursor-pointer fill-amber-500"
                    onClick={() => onStarredUpdate(todo._id, false)}
                  />
                ) : (
                  <Star className="w-4 h-4 cursor-pointer" onClick={() => onStarredUpdate(todo._id, true)} />
                )}
              </div>
              <span
                className={`flex-1 text-sm text-slate-600 dark:text-slate-300 truncate ${todo.status === 'done' ? 'line-through' : ''}`}
              >
                {todo.name}
              </span>
              <span className="flex-1 text-sm text-slate-600 dark:text-slate-300 truncate">
                {formatTodoDate(todo.dueDate)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodosTable;

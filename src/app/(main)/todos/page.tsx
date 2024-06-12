'use client';

import { LayoutList, ListChecks, Star } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/app/(main)/config/settings';
import { getTodosData } from '@/app/(main)/requests/todos';
import Tags from '@/app/(main)/todos/Tags/index';
import { AddTodoAction } from '@/app/(main)/todos/Todos/actions';
import TodosTable from '@/app/(main)/todos/Todos/table';
import { TodoStatusType, TodoType } from '@/app/(main)/types';
import Spinner from '@/components/ui/spinner';
import { toast } from '@/components/ui/use-toast';

const TodosPage = () => {
  const { status, data } = useSession();
  const [todos, setTodos] = useState<Array<TodoType>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(DEFAULT_PAGE);

  const onGetTodosSuccess = (newTodos: Array<TodoType>) => {
    setIsLoading(false);
    setTodos([...todos, ...newTodos]);
  };

  const onGetTodosError = (message: string) => {
    setIsLoading(false);
    toast({ title: 'Problem getting the todos', description: message, variant: 'destructive' });
  };

  const onStarredUpdate = async (todoId: string, value: boolean) => {
    setTodos(
      todos.map((item) => {
        if (item._id === todoId) return { ...item, starred: value };
        return item;
      }),
    );
    await fetch('/api/tasks', {
      method: 'PUT',
      body: JSON.stringify({ starred: value, _id: todoId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const onCompletitionUpdate = async (todoId: string, value: boolean) => {
    const newValue = value ? TodoStatusType.Done : TodoStatusType.Todo;
    setTodos(
      todos.map((item) => {
        if (item._id === todoId) return { ...item, status: newValue };
        return item;
      }),
    );
    await fetch('/api/tasks', {
      method: 'PUT',
      body: JSON.stringify({ status: newValue, _id: todoId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const onAddFinish = async (todo: TodoType) => {
    setTodos([todo, ...todos]);
  };

  useEffect(() => {
    if (status === 'authenticated') {
      getTodosData({
        userId: data?.user.userId || '',
        page,
        pageSize: DEFAULT_PAGE_SIZE,
        onError: onGetTodosError,
        onSuccess: onGetTodosSuccess,
      });
    }
  }, [page, status]);

  return (
    <>
      {status === 'loading' && <Spinner className="absolute top-1/2 left-1/2" width="48" height="48" />}
      {status !== 'loading' && (
        <div className="flex overflow-hidden relative mt-4">
          {/* left panel */}
          <div className="transition-all duration-150 flex-none min-w-[260px] -left-full">
            <div className="card rounded-md bg-white dark:bg-slate-800 shadow-base h-full">
              <main className="card-body py-6 h-full flex flex-col">
                <div className="flex-1 h-full px-6">
                  <AddTodoAction userId={data?.user?.userId || ''} onAddFinish={onAddFinish} />
                  <ul>
                    <li className="todo-status-item ">
                      <LayoutList width={20} />{' '}
                      <span className="ml-1 text-sm text-muted-foreground dark:text-slate-400 ">Open</span>
                    </li>
                    <li className="todo-status-item">
                      <Star width={20} />
                      <span className="ml-1 text-sm text-muted-foreground dark:text-slate-400 ">Starred</span>
                    </li>
                    <li className="todo-status-item">
                      <ListChecks width={20} />
                      <span className=" ml-1 text-sm text-muted-foreground dark:text-slate-400 ">Completed</span>
                    </li>
                  </ul>
                  <div className="block py-4 text-slate-800 dark:text-slate-400 font-semibold text-xs uppercase">
                    Tags
                  </div>
                  <Tags userId={data?.user.userId || ''} />
                </div>
              </main>
            </div>
          </div>
          {/* right panel */}
          <div className="flex-1 md:w-[calc(100%-320px)]">
            <TodosTable
              isLoading={isLoading}
              todos={todos}
              onCompletitionUpdate={onCompletitionUpdate}
              onStarredUpdate={onStarredUpdate}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TodosPage;

'use client';

import { LayoutList, ListChecks, Star } from 'lucide-react';
import { useSession } from 'next-auth/react';

import Tags from '@/app/(main)/todos/Tags/index';
import { AddTodoAction } from '@/app/(main)/todos/Todos/actions';
import TodosTable from '@/app/(main)/todos/Todos/table';
import Spinner from '@/components/ui/spinner';

const TodosPage = () => {
  const { status, data } = useSession();
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
                  <AddTodoAction userId={data?.user?.userId || ''} />
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
            <TodosTable userId={data?.user.userId || ''} />
          </div>
        </div>
      )}
    </>
  );
};

export default TodosPage;

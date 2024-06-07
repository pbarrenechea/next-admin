'use client';

import { LayoutList, ListChecks, Star } from 'lucide-react';

import { AddTodoAction } from '@/app/(main)/todos/actions';
import Tags from '@/app/(main)/todos/partials/Tags';

const TodosPage = () => {
  return (
    <div className="flex overflow-hidden relative mt-4">
      {/* left panel */}
      <div className="transition-all duration-150 flex-none min-w-[260px] -left-full">
        <div className="card rounded-md bg-white dark:bg-slate-800 shadow-base h-full">
          <main className="card-body py-6 h-full flex flex-col">
            <div className="flex-1 h-full px-6">
              <AddTodoAction />
              <ul>
                <li className="todo-status-item ">
                  <LayoutList width={16} />{' '}
                  <span className="ml-1 text-md text-slate-400 dark:text-slate-400 ">Open</span>
                </li>
                <li className="todo-status-item">
                  <Star width={16} />
                  <span className="ml-1 text-md text-slate-400 dark:text-slate-400 ">Starred</span>
                </li>
                <li className="todo-status-item">
                  <ListChecks width={16} />
                  <span className=" ml-1 text-md text-slate-400 dark:text-slate-400 ">Completed</span>
                </li>
              </ul>
              <div className="block py-4 text-slate-800 dark:text-slate-400 font-semibold text-xs uppercase">Tags</div>
              <Tags />
            </div>
          </main>
        </div>
      </div>
      {/* right panel */}
      <div className="flex-1 md:w-[calc(100%-320px)]"></div>
    </div>
  );
};

export default TodosPage;

'use client';

import { LayoutList, ListChecks, Star } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/app/(main)/config/settings';
import { getTodoTagsData } from '@/app/(main)/requests/todoTags';
import { getTodosData } from '@/app/(main)/requests/todos';
import Tags from '@/app/(main)/todos/Tags/index';
import { AddTodoAction } from '@/app/(main)/todos/Todos/actions';
import TodosTable from '@/app/(main)/todos/Todos/table';
import { TodoStatusType, TodoTagType, TodoType } from '@/app/(main)/types';
import Spinner from '@/components/ui/spinner';
import { toast } from '@/components/ui/use-toast';
import { debounce } from '@/lib/debounce';

const TodosPage = () => {
  const { status, data } = useSession();
  const [userId, setUserId] = useState<string | null>(null);
  const [todos, setTodos] = useState<Array<TodoType>>([]);
  const [tags, setTags] = useState<Array<TodoTagType>>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [starredFilter, setStarredFilter] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [query, setQuery] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTags, setIsLoadingTags] = useState(true);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [totalResults, setTotalResults] = useState<number>(0);
  const onGetTodosSuccess = (newTodos: Array<TodoType>, numberOfItems: number) => {
    setIsLoading(false);
    setTodos(newTodos);
    setTotalResults(numberOfItems);
  };

  const onGetNewPageSuccess = (newTodos: Array<TodoType>, numberOfItems: number) => {
    setIsLoading(false);
    setTodos([...todos, ...newTodos]);
    setTotalResults(numberOfItems);
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

  const onAddFinish = (todo: TodoType) => {
    setTodos([todo, ...todos]);
  };

  const onEditFinish = (todo: TodoType) => {
    setTodos(todos.map((t) => (t._id === todo._id ? todo : t)));
  };

  const onDeleteFinish = (todoId: string) => {
    setTodos(todos.filter((todo) => todo._id !== todoId));
  };

  const onStatusFilterClick = (filter: string) => {
    setStarredFilter(false);
    if (filter === statusFilter) {
      setStatusFilter(null);
    } else {
      setStatusFilter(filter);
    }
  };

  const onStarredFilterClick = () => {
    setStatusFilter(null);
    setStarredFilter((prev) => !prev);
  };

  const onLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (status === 'authenticated') {
      setUserId(data?.user.userId || '');
      getTodoTagsData({
        userId: data?.user.userId || '',
        onError: (message: string) => {
          setIsLoadingTags(false);
          toast({ title: 'Problem getting the tags', description: message, variant: 'destructive' });
        },
        onSuccess: (data: Array<TodoTagType>) => {
          setIsLoadingTags(false);
          setTags(data);
        },
      });
    }
  }, [status]);

  const onQueryChange = useCallback(
    debounce((query: string) => {
      setQuery(query);
    }, 200),
    [],
  );

  useEffect(() => {
    if (status === 'authenticated') {
      setPage(0);
      getTodosData({
        userId: data?.user.userId || '',
        page: 0,
        ...(query ? { name: query } : {}),
        pageSize: DEFAULT_PAGE_SIZE,
        ...(selectedTag ? { tag: selectedTag } : {}),
        ...(starredFilter ? { starred: starredFilter } : {}),
        ...(statusFilter ? { status: statusFilter } : {}),
        onError: onGetTodosError,
        onSuccess: onGetTodosSuccess,
      });
    }
  }, [status, selectedTag, statusFilter, starredFilter, query]);

  useEffect(() => {
    if (page > 0) {
      getTodosData({
        userId: data?.user.userId || '',
        page,
        pageSize: DEFAULT_PAGE_SIZE,
        ...(query ? { name: query } : {}),
        ...(selectedTag ? { tag: selectedTag } : {}),
        ...(starredFilter ? { starred: starredFilter } : {}),
        ...(statusFilter ? { status: statusFilter } : {}),
        onError: onGetTodosError,
        onSuccess: onGetNewPageSuccess,
      });
    }
  }, [page]);

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
                  <AddTodoAction userId={data?.user?.userId || ''} onAddFinish={onAddFinish} tags={tags} />
                  <ul>
                    <li
                      onClick={() => onStatusFilterClick(`${TodoStatusType.Todo},${TodoStatusType.InProgress}`)}
                      className={`cursor-pointer todo-status-item ${statusFilter === `${TodoStatusType.Todo},${TodoStatusType.InProgress}` ? 'todo-status-item-selected' : ''}`}
                    >
                      <LayoutList width={20} />{' '}
                      <span className="ml-1 text-sm text-muted-foreground dark:text-slate-400 ">Open</span>
                    </li>
                    <li
                      onClick={onStarredFilterClick}
                      className={`cursor-pointer todo-status-item ${starredFilter ? 'todo-status-item-selected' : ''}`}
                    >
                      <Star width={20} />
                      <span className="ml-1 text-sm text-muted-foreground dark:text-slate-400 ">Starred</span>
                    </li>
                    <li
                      onClick={() => onStatusFilterClick(`${TodoStatusType.Done}`)}
                      className={`cursor-pointer todo-status-item ${statusFilter === TodoStatusType.Done ? 'todo-status-item-selected' : ''}`}
                    >
                      <ListChecks width={20} />
                      <span className=" ml-1 text-sm text-muted-foreground dark:text-slate-400 ">Completed</span>
                    </li>
                  </ul>
                  <div className="block py-4 text-slate-800 dark:text-slate-400 font-semibold text-xs uppercase">
                    Tags
                  </div>
                  {!isLoadingTags && (
                    <Tags
                      userId={data?.user.userId || ''}
                      tags={tags}
                      setTags={setTags}
                      setFilterTag={setSelectedTag}
                    />
                  )}
                </div>
              </main>
            </div>
          </div>
          {/* right panel */}
          <div className="flex-1 md:w-[calc(100%-320px)]">
            <TodosTable
              tags={tags}
              isLoading={isLoading}
              todos={todos}
              onCompletitionUpdate={onCompletitionUpdate}
              onStarredUpdate={onStarredUpdate}
              onDeleteFinish={onDeleteFinish}
              onEditFinish={onEditFinish}
              onLoadMore={onLoadMore}
              totalResults={totalResults}
              onQueryChange={onQueryChange}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TodosPage;

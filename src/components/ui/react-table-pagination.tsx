import { ChevronLeft, ChevronRight } from 'lucide-react';

import type { Table } from '@tanstack/react-table';

interface ReactTablePaginationProps<T> {
  table: Table<T>;
}

const ReactTablePagination = <T,>({ table }: ReactTablePaginationProps<T>) => {
  return (
    <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
      <div className=" flex items-center space-x-3 rtl:space-x-reverse">
        <span className=" flex space-x-2  rtl:space-x-reverse items-center">
          <span className=" text-sm font-medium text-slate-600 dark:text-slate-300">Go</span>
          <span>
            <input
              type="number"
              className=" form-control py-2"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(pageNumber);
              }}
              style={{ width: '50px' }}
            />
          </span>
        </span>
        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
          Page{' '}
          <span>
            {table.getState().pagination.pageIndex + 1} of {table.getPageOptions().length}
          </span>
        </span>
      </div>
      <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
        <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
          <button
            className={` ${!table.getCanPreviousPage() ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </button>
        </li>
        {table.getPageOptions().map((page, pageIdx) => (
          <li key={pageIdx}>
            <button
              aria-current="page"
              className={` ${
                pageIdx === table.getState().pagination.pageIndex
                  ? 'bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium '
                  : 'bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  '
              }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
              onClick={() => table.setPageIndex(pageIdx)}
            >
              {page + 1}
            </button>
          </li>
        ))}
        <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
          <button
            className={` ${!table.getCanNextPage() ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ReactTablePagination;

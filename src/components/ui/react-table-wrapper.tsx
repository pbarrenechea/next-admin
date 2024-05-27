import { useMemo, useState } from 'react';

import ReactTablePagination from '@/components/ui/react-table-pagination';
import Spinner from '@/components/ui/spinner';
import { useQuery } from '@tanstack/react-query';
import {
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

const ReactTableWrapper = ({ columns, endPoint, resource }: { endPoint: string; columns: any; resource: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => {
    setIsLoading(true);
    const response = await fetch(`${endPoint}?page=${pageIndex}&pageSize=${pageSize}`);
    const currentData = await response.json();
    setIsLoading(false);
    return {
      rows: currentData[resource],
      pageCount: currentData.pages,
      rowCount: currentData.items,
    };
  };

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 2,
  });

  const dataQuery = useQuery({
    queryKey: ['data', pagination],
    queryFn: () => fetchData(pagination),
  });
  const defaultData = useMemo(() => [], []);

  const table = useReactTable({
    data: dataQuery.data?.rows ?? defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    rowCount: dataQuery.data?.rowCount,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    state: {
      pagination,
    },
  });

  return (
    <>
      {isLoading && <Spinner className="left-1/2 top-1/2 absolute" width="50" height="50" />}
      {!isLoading && (
        <>
          <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
            <thead className="bg-slate-200 dark:bg-slate-700 border-t border-slate-100 dark:border-slate-800">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} scope="col" className=" table-th ">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="table-td">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <ReactTablePagination table={table} />
        </>
      )}
    </>
  );
};

export default ReactTableWrapper;

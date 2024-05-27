'use client';

import { Users2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import ReactTablePagination from '@/components/ui/react-table-pagination';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import {
  PaginationState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

type UserTableType = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: string;
  photoUrl: string;
  active: boolean;
};

const columnHelper = createColumnHelper<UserTableType>();
/* Table definitions */
const columns = [
  // Name + profile image
  columnHelper.accessor((row) => ({ name: `${row.name} ${row.lastName}`, photoUrl: row.photoUrl }), {
    id: 'name',
    header: 'Name',
    cell: (info) => (
      <>
        <span className="inline-flex items-center">
          <span className="w-7 h-7 rounded-full mr-3 flex-none bg-slate-600">
            <img
              src={info.getValue().photoUrl}
              alt={info.getValue().name}
              className="object-cover w-full h-full rounded-full"
            />
          </span>
          <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">{info.getValue().name}</span>
        </span>
      </>
    ),
    footer: (info) => info.column.id,
  }),
  // Email
  columnHelper.accessor((row) => row.email, {
    id: 'email',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Email</span>,
    footer: (info) => info.column.id,
  }),
  // Role
  columnHelper.accessor((row) => row.role, {
    id: 'Role',
    cell: (info) => <>{info.getValue()}</>,
    header: () => <span>Role</span>,
    footer: (info) => info.column.id,
  }),
  // Active
  columnHelper.accessor((row) => row.active, {
    id: 'Active',
    cell: (info) => (
      <span className="block w-full">
        <span
          className={`inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${info.getValue() ? 'text-success-500 bg-success-500' : 'text-warning-500 bg-warning-500'}`}
        >
          {info.getValue() ? 'Active' : 'Inactive'}
        </span>
      </span>
    ),
    header: () => <span>Active</span>,
    footer: (info) => info.column.id,
  }),
];

const fetchData = async ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => {
  const response = await fetch(`/api/users?page=${pageIndex}&pageSize=${pageSize}`);
  const rows = await response.json();
  return {
    rows: rows,
    pageCount: 2,
    rowCount: 4,
  };
};

const UsersPageComponent = () => {
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
      <div className="pr-4 mt-4">
        <div className="card rounded-md bg-white dark:bg-slate-800 shadow-base custom-class">
          <header className="card-header no-border">
            <div>
              <div className="card-title custom-class">Users</div>
            </div>
          </header>
          <main className="card-body p-6">
            <div className="overflow-x-auto -mx-6">
              <div className="inline-block min-w-full align-middle p-4">
                <div className="overflow-hidden ">
                  <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                    <thead className="bg-slate-200 dark:bg-slate-700 border-t border-slate-100 dark:border-slate-800">
                      {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <th key={header.id} scope="col" className=" table-th ">
                              {header.isPlaceholder
                                ? null
                                : flexRender(header.column.columnDef.header, header.getContext())}
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
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

const queryClient = new QueryClient();

const UsersPage = () => (
  <QueryClientProvider client={queryClient}>
    <UsersPageComponent />
  </QueryClientProvider>
);

export default UsersPage;

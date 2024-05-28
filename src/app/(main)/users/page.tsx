'use client';

import { Eye, SquarePen, Trash, Trash2 } from 'lucide-react';

import UserDialog from '@/app/(main)/users/dialog';
import ReactTableWrapper from '@/components/ui/react-table-wrapper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';

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
    cell: (info) => (
      <a className="text-info-600" href={`mailto:${info.getValue()}`}>
        {info.getValue()}
      </a>
    ),
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
  // Empty for actions
  columnHelper.accessor((row) => row, {
    id: 'Actions',
    cell: (info) => (
      <div className="flex space-x-3 rtl:space-x-reverse">
        <button className="action-btn">
          <Eye />
        </button>
        <button className="action-btn">
          <SquarePen />
        </button>
        <button className="action-btn">
          <Trash2 />
        </button>
      </div>
    ),
    header: () => <></>,
    footer: (info) => info.column.id,
  }),
];

const queryClient = new QueryClient();

const UsersPage = () => (
  <QueryClientProvider client={queryClient}>
    <div className="pr-4 mt-4">
      <div className="card rounded-md bg-white dark:bg-slate-800 shadow-base custom-class">
        <header className="card-header no-border">
          <div>
            <div className="card-title custom-class">Users</div>
          </div>
        </header>
        <main className="card-body p-6 min-h-96">
          <div className="overflow-x-auto -mx-6">
            <div className="inline-block min-w-full align-middle p-4">
              <div className="overflow-hidden ">
                <div className="relative inline-block w-full text-right">
                  <UserDialog />
                </div>
                <ReactTableWrapper columns={columns} endPoint="/api/users" resource="users" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </QueryClientProvider>
);

export default UsersPage;

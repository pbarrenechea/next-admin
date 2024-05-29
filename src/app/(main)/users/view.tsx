import { Mail, MapPin, Phone, ShieldCheck, X } from 'lucide-react';

import { UserType } from '@/app/(main)/types';

const ViewUser = ({ user }: { user: UserType | null }) => {
  return (
    <div className="px-[35px] pb-5 md:pt-[44px] pt-5 rounded-lg bg-white dark:bg-slate-800 relative z-[1]">
      <div className="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/3 md:max-h-[180px] h-[100px] w-full z-[-1] rounded-t-lg"></div>
      {/* Profile dark area */}
      <div className="flex-none md:text-start text-center w-full mt-8">
        <div className="md:flex items-center md:space-x-6 rtl:space-x-reverse">
          <div className="flex-none">
            <div className="md:h-[120px] md:w-[120px] h-[90px] w-[90px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
              <img
                className="w-full h-full object-cover rounded-full"
                src={user?.photoUrl || ''}
                alt={`${user?.name} ${user?.lastName}`}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="text-2xl font-medium md:text-slate-100 text-slate-900 dark:text-slate-200 mb-[3px]">
              {user?.name} {user?.lastName}
            </div>
            <div className="text-sm font-light md:text-slate-100 text-slate-900 dark:text-slate-200">
              {user?.jobTitle}
            </div>
          </div>
        </div>
      </div>
      {/* Personal data */}
      <div className="rounded-md bg-white dark:bg-slate-800 shadow-base mt-4">
        <header className="card-header ">
          <div>
            <div className="card-title custom-class">Info</div>
          </div>
        </header>
        <main className="card-body p-6">
          <ul className="list space-y-8">
            <li className="flex space-x-3 rtl:space-x-reverse">
              <div className="flex-none text-sm text-slate-600 dark:text-slate-300">
                <Mail />
              </div>
              <div className="ml-2">
                <div className="uppercase text-sm text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">EMAIL</div>
                <a href={`mailto:${user?.email}`} className="text-sm text-slate-600 dark:text-slate-50">
                  {user?.email}
                </a>
              </div>
            </li>
            <li className="flex space-x-3 rtl:space-x-reverse">
              <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                <Phone />
              </div>
              <div className="ml-2">
                <div className="uppercase text-sm text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">Phone</div>
                <span className="text-sm text-slate-600 dark:text-slate-50">{user?.phone}</span>
              </div>
            </li>
            <li className="flex space-x-3 rtl:space-x-reverse">
              <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                <MapPin />
              </div>
              <div className="ml-2">
                <div className="uppercase text-sm text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">Location</div>
                <span className="text-sm text-slate-600 dark:text-slate-50">{user?.location}</span>
              </div>
            </li>
            <li className="flex space-x-3 rtl:space-x-reverse">
              <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                <ShieldCheck />
              </div>
              <div className="ml-2">
                <div className="uppercase text-sm text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">Role</div>
                <span className="text-sm text-slate-600 dark:text-slate-50">{user?.role}</span>
              </div>
            </li>

            <li className="flex space-x-3 rtl:space-x-reverse">
              <div className="ml-2">
                <span
                  className={`inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${user?.active ? 'text-success-500 bg-success-500' : 'text-warning-500 bg-warning-500'}`}
                >
                  {user?.active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </li>
          </ul>
        </main>
      </div>
    </div>
  );
};

export default ViewUser;

'use client';

import { Mail, MapPin, Pencil, Phone } from 'lucide-react';
import { useSession } from 'next-auth/react';

const ProflilePage = () => {
  const { data } = useSession();
  const user = data?.user || {};
  return (
    <div className="mt-4 pr-4">
      {/* Profile Header */}
      <div className="profiel-wrap px-[35px] pb-10 md:pt-[84px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]">
        <div className="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg"></div>
        {/* Profile dark area */}
        <div className="profile-box flex-none md:text-start text-center">
          <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
            <div className="flex-none">
              <div className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={user?.photoUrl || ''}
                  alt={`${user?.name} ${user?.lastName}`}
                />
                <a
                  href="#"
                  className="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"
                >
                  <Pencil className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="flex-1">
              <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]">
                {user?.name} {user?.lastName}
              </div>
              <div className="text-sm font-light text-slate-600 dark:text-slate-400">{user?.role}</div>
            </div>
          </div>
        </div>
        {/* Profile cards */}
        <div className="profile-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4">
          <div className="flex-1">
            <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">$32,400</div>
            <div className="text-sm text-slate-600 font-light dark:text-slate-300">Total Balance</div>
          </div>
          <div className="flex-1">
            <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">200</div>
            <div className="text-sm text-slate-600 font-light dark:text-slate-300">Board Card</div>
          </div>
          <div className="flex-1">
            <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">3200</div>
            <div className="text-sm text-slate-600 font-light dark:text-slate-300">Calender Events</div>
          </div>
        </div>
      </div>
      {/* Profile bottom */}
      <div className="grid grid-cols-12 gap-6 mt-4">
        {/* Profile bottom left */}
        <div className="lg:col-span-4 col-span-12">
          <div className="card rounded-md bg-white dark:bg-slate-800 shadow-base custom-class">
            <header className="card-header ">
              <div>
                <div className="card-title custom-class">Info</div>
              </div>
            </header>
            <main className="card-body p-6">
              <ul className="list space-y-8">
                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Mail />
                  </div>
                  <div className="ml-2">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      EMAIL
                    </div>
                    <a href={`mailto:${user?.email}`} className="text-base text-slate-600 dark:text-slate-50">
                      {user?.email}
                    </a>
                  </div>
                </li>
                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Phone />
                  </div>
                  <div className="ml-2">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      Phone
                    </div>
                    <span className="text-base text-slate-600 dark:text-slate-50">+34 650317786</span>
                  </div>
                </li>
                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <MapPin />
                  </div>
                  <div className="ml-2">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      Location
                    </div>
                    <span className="text-base text-slate-600 dark:text-slate-50">
                      Paseo de la direccion, 119, Tetuan, Madrid
                    </span>
                  </div>
                </li>
              </ul>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProflilePage;

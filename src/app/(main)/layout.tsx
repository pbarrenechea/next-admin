'use client';

import { ChevronsRight, Home } from 'lucide-react';
import { SessionProvider } from 'next-auth/react';

import Breadcrumb from '@/app/(main)/BreadCrumb';
import Header from '@/app/(main)/Header';
import Sidebar from '@/app/(main)/Sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

const MainLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SessionProvider>
      <TooltipProvider>
        <Header />
        <Sidebar />
        <div className="content-wrapper transition-all duration-150 lg:ml-[248px]">
          <div className="page-content page-min-height">
            <div className="mt-4 hidden lg:flex">
              <Breadcrumb />
            </div>
            <div>{children}</div>
          </div>
        </div>
      </TooltipProvider>
    </SessionProvider>
  );
};

export default MainLayout;

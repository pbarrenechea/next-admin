'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

import Breadcrumb from '@/app/(main)/BreadCrumb';
import Header from '@/app/(main)/Header';
import Sidebar from '@/app/(main)/Sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

const MainLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="light" themes={['dark', 'light']}>
        <TooltipProvider>
          <Header />
          <Sidebar />
          <div className="content-wrapper transition-all duration-150 lg:ml-[242px] bg-primary-foreground mt-0 pl-2">
            <div className="page-content page-min-height">
              <div className="pt-4 hidden lg:flex">
                <Breadcrumb />
              </div>
              <div>{children}</div>
            </div>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default MainLayout;

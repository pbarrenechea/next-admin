'use client';

import { ChevronsRight, Home } from 'lucide-react';
import { SessionProvider } from 'next-auth/react';

import Header from '@/app/(main)/Header';
import Sidebar from '@/app/(main)/Sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
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
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <Home />
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronsRight />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronsRight />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </TooltipProvider>
    </SessionProvider>
  );
};

export default MainLayout;

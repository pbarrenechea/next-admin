'use client';

import { ChevronsRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';

import BreadCrumbPaths from '@/app/(main)/config/breadcrumbs';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const BreadCrumb = () => {
  const pathname = usePathname();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Home />
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {BreadCrumbPaths[pathname].map((item: { link: string; label: string }, index) => (
          <>
            <BreadcrumbSeparator>
              <ChevronsRight />
            </BreadcrumbSeparator>
            <BreadcrumbItem key={`${index}-${item.label}`}>
              <BreadcrumbLink key={`${index}-${item.label}-link`} href={item.link}>
                {item.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;

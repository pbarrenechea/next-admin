'use client';

import { SessionProvider } from 'next-auth/react';

const MainLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default MainLayout;

'use client';

import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/login');
    }
  }, [status]);
  const user = session?.user || {};
  const logout = () => signOut({ redirect: true, callbackUrl: '/login' });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {status === 'authenticated' && (
        <>
          <div>
            Logged as: {user?.name} {user?.lastName} {user?.role} {user?.email}
          </div>
          <div></div>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </main>
  );
}

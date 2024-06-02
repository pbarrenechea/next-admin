'use client';

import { LogOut as LogoutIcon, User as UserIcon } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { getUserData } from '@/app/(main)/requests/users';
import { UserType } from '@/app/(main)/types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';

const ProfileDropdown = () => {
  const { status, data } = useSession();
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const onError = (message: string) => {
    toast({ title: 'Problem getting the user', description: message, variant: 'destructive' });
  };
  const onSuccess = (data: UserType | null) => {
    setUser(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (status !== 'loading') {
      getUserData({ userId: data?.user?.userId || '', onError, onSuccess });
    }
  }, [status]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const logout = () => signOut({ redirect: true, callbackUrl: '/login' });

  return (
    <>
      {status !== 'loading' && !isLoading && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="outline-0">
              <div className="flex items-center">
                <div className="flex-1 ltr:mr-[10px] rtl:ml-[10px]">
                  <div className="lg:h-8 lg:w-8 h-7 w-7 rounded-full mr-2">
                    <img
                      alt={`${user?.name} ${user?.lastName}`}
                      src={user?.photoUrl || ''}
                      className="block w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <div className="flex-none text-slate-600 dark:text-white text-sm font-normal items-center lg:flex hidden overflow-hidden text-ellipsis whitespace-nowrap">
                  <span>
                    {user?.name} {user?.lastName}
                  </span>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 z-[1000] hidden lg:inline-block">
            <DropdownMenuItem
              onClick={() => {
                router.push('/profile');
              }}
            >
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>
              <LogoutIcon className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default ProfileDropdown;

'use client';

import { Mail, MapPin, Phone } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { EditPictureAction } from '@/app/(main)/profile/actions';
import FieldEditor from '@/app/(main)/profile/fieldEditor';
import { getUserData } from '@/app/(main)/requests/users';
import type { UserType } from '@/app/(main)/types';
import { toast } from '@/components/ui/use-toast';

const ProflilePage = () => {
  const { status, data } = useSession();
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const onError = (message: string) => {
    toast({ title: 'Problem getting the user', description: message, variant: 'destructive' });
  };
  const onSuccess = (data: UserType | null) => {
    setUser(data);
    setImageUrl(data?.photoUrl || '');
    setJobTitle(data?.jobTitle || '');
    setEmail(data?.email || '');
    setPhone(data?.phone || '');
    setLocation(data?.location || '');
    setIsLoading(false);
  };

  useEffect(() => {
    if (status !== 'loading') {
      getUserData({ userId: data?.user?.userId || '', onError, onSuccess });
    }
  }, [status]);

  return (
    <>
      {status !== 'loading' && !isLoading && (
        <div className="mt-4 pr-4 pl-4 lg:pl-0">
          {/* Profile Header */}
          <div className="profiel-wrap px-[35px] pb-10 pt-10 rounded-lg bg-white dark:bg-slate-800  space-y-6 justify-between items-end relative z-[1]">
            <div className="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 h-[150px] w-full z-[-1] rounded-t-lg"></div>
            {/* Profile dark area */}
            <div className="profile-box flex-none text-center">
              <div className="items-end">
                <div className="flex-none">
                  <div className="h-[140px] w-[140px] ml-auto mr-auto mb-4 rounded-full ring-4 ring-slate-100 relative">
                    <img
                      className="w-full h-full object-cover rounded-full"
                      src={user?.photoUrl || ''}
                      alt={`${user?.name} ${user?.lastName}`}
                    />
                    <EditPictureAction image={imageUrl || ''} userId={user?._id || ''} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]">
                    {user?.name} {user?.lastName}
                  </div>
                  <div className="text-sm font-light text-slate-600 dark:text-slate-400 items-center">
                    <FieldEditor propName={'jobTitle'} user={user} setPropValue={setJobTitle} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Profile bottom */}
          <div className="grid grid-cols-12 gap-6 mt-4">
            {/* Profile bottom left */}
            <div className="col-span-12">
              <div className="card rounded-md bg-white dark:bg-slate-800 shadow-base custom-class">
                <header className="card-header ">
                  <div>
                    <div className="card-title custom-class">Info</div>
                  </div>
                </header>
                <main className="card-body p-6">
                  <ul className="list w-full">
                    <li className="flex mt-8 items-center">
                      <div className="inline-flex text-2xl text-slate-600 dark:text-slate-300">
                        <Mail />
                      </div>
                      <div className="ml-2 inline-flex items-baseline w-full">
                        <div className="hidden md:w-1/6 xl:w-1/12 md:flex  uppercase text-sm text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                          EMAIL:
                        </div>
                        <FieldEditor propName={'email'} user={user} setPropValue={setEmail} />
                      </div>
                    </li>
                    <li className="flex mt-8 items-center">
                      <div className="inline-flex text-2xl text-slate-600 dark:text-slate-300">
                        <Phone />
                      </div>
                      <div className="ml-2 inline-flex items-baseline w-full">
                        <div className="hidden md:w-1/6 xl:w-1/12 md:flex  uppercase text-sm text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                          Phone:
                        </div>
                        <FieldEditor propName={'phone'} user={user} setPropValue={setPhone} />
                      </div>
                    </li>
                    <li className="flex mt-8 items-center">
                      <div className="inline-flex text-2xl text-slate-600 dark:text-slate-300">
                        <MapPin />
                      </div>
                      <div className="ml-2 inline-flex items-baseline w-full">
                        <div className="hidden md:w-1/6 xl:w-1/12 md:flex uppercase text-sm text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                          Location:
                        </div>
                        <FieldEditor propName={'location'} user={user} setPropValue={setLocation} />
                      </div>
                    </li>
                  </ul>
                </main>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProflilePage;

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import LoginForm from './form';

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="auth-box  flex-col w-1/2">
        <LoginForm />
      </div>
    </section>
  );
}

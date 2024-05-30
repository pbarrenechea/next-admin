import { getServerSession } from 'next-auth/next';

export default async function () {
  const session = await getServerSession();
  if (!session) {
    throw new Error('Session not found');
  }
}

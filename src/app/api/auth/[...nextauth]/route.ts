import { compare } from 'bcrypt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

import connectDB from '@/app/api/lib/db';
import Users from '@/app/api/models/users';

const handler = NextAuth({
  debug: true,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: { type: 'text' },
        password: { type: 'text' },
      },
      async authorize(credentials, req) {
        await connectDB();
        const currentUser = await Users.findOne({ email: credentials?.email });
        const passwordCorrect = await compare(credentials?.password || '', currentUser.password);
        if (passwordCorrect) {
          console.log(currentUser);
          return {
            id: currentUser.email,
            email: currentUser.email,
            name: currentUser.name + currentUser.lastName,
            image: currentUser.photoUrl,
          };
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };

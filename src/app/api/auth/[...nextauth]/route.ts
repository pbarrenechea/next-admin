import { compare } from 'bcrypt';
import { DefaultSession } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

import connectDB from '@/app/api/lib/db';
import Users from '@/app/api/models/users';

/**
 * redefined Session interface for intellisense on the rest of the project.
 * This helps to identify user fields at the time of using useSession().
 */
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      lastName?: string | null;
      role?: string | null;
      photoUrl?: string | null;
    } & DefaultSession['user'];
  }
}

const handler = NextAuth({
  debug: true,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    /**
     * @desc Implement JWT callback in order to bypass user data to the session.
     * @param token
     * @param user
     * @param profile
     */
    async jwt({ token, user, profile }) {
      user && (token.user = user);
      return token;
    },
    /**
     * Implemented session callback in order to recieve data from jwt callback to populate add additional fields to session.
     * @param session
     * @param token
     */
    async session({ session, token }) {
      // Add custom fields to the session object
      session && (session.user = token.user || {});
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: { type: 'text' },
        password: { type: 'text' },
      },
      /**
       * @desc authorize function. First check if a user exists, then it validates password.
       * @param credentials
       * @param req
       */
      async authorize(credentials, req) {
        await connectDB();
        const currentUser = await Users.findOne({ email: credentials?.email });
        if (!currentUser) {
          throw new Error('Email does not exist');
        }
        const passwordCorrect = await compare(credentials?.password || '', currentUser.password);
        if (passwordCorrect) {
          return {
            id: currentUser.email,
            name: currentUser.name,
            lastName: currentUser.lastName,
            photoUrl: currentUser.photoUrl,
            role: currentUser.role,
            email: currentUser.email,
          };
        }
        throw new Error('Invalid password');
      },
    }),
  ],
});

export { handler as GET, handler as POST };

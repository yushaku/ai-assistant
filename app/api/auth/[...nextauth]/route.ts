import prisma from '@/lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    })
  ],
  secret: process.env.SECRET,
  session: { strategy: 'jwt' },
  callbacks: {
    signIn({ account, profile }) {
      if (
        account?.provider === 'google' &&
        profile?.email?.endsWith('@huce.edu.vn')
      ) {
        return true
      } else {
        return false
      }
    },
    jwt: ({ token, user }) => {
      if (!user?.email) return token

      const email = user.email
      const match = email.match(/\d+/);

      const schoolId = match?.at(0)
      if (!schoolId) return token
      const isAdmin = schoolId.length <= 3 ? true : false

      return {
        ...token,
        isAdmin,
        id: user.id
      }
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
          isAdmin: token?.isAdmin ?? false
        }
      }
    },
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };


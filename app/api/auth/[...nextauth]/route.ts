import prisma from '@/lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

const {
  SUPPER_ADMIN,
  GOOGLE_CLIENT_ID = '',
  GOOGLE_CLIENT_SECRET = '',
  GITHUB_ID = '',
  GITHUB_SECRET = ''
} = process.env

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET
    }),
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
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
      const match = email.match(/\d+/)

      const schoolId = match?.at(0)
      if (!schoolId) return token
      const isAdmin =
        schoolId.length <= 3 ? true : email === SUPPER_ADMIN ? true : false

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
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

import NextAuth, { type NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

const authOptions: NextAuthOptions = {
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
    signIn({ user, account, profile }) {
      if (
        account?.provider === 'google' &&
        profile?.email?.endsWith('@huce.edu.vn')
      ) {

        return true
      } else {
        return false
      }
    },

    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey
        }
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user
        return {
          ...token,
          id: u.id
        }
      }
      return token
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

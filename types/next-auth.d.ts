/* eslint-disable no-unused-vars */
import NextAuth from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    expires: string
    user: {
      id: string
      name: string
      email: string
      image: string
      isAdmin: boolean
    }
  }
}

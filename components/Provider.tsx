'use client'

import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { ThemeProvider } from '@material-tailwind/react'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider>
        <main className="relative bg-dark">
          <Navbar />
          <section className="flex">
            <Sidebar />
            <article className="flex-1">{children}</article>
          </section>
        </main>
      </ThemeProvider>
    </SessionProvider>
  )
}

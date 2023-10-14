'use client'

import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { ThemeProvider } from '@material-tailwind/react'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { Prompt } from './Prompt'

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider>
        <main className="relative bg-dark">
          <Navbar />
          <section className="flex overflow-hidden">
            <Sidebar />
            <article className="flex-1">{children}</article>
            <Prompt />
          </section>
        </main>
      </ThemeProvider>
    </SessionProvider>
  )
}

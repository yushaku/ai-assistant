'use client'

import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { ThemeProvider } from '@material-tailwind/react'
import React from 'react'

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative bg-dark">
      <ThemeProvider>
        <Navbar />
        <section className="flex">
          <Sidebar />
          <article className="flex-1">{children}</article>
        </section>
      </ThemeProvider>
    </main>
  )
}

'use client'

import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import React from 'react'

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative bg-dark">
      <Navbar />
      <section className="flex">
        <Sidebar />
        <article>{children}</article>
      </section>
    </main>
  )
}

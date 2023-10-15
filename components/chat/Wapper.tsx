import { Prompt } from '../Prompt'
import { Sidebar } from '../Sidebar'
import React from 'react'

export const Wapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="relative flex w-screen overflow-hidden">
      <Sidebar />
      <article className="relative h-screen flex-1 p-24">{children}</article>
      <Prompt />
    </section>
  )
}

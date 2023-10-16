import { LeftSidebar } from '../LeftSidebar'
import { RightSideBar } from '../RightSideBar'
import React from 'react'

export const Wapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="relative flex w-screen overflow-hidden">
      <LeftSidebar />
      <article className="relative h-screen flex-1 p-24">{children}</article>
      <RightSideBar />
    </section>
  )
}

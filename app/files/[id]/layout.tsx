import { Sidebar } from '@/component/files/Sidebar'
import React from 'react'

type Props = {
  params: { id: string }
  children: React.ReactNode
}

export default async function RootLayout({ children }: Props) {
  return (
    <section className="flex h-screen gap-4">
      <Sidebar />
      {children}
    </section>
  )
}

import { Sidebar } from './Sidebar'
import { Hydrate } from '@tanstack/react-query'
import React from 'react'
import { usePrefetchFile } from 'services'

type Props = {
  params: { id: string }
  children: React.ReactNode
}

export default async function RootLayout({ children, params }: Props) {
  const data = await usePrefetchFile(params.id)

  return (
    <Hydrate state={data}>
      <section className="flex h-screen gap-4">
        <Sidebar />
        {children}
      </section>
    </Hydrate>
  )
}

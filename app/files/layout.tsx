import React from 'react'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <section className="no-scrollbar flex h-screen overflow-y-scroll bg-dark">
      <article className="flex-1">{children}</article>
    </section>
  )
}

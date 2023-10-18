export default function RootLayout({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <section className="flex h-screen bg-dark">
      <article className="flex-1 px-12 pb-12 pt-24">{children}</article>
    </section>
  )
}

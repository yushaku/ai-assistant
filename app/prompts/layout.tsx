export default function RootLayout({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <section className="container mx-auto h-screen bg-dark p-24">
      {children}
    </section>
  )
}

import { PromtSidebar } from '@/component/promts/PromtSidebar'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <section className="flex h-screen bg-dark">
      <PromtSidebar />
      <article className="flex-1 px-6 pt-24">{children}</article>
    </section>
  )
}

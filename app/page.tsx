import { LeftSidebar } from '@/component/LeftSidebar'
import Conversation from '@/component/chat/Conversation'

export default async function HomePage() {
  return (
    <section className="relative flex w-screen overflow-hidden">
      <LeftSidebar />

      <article className="h-screen flex-1 md:p-24">
        <Conversation />
      </article>
    </section>
  )
}

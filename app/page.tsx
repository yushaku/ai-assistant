import Conversation from '@/component/chat/Conversation'

export const runtime = 'edge'
export const preferredRegion = 'home'

export default async function Chat() {
  return (
    <div className="h-screen">
      <Conversation />
    </div>
  )
}

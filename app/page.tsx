import Conversation from '@/component/chat/Conversation'
import { Wapper } from '@/component/chat/Wapper'

export const runtime = 'edge'
export const preferredRegion = 'home'

export default async function Chat() {
  return (
    <Wapper>
      <Conversation />
    </Wapper>
  )
}

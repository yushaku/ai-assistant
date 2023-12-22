'use client'

import Conversation from '@/component/chat/Conversation'
import { useGetMessage } from 'services'

export interface ChatPageProps {
  params: { id: string }
}

export default function Chat({ params }: ChatPageProps) {
  const threadId = params.id

  // const chat = await fetch(`http://localhost:3000/api/read?id=${threadId}`)
  //   .then((res) => {
  //     console.log(res.ok)
  //     return res.json()
  //   })
  //   .catch((err) => console.error(err))
  //
  // console.log(chat)
  //
  // if (!chat) notFound()
  const { data: thread } = useGetMessage(threadId)

  return <Conversation initialMessages={thread?.messages} id={threadId} />
}

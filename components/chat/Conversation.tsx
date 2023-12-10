'use client'

import { ChatPanel } from './ChatPanel'
import { ChatScrollAnchor } from './ChatScrollAnchor'
import { EmptyScreem } from './EmptyScream'
import { BotAnswer, UserQuestion } from '@/component/chat/QA'
import { SelectModel } from '@/component/dropdown/modelOptions'
import { globlePrompt } from '@/lib/atom'
import { AI_MODELS } from '@/lib/constants'
import type { Message } from 'ai/react'
import { useChat } from 'ai/react'
import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useRecoilValue } from 'recoil'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}

export default function Conversation({ initialMessages, id }: ChatProps) {
  const { data: session } = useSession()
  const [model, setModel] = useState(AI_MODELS.at(0)!)
  const componentRef = useRef<HTMLDivElement>(null)

  const SUPPER_ADMIN = process.env.NEXT_PUBLIC_SUPPER_ADMIN
  const examplePromt = useRecoilValue(globlePrompt)

  const { messages, input, isLoading, stop, append, reload, setInput } =
    useChat({
      api: model.href,
      initialMessages,
      body: { id },
      onFinish: () => {},
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText)
        }
      }
    })

  useEffect(() => {
    setInput(examplePromt)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examplePromt])

  return (
    <>
      <div
        ref={componentRef}
        className="no-scrollbar relative mx-auto mb-auto h-[75dvh] max-w-[900px] overflow-y-scroll"
      >
        <SelectModel
          show={session?.user.email === SUPPER_ADMIN}
          onclick={(model) => setModel(model)}
        />
        {messages.length ? (
          <>
            {messages.map((m, index) => (
              <div className="mb-6" key={`${m.id}${index}`}>
                {m.role === 'user' ? (
                  <UserQuestion
                    question={m.content}
                    image={session?.user.image}
                  />
                ) : (
                  <BotAnswer answer={m.content} />
                )}
              </div>
            ))}

            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreem setInput={setInput} />
        )}
      </div>

      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />
    </>
  )
}

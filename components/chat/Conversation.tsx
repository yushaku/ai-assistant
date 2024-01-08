'use client'

import type { FormReport } from '../dialog/ReportDialog'
import { ReportDialog } from '../dialog/ReportDialog'
import { ChatPanel } from './ChatPanel'
import { ChatScrollAnchor } from './ChatScrollAnchor'
import { EmptyScreem } from './EmptyScream'
import { BotAnswer, BotLoading, UserQuestion } from '@/component/chat/QA'
import { SelectModel } from '@/component/dropdown/modelOptions'
import { globlePrompt } from '@/lib/atom'
import { AI_MODELS } from '@/lib/constants'
import type { Message } from 'ai/react'
import { useChat } from 'ai/react'
import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useRecoilValue } from 'recoil'
import { useCreateReport } from 'services'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}

const initReport = { question: '', answer: '' }

export default function Conversation({ initialMessages, id }: ChatProps) {
  const [report, setReport] = useState(initReport)
  const { data: session } = useSession()
  const [model, setModel] = useState(AI_MODELS.at(0)!)
  const componentRef = useRef<HTMLDivElement>(null)
  const { mutate: sendReport } = useCreateReport()

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

  function handleReport(data: FormReport) {
    setReport(initReport)
    sendReport({
      ...data,
      ...report
    })
    toast.success('success send report')
  }

  return (
    <>
      <div
        ref={componentRef}
        className="no-scrollbar relative mx-auto mb-auto h-[90dvh] max-w-[900px] overflow-y-scroll md:h-[75dvh]"
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
                  <BotAnswer
                    toggleReport={() =>
                      setReport({
                        question: messages[index - 1]?.content ?? '',
                        answer: m.content
                      })
                    }
                    reload={reload}
                    answer={m.content}
                  />
                )}
              </div>
            ))}

            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreem setInput={setInput} isAuth={true} />
        )}

        <div>{isLoading ? <BotLoading /> : null}</div>
      </div>

      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        messages={messages}
        input={input}
        setInput={setInput}
      />

      <ReportDialog
        open={report.question !== ''}
        onOpen={() => setReport(initReport)}
        onConfirm={(data) => handleReport(data)}
      />
    </>
  )
}

'use client'

import { BotAnswer, UserQuestion } from '@/component/chat/QA'
import { Wapper } from '@/component/chat/Wapper'
import { SelectModel } from '@/component/dropdown/modelOptions'
import { globlePrompt } from '@/lib/atom'
import { AI_MODELS } from '@/lib/constants'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { Input } from '@material-tailwind/react'
import { useChat } from 'ai/react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

export default function Chat() {
  const [model, setModel] = useState(AI_MODELS.at(0)!)
  const { data } = useSession()

  const SUPPER_ADMIN = process.env.NEXT_PUBLIC_SUPPER_ADMIN
  const examplePromt = useRecoilValue(globlePrompt)

  const {
    messages,
    input,
    isLoading,
    setInput,
    handleInputChange,
    handleSubmit
  } = useChat({ api: model.href })

  useEffect(() => {
    setInput(examplePromt)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examplePromt])

  return (
    <Wapper>
      <SelectModel
        show={data?.user.email === SUPPER_ADMIN}
        onclick={(model) => setModel(model)}
      />
      <section className="no-scrollbar mx-auto mb-auto h-[75dvh] max-w-[900px] overflow-y-scroll">
        {messages.map((m) => (
          <div className="mb-6" key={m.id}>
            {m.role === 'user' ? (
              <UserQuestion question={m.content} />
            ) : (
              <BotAnswer answer={m.content} />
            )}
          </div>
        ))}
      </section>

      <form
        onSubmit={handleSubmit}
        className="absolute bottom-1 right-1/2 flex h-24 w-full max-w-[900px] translate-x-1/2 space-x-4 rounded-lg"
      >
        <div className="w-full rounded-lg">
          <div className="flex gap-5 rounded-lg bg-dark-100 p-3">
            <Input
              value={input}
              onChange={handleInputChange}
              className="text-gray-200"
              label="Your Question..."
              color="blue"
            ></Input>

            <button
              disabled={isLoading}
              type="submit"
              className="btn-contained flex-center"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </form>
    </Wapper>
  )
}

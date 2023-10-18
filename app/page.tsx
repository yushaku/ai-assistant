'use client'

import { BotAnswer, UserQuestion } from '@/component/chat/QA'
import { Wapper } from '@/component/chat/Wapper'
import { SelectModel } from '@/component/dropdown/modelOptions'
import { globlePrompt } from '@/lib/atom'
import { AI_MODELS } from '@/lib/constants'
import {
  MicrophoneIcon,
  NewspaperIcon,
  PaperAirplaneIcon,
  PhotoIcon
} from '@heroicons/react/24/solid'
import { useChat } from 'ai/react'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

export default function Chat() {
  const [model, setModel] = useState(AI_MODELS.at(0)!)
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
      <SelectModel onclick={(model) => setModel(model)} />
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
        className="absolute bottom-24 right-1/2 flex h-24 w-full max-w-[900px] translate-x-1/2 space-x-4 rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="w-full rounded-lg">
          <div className="rounded-t-lg bg-dark-100 p-1">
            <textarea
              rows={3}
              value={input}
              onChange={handleInputChange}
              className="w-full"
              placeholder="Your Question..."
            ></textarea>
          </div>

          <div className="flex-between rounded-b-lg bg-dark-100 px-3 py-2">
            <button
              disabled={isLoading}
              type="submit"
              className="btn-contained flex-center"
            >
              Send <PaperAirplaneIcon className="ml-3 h-5 w-5" />
            </button>

            <div className="flex space-x-1 pl-0">
              <button className="rounded-lg p-2 text-gray-100 hover:bg-blue-600">
                <NewspaperIcon className="h-5 w-5" />
              </button>
              <button className="rounded-lg p-2 text-gray-100 hover:bg-blue-600">
                <PhotoIcon className="h-5 w-5" />
              </button>
              <button className="rounded-lg p-2 text-gray-100 hover:bg-blue-600">
                <MicrophoneIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </Wapper>
  )
}

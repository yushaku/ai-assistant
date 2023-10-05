'use client'

import { BotAnswer, UserQuestion } from '@/component/chat/QA'
import { SelectModel } from '@/component/dropdown/modelOptions'
import {
  MicrophoneIcon,
  NewspaperIcon,
  PaperAirplaneIcon,
  PhotoIcon
} from '@heroicons/react/24/solid'
import { useChat } from 'ai/react'
import { AI_MODELS } from 'lib/constants'
import { useState } from 'react'

export default function Chat() {
  const [model, setModel] = useState(AI_MODELS.at(0)!)

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: model.href
    })

  return (
    <div className="relative h-screen p-24">
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
          <div className="rounded-t-lg bg-gray-800">
            <textarea
              rows={3}
              value={input}
              onChange={handleInputChange}
              className="w-full"
              placeholder="Your Question..."
            ></textarea>
          </div>

          <div className="flex-between rounded-b-lg bg-gray-600 px-3 py-2">
            <button
              disabled={isLoading}
              type="submit"
              className="btn-contained flex-center"
            >
              Send <PaperAirplaneIcon className="ml-3 h-5 w-5" />
            </button>

            <div className="flex space-x-1 pl-0 sm:pl-2">
              <button className="rounded p-2 text-gray-100 hover:bg-gray-600 hover:text-white">
                <NewspaperIcon className="h-5 w-5" />
              </button>
              <button className="rounded p-2 text-gray-100 hover:bg-gray-600 hover:text-white">
                <PhotoIcon className="h-5 w-5" />
              </button>
              <button className="rounded p-2 text-gray-100 hover:bg-gray-600 hover:text-white">
                <MicrophoneIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

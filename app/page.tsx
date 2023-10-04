'use client'

import { BotAnswer, UserQuestion } from '@/component/chat/QA'
import { SelectModel } from '@/component/dropdown/modelOptions'
import { useChat } from 'ai/react'
import { AI_MODELS } from 'lib/constants'
import { useState } from 'react'

export default function Chat() {
  const [model, setModel] = useState(AI_MODELS.at(0)!)

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: model.href
  })

  return (
    <div className="relative h-screen p-24">
      <SelectModel onclick={(model) => setModel(model)} />

      <section className="mx-auto mb-auto h-[75dvh] w-[900px] overflow-y-scroll">
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
        className="absolute bottom-8 right-1/2 flex w-[900px] translate-x-1/2 space-x-4"
        onSubmit={handleSubmit}
      >
        <textarea
          className="w-full rounded-md border border-black p-2 text-black"
          value={input}
          onChange={handleInputChange}
          placeholder="Say something..."
        />

        <button className="btn-outline" type="submit">
          Send
        </button>
      </form>
    </div>
  )
}

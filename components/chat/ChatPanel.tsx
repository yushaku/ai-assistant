import { Loading } from '../Loading'
import { ButtonScrollToBottom } from './button-scroll-to-bottom'
import { PaperAirplaneIcon, StopIcon } from '@heroicons/react/24/solid'
import { Button } from '@material-tailwind/react'
import { type UseChatHelpers } from 'ai/react'
import { useEnterSubmit } from 'hooks/useEnterSubmit'
import { useRouter } from 'next/navigation'
import type { FormEvent } from 'react'
import React, { useEffect, useRef } from 'react'
import Textarea from 'react-textarea-autosize'
import { useCreateThread } from 'services'

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    'append' | 'isLoading' | 'messages' | 'stop' | 'input' | 'setInput'
  > {
  id?: string
}

export function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  input,
  setInput
}: ChatPanelProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()
  const { mutateAsync: create, isLoading: isCreating } = useCreateThread()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!input?.trim()) return
    setInput('')

    if (id) {
      await append({ id, content: input, role: 'user' })
    } else {
      const thread = await create({ title: input.substring(0, 22) })
      router.push(`/chat/${thread.id}`)
    }
  }

  return (
    <div className="fixed inset-x-0 bottom-5">
      <ButtonScrollToBottom />

      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex h-10 items-center justify-center">
          {isLoading && (
            <Button onClick={stop} className="flex-center gap-2 bg-dark-100">
              <StopIcon className="h-5 w-5" />
              Stop generating
            </Button>
          )}
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="relative">
          <Textarea
            ref={inputRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={id ? 'Input a message' : 'Enter a title'}
            spellCheck={false}
            className="min-h-[60px] w-full resize-none py-5 pl-4 pr-16 text-base text-gray-200"
          />

          <div className="absolute bottom-1/2 right-5 translate-y-1/2">
            <button
              className="btn-contained flex gap-2"
              type="submit"
              disabled={isLoading || input === ''}
            >
              {!id && 'Create thread'}
              <PaperAirplaneIcon className="h-5 w-5" color="white" />
            </button>
          </div>
        </form>
      </div>

      <Loading show={isCreating} />
    </div>
  )
}

import { ButtonScrollToBottom } from './button-scroll-to-bottom'
import {
  ArrowPathIcon,
  PaperAirplaneIcon,
  StopIcon
} from '@heroicons/react/24/solid'
import { Button } from '@material-tailwind/react'
import { type UseChatHelpers } from 'ai/react'
import { useEnterSubmit } from 'hooks/useEnterSubmit'
import type { FormEvent } from 'react'
import React, { useEffect, useRef } from 'react'
import Textarea from 'react-textarea-autosize'

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | 'append'
    | 'isLoading'
    | 'reload'
    | 'messages'
    | 'stop'
    | 'input'
    | 'setInput'
  > {
  id?: string
}

export function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages
}: ChatPanelProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!input?.trim()) return
    setInput('')
    await append({ id, content: input, role: 'user' })
  }

  return (
    <div className="fixed inset-x-0 bottom-5">
      <ButtonScrollToBottom />

      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex h-10 items-center justify-center">
          {isLoading ? (
            <Button onClick={stop} className="flex-center gap-2 bg-dark-100">
              <StopIcon className="h-5 w-5" />
              Stop generating
            </Button>
          ) : (
            messages?.length > 0 && (
              <Button
                onClick={() => reload()}
                className="flex-center gap-2 bg-dark-100"
              >
                <ArrowPathIcon className="mr-2 h-5 w-5" />
                Regenerate response
              </Button>
            )
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
            placeholder="Send a message."
            spellCheck={false}
            className="min-h-[60px] w-full resize-none py-5 pl-4 pr-16 text-gray-200 sm:text-sm"
          />

          <div className="absolute bottom-1/2 right-5 translate-y-1/2">
            <button
              className="btn-contained"
              type="submit"
              disabled={isLoading || input === ''}
            >
              <PaperAirplaneIcon className="h-5 w-5" color="white" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

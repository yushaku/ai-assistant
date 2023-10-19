'use client'

import { Loading } from './Loading'
import { ThreadDialog } from './dialog/ThreadDialog'
import { ConfirmDeteleDialog } from './dialog/confirmDetele'
import {
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/solid'
import {
  Popover,
  PopoverContent,
  PopoverHandler
} from '@material-tailwind/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Resizable } from 're-resizable'
import React, { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import {
  useCreateThread,
  useDeleteThread,
  useGetThreads,
  useUpdateThread
} from 'services'

export const LeftSidebar = () => {
  const { data: threads } = useGetThreads()
  const { mutate: create, isLoading: isCreating } = useCreateThread()
  const { mutate: update, isLoading: isUpdating } = useUpdateThread()
  const { mutate: deleteThread, isLoading: isDeleting } = useDeleteThread()

  const [show, setShow] = useState(true)
  const [state, setState] = useState<'create' | 'update' | 'delete' | null>(
    null
  )
  const [thread, setThread] = useState({ id: '', title: '' })
  const searchParams = useSearchParams()
  const threadId = searchParams.get('thread') ?? ''

  useHotkeys('alt+h', () => setShow(!show), [show])
  const style = show ? '' : 'translate-x-[-100%]'
  const btnStyle = show
    ? 'right-[-5%] rotate-180 bg-dark'
    : 'right-[-15%] bg-dark-100'

  return (
    <Resizable
      className={`${style} animate mt-14 bg-dark-200`}
      enable={{
        left: false,
        right: true,
        top: false,
        bottom: false
      }}
      maxWidth={500}
      minWidth={200}
    >
      <div className="p-6">
        <button
          onClick={() => setShow(!show)}
          className={`${btnStyle} animate absolute top-2 z-[1] rounded-full border-dark-200 p-1 hover:bg-blue-500`}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>

        <button
          onClick={() => setState('create')}
          className="flex-center btn-contained gap-4"
        >
          <PlusIcon className="h-5 w-5" />
          create new chat
        </button>

        <p className="mt-6">Recently</p>
      </div>

      <ul className="flex flex-col gap-3">
        {threads?.map(({ id, title }) => {
          const styleSelected =
            threadId === id
              ? 'rounded-r-lg border-l-4 border-blue-500 bg-dark-100'
              : 'rounded-r-lg border-l-4 border-transparent bg-dark-200'

          return (
            <li key={id}>
              <Link
                href={`?thread=${id}`}
                className={`${styleSelected} flex-start group relative gap-4 p-4 hover:shadow-lg`}
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
                {title}

                <Popover placement="bottom-end">
                  <PopoverHandler className="group/func absolute bottom-1/2 right-1 translate-y-1/2 rounded-full p-2 opacity-0 group-hover:bg-dark-200/70 group-hover:opacity-100">
                    <EllipsisVerticalIcon
                      strokeWidth={10}
                      width="40px"
                      height="40px"
                    />
                  </PopoverHandler>

                  <PopoverContent className="group/func-hover:opacity-100">
                    <ul className="grid gap-3">
                      <li
                        onClick={() => {
                          setState('update')
                          setThread({ id, title })
                        }}
                        className="flex-start gap-3 rounded-lg px-4 py-2 hover:bg-green-200"
                      >
                        <PencilIcon className="h-5 w-5" /> Edit
                      </li>
                      <li
                        onClick={() => {
                          setState('delete')
                          setThread({ id, title })
                        }}
                        className="flex-start gap-3 rounded-lg px-4 py-2 hover:bg-red-200"
                      >
                        <TrashIcon className="h-5 w-5" /> Delete
                      </li>
                    </ul>
                  </PopoverContent>
                </Popover>
              </Link>
            </li>
          )
        })}
      </ul>

      <Loading show={isCreating || isDeleting || isUpdating} />

      <ThreadDialog
        title={thread.title}
        open={state === 'create' || state === 'update'}
        onOpen={() => setState(null)}
        onConfirm={(title) => {
          create({ title })
          setState(null)
        }}
      />

      <ConfirmDeteleDialog
        open={state === 'delete' && thread.id !== ''}
        handleSubmit={() => deleteThread(thread.id)}
        handleOpen={() => setState(null)}
      />
    </Resizable>
  )
}

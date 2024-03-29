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
  PopoverHandler,
  Spinner
} from '@material-tailwind/react'
import { Resizable } from '@yushaku/re-resizable'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import {
  useCreateThread,
  useDeleteThread,
  useGetThreads,
  useUpdateThread
} from 'services'

export const LeftSidebar = () => {
  const { status } = useSession()

  const { data: threads, isLoading } = useGetThreads()
  const { mutateAsync: create, isLoading: isCreating } = useCreateThread()
  const { mutate: update, isLoading: isUpdating } = useUpdateThread()
  const { mutate: deleteThread, isLoading: isDeleting } = useDeleteThread()

  const [show, setShow] = useState(true)
  const [state, setState] = useState<'create' | 'update' | 'delete' | null>(
    null
  )
  const [thread, setThread] = useState({ id: '', title: '' })
  const router = useRouter()
  const searchParams = usePathname()
  const threadId = searchParams.split('/')[2]

  useHotkeys('alt+h', () => setShow(!show), [show])

  const style = show
    ? 'translate-x-[-100%] lg:translate-x-0'
    : 'translate-x-0 lg:translate-x-[-100%]'

  const btnStyle = show
    ? 'right-[-5%] rotate-180 bg-dark'
    : 'right-[-15%] bg-dark-100'

  async function handleConfirm(title: string) {
    setState(null)
    if (state === 'create') {
      const newone = await create({ title })
      router.push(`/chat/${newone.id}`)
    } else {
      update({ title, id: thread.id })
    }
  }

  if (status === 'unauthenticated') return <div></div>

  return (
    <div
      className={`${style} animate absolute left-0 top-[5%] z-10 h-[95%] bg-dark-200`}
    >
      <Resizable
        enable={{
          left: false,
          right: true,
          top: false,
          bottom: false
        }}
        maxWidth={500}
        minWidth={200}
        className={`${status === 'authenticated' ? 'block' : 'hidden'}`}
        defaultSize={{ width: 300 }}
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
        </div>

        <ul className="flex flex-col">
          {threads?.map(({ id, title }) => {
            const styleSelected =
              threadId === id
                ? 'rounded-r-lg border-l-4 border-blue-500 bg-dark-100'
                : 'rounded-r-lg border-l-4 border-transparent bg-dark-200'

            return (
              <li key={id}>
                <Link
                  href={`/chat/${id}`}
                  className={`${styleSelected} flex-start group relative gap-4 p-4 hover:bg-dark-100 hover:text-blue-400`}
                >
                  <ChatBubbleLeftRightIcon className="h-5 w-5" />
                  {title}

                  <Popover placement="bottom-start">
                    <PopoverHandler className="group/func absolute bottom-1/2 right-1 translate-y-1/2 rounded-full p-2 opacity-0 group-hover:bg-dark-200/70 group-hover:opacity-100">
                      <EllipsisVerticalIcon
                        strokeWidth={10}
                        width="40px"
                        height="40px"
                      />
                    </PopoverHandler>

                    <PopoverContent className="group/func-hover:opacity-100 z-50">
                      <ul className="grid cursor-pointer gap-3">
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
          {isLoading && (
            <li className="mx-auto">
              <Spinner color="blue" />
            </li>
          )}
        </ul>
      </Resizable>

      <Link
        href="https://github.com/yushaku"
        className="link absolute bottom-2 w-full text-center text-sm text-gray-500"
      >
        Designed and created by Yushaku
      </Link>

      <Loading show={isCreating || isDeleting || isUpdating} />

      <ThreadDialog
        title={thread.title}
        open={state === 'create' || state === 'update'}
        onOpen={() => setState(null)}
        onConfirm={handleConfirm}
      />

      <ConfirmDeteleDialog
        open={state === 'delete' && thread.id !== ''}
        handleSubmit={() => {
          deleteThread(thread.id)
          setState(null)
        }}
        handleOpen={() => setState(null)}
      />
    </div>
  )
}

"use client"

import { ChatBubbleLeftRightIcon, PlusIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Resizable } from 're-resizable'
import React, { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

export const Sidebar = () => {
  const [show, setShow] = useState(true)

  useHotkeys('alt+h', () => setShow(!show), [show])
  const style = show ? "" : "translate-x-[-100%]"
  const btnStyle = show ? "right-[-5%] rotate-180 bg-dark" : "right-[-15%] bg-dark-100"

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
      <div className='p-6'>
        <button
          onClick={() => setShow(!show)}
          className={`${btnStyle} animate absolute top-2 z-[1] rounded-full border-dark-200 p-1 hover:bg-blue-500`}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>

        <button className="flex-center btn-contained gap-4">
          <PlusIcon className="h-5 w-5" />
          create new chat
        </button>

        <p className="mt-6">Recently</p>
      </div>

      <ul className="flex flex-col gap-3">
        <li className="flex-start gap-4 rounded-lg border-l-4 border-transparent p-4">
          <ChatBubbleLeftRightIcon className="h-5 w-5" />
          how to pass in test
        </li>

        <li className="flex-start gap-4 rounded-r-lg border-l-4 border-blue-500 bg-dark-100 p-4">
          <ChatBubbleLeftRightIcon className="h-5 w-5" />
          how to flirt with my crush
        </li>
      </ul>
    </Resizable>
  )
}

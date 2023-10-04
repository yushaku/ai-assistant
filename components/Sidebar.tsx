import { ChatBubbleLeftRightIcon, PlusIcon } from '@heroicons/react/24/solid'
import { Resizable } from 're-resizable'
import React from 'react'

export const Sidebar = () => {
  return (
    <Resizable
      className="mt-14 bg-dark-100 px-6"
      enable={{
        left: false,
        right: true,
        top: false,
        bottom: false
      }}
      maxWidth={500}
      minWidth={200}
    >
      <button className="flex-center btn-contained gap-4">
        <PlusIcon className="h-5 w-5" />
        create new chat
      </button>

      <p className="mb-3 mt-6">Recently</p>

      <ul className="flex flex-col gap-3">
        <li className="flex-start gap-4 rounded-lg bg-gray-700 px-4 py-2">
          <ChatBubbleLeftRightIcon className="h-5 w-5" />
          how to pass in test
        </li>

        <li className="flex-start gap-4 rounded-lg bg-gray-700 px-4 py-2">
          <ChatBubbleLeftRightIcon className="h-5 w-5" />
          how to flirt with my crush
        </li>
      </ul>
    </Resizable>
  )
}
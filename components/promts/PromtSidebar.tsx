'use client'

import {
  ChatBubbleLeftRightIcon,
  ChevronRightIcon
} from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Resizable } from 're-resizable'
import React, { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

const nav = [
  { name: 'Category', href: '/prompts/category' },
  { name: 'Prompts', href: '/prompts' }
]

export const PromtSidebar = () => {
  const pathname = usePathname()
  const [show, setShow] = useState(true)

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
      </div>

      <div className="flex flex-col gap-3">
        {nav.map((item, index) => {
          const styleSelected =
            pathname === item.href
              ? 'rounded-r-lg border-l-4 border-blue-500 bg-dark-100'
              : 'rounded-lg border-l-4 border-transparent'

          return (
            <Link
              key={index}
              href={item.href}
              className={`${styleSelected} flex-start gap-4 p-4 hover:bg-dark-100`}
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </div>
    </Resizable>
  )
}

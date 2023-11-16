'use client'

import { ArrowDownIcon } from '@heroicons/react/24/solid'
import { useAtBottom } from 'hooks/useAtBottom'
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

export function ButtonScrollToBottom({
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  const isAtBottom = useAtBottom()

  return (
    <button
      className={`absolute right-4 top-1 z-10 bg-dark-100 transition-opacity duration-300 sm:right-8 md:top-2 ${
        isAtBottom ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={() =>
        window.scrollTo({
          top: document.body.offsetHeight,
          behavior: 'smooth'
        })
      }
      {...props}
    >
      <ArrowDownIcon />
      <span className="sr-only">Scroll to bottom</span>
    </button>
  )
}

'use client'

import { ArrowRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React from 'react'
import { useGetThreads } from 'services'

export const ThreadList = () => {
  const { data: threads } = useGetThreads(3)

  return (
    <div>
      <ul className="mt-2">
        {threads?.map((thread) => {
          return (
            <li key={thread.id}>
              <Link
                className="flex-start gap-2 text-blue-200"
                href={`/chat/${thread.id}`}
              >
                <ArrowRightIcon className="h-5 w-5" />
                {thread.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

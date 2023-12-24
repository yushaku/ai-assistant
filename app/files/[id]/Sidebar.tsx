'use client'

import { UPLOAD_FILE_PATH } from '@/lib/constants'
import {
  ChevronRightIcon,
  DocumentTextIcon,
  PlusIcon
} from '@heroicons/react/24/solid'
import { Resizable } from '@yushaku/re-resizable'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useGetFiles } from 'services'

export const Sidebar = () => {
  const { data: fileList } = useGetFiles()
  const pathname = usePathname().split('/').pop()
  const [show, setShow] = useState(true)

  useHotkeys('alt+h', () => setShow(!show), [show])
  const style = show
    ? 'translate-x-[-100%] lg:translate-x-0'
    : 'translate-x-0 lg:translate-x-[-100%]'

  const btnStyle = show
    ? 'right-[-5%] rotate-180 bg-dark'
    : 'right-[-15%] bg-dark-100'

  return (
    <div
      className={`${style} animate no-scrollbar absolute left-0 top-[5%] z-10 h-[95%] overflow-x-auto overflow-y-scroll bg-dark-200 lg:relative`}
    >
      <Resizable
        enable={{
          left: false,
          right: true,
          top: false,
          bottom: false
        }}
        defaultSize={{ width: 300 }}
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

          <Link
            href={UPLOAD_FILE_PATH}
            className="flex-center btn-outline gap-4"
          >
            <PlusIcon className="h-5 w-5" />
            create new file
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {fileList?.map((item, index) => {
            const styleSelected =
              pathname === item.id
                ? 'rounded-r-lg border-l-4 border-blue-500 bg-dark-100'
                : 'rounded-lg border-l-4 border-transparent'

            return (
              <Link
                key={index}
                href={`/files/${item.id}`}
                className={`${styleSelected} flex-start gap-4 p-4 hover:bg-dark-100`}
              >
                <DocumentTextIcon className="h-5 w-5" />
                {item.title}
              </Link>
            )
          })}
        </div>
      </Resizable>
    </div>
  )
}

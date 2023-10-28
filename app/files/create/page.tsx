'use client'

import { Loading } from '@/component/Loading'
import { CrawlWebsiteForm } from '@/component/files/CrawlWebsiteForm'
import { FileDropZone } from '@/component/files/FileDropZone'
import { TextEditor } from '@/component/files/TextEdittor'
import { createDocBtn } from '@/lib/constants'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React, { useState } from 'react'
import { useUpload } from 'services/files'
import { type ActionType } from 'types'

const KnownledgePage = () => {
  const [action, setAction] = useState<ActionType>('FILE')
  const { mutate: upload, isLoading: isUploading } = useUpload()

  return (
    <section className="container mx-auto h-screen px-24">
      <article className="mt-4 text-center">
        <h4 className="green_text_gradient text-xl font-semibold">
          <Link href="/files">
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
          Create Documents
        </h4>
        <p className="my-4 text-gray">
          You can create a new document in this folder by writing,
          <br /> uploading an existing document or importing a webpage.
        </p>

        <ul className="mt-8 flex flex-wrap items-center justify-between gap-8">
          {createDocBtn.map(({ type, desc, href, Icon }, index) => {
            const styleSpan =
              href === action ? 'shadow-lg -top-6 bg-dark-100' : '-top-2'
            const styleH5 =
              href === action
                ? 'font-semibold text-blue-500'
                : 'font-normal text-blue-100'

            return (
              <li
                key={index}
                onClick={() => setAction(href)}
                className="animate group relative w-1/4 min-w-[250px] cursor-pointer rounded-xl bg-dark-200 px-6 pb-2 pt-12 text-center shadow-lg hover:shadow-2xl"
              >
                <span
                  className={`${styleSpan} animate absolute right-1/2 m-2 translate-x-1/2 rounded-full p-3 group-hover:shadow-lg`}
                >
                  {Icon}
                </span>
                <h5 className={`${styleH5} animate my-3 text-xl`}>{type}</h5>
                <p className="text-gray">{desc}</p>
              </li>
            )
          })}
        </ul>
      </article>

      <article>
        {action === 'TEXT' ? <TextEditor onConfirm={upload} /> : null}
        {action === 'FILE' ? <FileDropZone onConfirm={upload} /> : null}
        {action === 'WEBSITE' ? <CrawlWebsiteForm onConfirm={upload} /> : null}
      </article>

      <Loading show={isUploading} />
    </section>
  )
}

export default KnownledgePage

'use client'

/* eslint-disable no-console */
import { CrawlWebsiteForm } from '@/component/files/CrawlWebsiteForm'
import { FileDropZone } from '@/component/files/FileDropZone'
import { createDocBtn } from '@/lib/constants'
import React, { useState } from 'react'
import type { ActionType } from 'types'

const KnownledgePage = () => {
  const [action, setAction] = useState<ActionType>('FILE')

  const handleCrawlWebsite = async (url: string) => {
    console.log(url)
  }

  // const handleCreateFile = (title: string, text: string) => {
  //   console.log({ title, text })
  // }

  const handleUpload = (url: string, title: string) => {
    console.log({ title, url })
  }

  return (
    <section className="container mx-auto h-screen p-24">
      <article className="mt-4 text-center">
        <h4 className="green_text_gradient text-xl font-semibold">
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
                : 'font-normal text-blue-200'

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
        {/* {action === "TEXT" ? ( */}
        {/*   <TextEditor */}
        {/*     onCreate={(title: string, text: string) => */}
        {/*       handleCreateFile(title, text) */}
        {/*     } */}
        {/*   /> */}
        {/* ) : null} */}

        {action === 'FILE' ? (
          <FileDropZone
            onSave={(url: string, title: string) => handleUpload(url, title)}
          />
        ) : null}

        {action === 'WEBSITE' ? (
          <CrawlWebsiteForm
            onCrawlWebsite={(link: string) => {
              handleCrawlWebsite(link)
            }}
          />
        ) : null}
      </article>
    </section>
  )
}

export default KnownledgePage
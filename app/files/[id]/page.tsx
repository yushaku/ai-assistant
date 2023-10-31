'use client'

import { Loading } from '@/component/Loading'
import { ConfirmDeteleDialog } from '@/component/dialog/confirmDetele'
import { TrashIcon } from '@heroicons/react/24/solid'
import moment from 'moment'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { useDeleteFile, useGetFileDetail } from 'services'

export default function DetailPage() {
  const path = usePathname() // "/files/id"
  const id = path.split('/').pop() ?? ''

  const { data } = useGetFileDetail(id)
  const { mutate: detele, isLoading: isDeleting } = useDeleteFile()

  const [isDelete, setIsDelete] = useState(false)

  if (!data) {
    return <div>File not found</div>
  }

  return (
    <section className="no-scrollbar flex-1 overflow-y-scroll px-24 pb-12 pt-24">
      <div>
        <h3 className="flex-between">
          <span className="header-lg text-blue-400">{data?.title}</span>
          <span>
            <button
              onClick={() => setIsDelete(true)}
              className="rounded-lg p-3 font-normal text-gray-100 hover:bg-red-400"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </span>
        </h3>
        <p className="mt-4 text-sm">
          <span>{moment(data?.createdAt).format('LL')}</span>
          <span className="mx-2">-</span>
          <span className="rounded-lg bg-blue-500 px-2 py-1">
            {data?.isTrained ? 'trained' : 'not trained'}
          </span>
        </p>
      </div>

      <div className="mt-8 rounded-lg bg-dark-200 p-4">{data?.content}</div>

      <Loading show={isDeleting} />

      <ConfirmDeteleDialog
        open={isDelete}
        handleSubmit={() => {
          detele(id)
          setIsDelete(false)
        }}
        handleOpen={() => setIsDelete(false)}
      />
    </section>
  )
}

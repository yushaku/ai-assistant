import { TrashBtn } from '@/component/files/TrashBtn'
import prisma from '@/lib/prisma'
import moment from 'moment'
import React from 'react'

const queryData = async (id: string) => {
  'use server'
  const data = await prisma.documents.findUnique({
    where: { id }
  })
  return data
}

export default async function DetailPage({
  params
}: {
  params: { id: string }
}) {
  const id = params.id
  const data = await queryData(id)

  return (
    <section className="no-scrollbar flex-1 overflow-y-scroll px-24 pb-12 pt-24">
      <div>
        <h3 className="flex-between">
          <span className="header-lg text-blue-400">{data?.title}</span>
          <span>
            <TrashBtn id={id} />
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
    </section>
  )
}

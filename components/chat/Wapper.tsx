import { LeftSidebar } from '../LeftSidebar'
import { RightSideBar } from '../RightSideBar'
import prisma from '@/lib/prisma'
import React from 'react'
import type { PromptList } from 'types'

const queryData = async () => {
  'use server'
  const data = await prisma.category.findMany({
    include: {
      Prompt: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          updatedAt: true
        }
      }
    }
  })

  return data as unknown as PromptList[]
}

export default async function Wapper({
  children
}: {
  children: React.ReactNode
}) {
  const promptList = await queryData()

  return (
    <section className="relative flex w-screen overflow-hidden">
      <LeftSidebar />
      <article className="h-screen flex-1 md:p-24">{children}</article>
      <RightSideBar prompts={promptList} />
    </section>
  )
}

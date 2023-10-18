'use client'

import { CreateCate } from '@/component/promts/CreateCategory'
import { CreatePrompt } from '@/component/promts/CreatePrompts'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader
} from '@material-tailwind/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const PromptPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const addStuff = searchParams.get('add') || 'prompts'

  return (
    <section>
      <article className="mx-auto my-8 lg:w-1/2">
        <h4 className="green_text_gradient flex-start gap-2 text-xl font-semibold">
          <Link href="/prompts">
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
          Create Prompt example
        </h4>
        <p className="my-4 text-gray">
          You can create a new document in this folder by writing, uploading an
          existing document or importing a webpage.
        </p>
      </article>

      <Tabs value={addStuff} className="mx-auto lg:w-1/2">
        <TabsHeader>
          <Tab value="prompts" onClick={() => router.push('?add=prompts')}>
            Prompts
          </Tab>
          <Tab value="category" onClick={() => router.push('?add=category')}>
            Category
          </Tab>
        </TabsHeader>

        <TabsBody>
          <TabPanel className="p-0" value="prompts">
            <CreatePrompt />
          </TabPanel>

          <TabPanel className="p-0" value="category">
            <CreateCate />
          </TabPanel>
        </TabsBody>
      </Tabs>
    </section>
  )
}

export default PromptPage

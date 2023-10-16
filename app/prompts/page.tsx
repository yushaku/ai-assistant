'use client'

import { CreateCate } from '@/component/promts/CreateCategory'
import { CreatePrompt } from '@/component/promts/CreatePrompts'
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader
} from '@material-tailwind/react'
import React from 'react'

const PromptPage = () => {
  return (
    <section>
      <article className="mt-4 text-center">
        <h4 className="green_text_gradient text-xl font-semibold">
          Create Prompt example for students
        </h4>
        <p className="my-4 text-gray">
          You can create a new document in this folder by writing,
          <br /> uploading an existing document or importing a webpage.
        </p>
      </article>

      <Tabs value="prompts" className="mx-auto w-1/2">
        <TabsHeader>
          <Tab value="prompts">Prompts</Tab>
          <Tab value="category">Category</Tab>
        </TabsHeader>

        <TabsBody>
          <TabPanel value="prompts">
            <CreatePrompt />
          </TabPanel>

          <TabPanel value="category">
            <CreateCate />
          </TabPanel>
        </TabsBody>
      </Tabs>
    </section>
  )
}

export default PromptPage

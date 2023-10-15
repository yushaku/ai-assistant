'use client'

import { AI_MODELS } from '@/lib/constants'
import {
  PaperAirplaneIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/solid'
import { Option, Select } from '@material-tailwind/react'
import React, { useState } from 'react'

const PromptPage = () => {
  const [promptList, setPromptList] = useState<Array<string>>([])
  const [prompt, setPrompt] = useState('')

  const handleAdd = () => {
    setPromptList([...promptList, prompt])
    setPrompt('')
  }

  const handleDelete = (index: number) => {
    setPromptList(promptList.splice(index + 1, 1))
  }

  const handleUpdate = (index: number) => {
    setPrompt(promptList.at(index) ?? '')
    handleDelete(index)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleAdd()
    }
  }

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

      <form>
        <Select
          defaultValue={AI_MODELS.at(0)?.title}
          label="Select Model"
          className="text-gray-100"
        >
          {AI_MODELS.map((model, index) => {
            return (
              <Option key={index} onClick={() => console.log(model)}>
                {model.title}
              </Option>
            )
          })}
        </Select>

        <ul className="my-8 grid gap-2">
          {promptList.map((prompt, index) => {
            return (
              <li
                key={index}
                className="relative cursor-pointer rounded-lg bg-dark-100 px-4 py-2"
              >
                {prompt}
                <p className="absolute bottom-1/2 right-5 flex translate-y-1/2 gap-3">
                  <button
                    onClick={() => handleUpdate(index)}
                    className="rounded-lg p-1 hover:bg-green-400"
                  >
                    <PencilIcon className="h-5 w-5 " />
                  </button>

                  <button
                    onClick={() => handleDelete(index)}
                    className="rounded-lg p-1 hover:bg-red-400"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </p>
              </li>
            )
          })}
        </ul>
      </form>

      <div className="flex gap-5 rounded-lg bg-dark-200 p-2">
        <textarea
          rows={1}
          value={prompt}
          onKeyDown={handleKeyDown}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full bg-dark"
          placeholder="Prompt..."
        ></textarea>

        <button
          onClick={handleAdd}
          className="rounded-lg bg-dark-100 p-3 hover:bg-blue-400"
        >
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </div>
    </section>
  )
}

export default PromptPage

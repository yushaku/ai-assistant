'use client'

import { Loading } from '../Loading'
import {
  PaperAirplaneIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/solid'
import { Spinner } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useCreatePrompt, useGetCategory } from 'services'

export const CreatePrompt = () => {
  const { data: cateList } = useGetCategory()
  const { mutate: createPrompt, isLoading } = useCreatePrompt()

  const [promptList, setPromptList] = useState<Array<string>>([])
  const [prompt, setPrompt] = useState('')
  const [cateId, setCateId] = useState(cateList?.at(0)?.id ?? '')

  const handleAdd = () => {
    setPromptList([...promptList, prompt])
    setPrompt('')
  }

  const handleDelete = (index: number) => {
    setPromptList(promptList.toSpliced(index, 1))
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

  const handleSubmit = async () => {
    createPrompt({ cateId, promptList })
    setPromptList([])
  }

  return (
    <div>
      <div className="mt-12">
        {cateList ? (
          <select
            defaultValue={cateList?.at(0)?.title ?? ''}
            className="w-full rounded-lg bg-dark-100 p-2 text-gray-100"
            onChange={(e) => setCateId(e.target.value)}
          >
            {cateList.map((cate, index) => {
              return (
                <option
                  className="py-2"
                  value={cate.id}
                  key={index}
                  onClick={() => setCateId(cate.id)}
                >
                  {cate.title}
                </option>
              )
            })}
          </select>
        ) : (
          <Spinner />
        )}

        <ul className="my-8 grid gap-2">
          {promptList.map((prompt, index) => {
            return (
              <li
                key={index}
                className="relative cursor-pointer rounded-lg bg-dark-100 px-4 py-2"
              >
                <p className="mr-14 text-gray-200">{prompt}</p>
                <p className="absolute bottom-1/2 right-5 flex translate-y-1/2 gap-3">
                  <span
                    onClick={() => handleUpdate(index)}
                    className="rounded-lg p-1 hover:bg-green-400"
                  >
                    <PencilIcon color="white" className="h-5 w-5" />
                  </span>

                  <span
                    onClick={() => handleDelete(index)}
                    className="rounded-lg p-1 hover:bg-red-400"
                  >
                    <TrashIcon color="white" className="h-5 w-5" />
                  </span>
                </p>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="mx-1 flex gap-5 rounded-lg border border-dark-100">
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
          className="flex-center gap-3 rounded-lg bg-dark-100 p-3 hover:bg-blue-400"
        >
          Add
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </div>

      <button
        onClick={handleSubmit}
        type="submit"
        className="btn-outline mt-8 w-full text-gray-200"
      >
        Save All
      </button>

      <Loading show={isLoading} />
    </div>
  )
}

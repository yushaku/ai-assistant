'use client'

import { Loading } from '../Loading'
import { ConfirmDeteleDialog } from '../dialog/confirmDetele'
import {
  PaperAirplaneIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import {
  useCreateCategory,
  useDeleleCategory,
  useGetCategory,
  useUpdateCategory
} from 'services'

export const CreateCate = () => {
  const { data: cateList } = useGetCategory()
  const { mutate: createCate, isLoading: isCreating } = useCreateCategory()
  const { mutate: deteleCate, isLoading: isDeleting } = useDeleleCategory()
  const { mutate: UpdateCate, isLoading: isUpdating } = useUpdateCategory()

  const [title, setTitle] = useState('')
  const [id, setId] = useState('')

  const handleAdd = () => {
    createCate({ title })
  }

  const handleDelete = (id: string) => {
    setId(id)
  }

  const handleUpdate = (id: string, name: string) => {
    setTitle(name)
    setId(id)
  }

  return (
    <div>
      <ul className="my-8 grid gap-2">
        {cateList?.map(({ id, title }) => {
          return (
            <li
              key={id}
              className="relative cursor-pointer rounded-lg bg-dark-100 px-4 py-2"
            >
              <p className="mr-14">{title}</p>
              <p className="absolute bottom-1/2 right-5 flex translate-y-1/2 gap-3">
                <span
                  onClick={() => handleUpdate(id, title)}
                  className="rounded-lg p-1 hover:bg-green-400"
                >
                  <PencilIcon className="h-5 w-5" />
                </span>

                <span
                  onClick={() => handleDelete(id)}
                  className="rounded-lg p-1 hover:bg-red-400"
                >
                  <TrashIcon className="h-5 w-5" />
                </span>
              </p>
            </li>
          )
        })}
      </ul>

      <div className="flex gap-5 rounded-lg border border-dark-100 pl-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-dark"
          placeholder="Prompt..."
        ></input>

        <button
          onClick={handleAdd}
          className="rounded-lg bg-dark-100 p-3 hover:bg-blue-400"
        >
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </div>

      <Loading show={isCreating || isDeleting || isUpdating} />
      <ConfirmDeteleDialog
        open={id !== ''}
        handleSubmit={() => deteleCate(id)}
        handleOpen={() => setId('')}
      />
    </div>
  )
}

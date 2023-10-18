'use client'

import { Loading } from '../Loading'
import { ConfirmDeteleDialog } from '../dialog/confirmDetele'
import {
  PaperAirplaneIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/solid'
import { Input } from '@material-tailwind/react'
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
  const { mutate: updateCate, isLoading: isUpdating } = useUpdateCategory()

  const [cate, setCate] = useState({ title: '', id: '' })
  const [state, setState] = useState<'delete' | 'update' | null>(null)

  const handleSubmit = () => {
    state === 'update' ? updateCate(cate) : createCate({ title: cate.title })
    setCate({ title: '', id: '' })
  }

  const handleDelete = (id: string) => {
    setCate((pre) => ({ ...pre, id }))
    setState('delete')
  }

  const handleUpdate = (index: number, id: string, title: string) => {
    setCate({ id, title })
    setState('update')
    cateList?.splice(index, 1)
  }

  return (
    <div>
      <ul className="my-8 grid gap-2 text-gray-100">
        {cateList?.map(({ id, title }, index) => {
          return (
            <li
              key={id}
              className="relative cursor-pointer rounded-lg bg-dark-100 px-4 py-2"
            >
              <p className="mr-14">{title}</p>
              <p className="absolute bottom-1/2 right-5 flex translate-y-1/2 gap-3">
                <span
                  onClick={() => handleUpdate(index, id, title)}
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

      <div className="flex gap-5">
        <Input
          value={cate.title}
          color="blue"
          placeholder="Category title..."
          onChange={(e) =>
            setCate((pre) => ({ ...pre, title: e.target.value }))
          }
          className="h-[50px] w-full text-gray-100"
        ></Input>

        <button
          onClick={handleSubmit}
          className={`${
            cate.title ? 'bg-blue-400 text-gray-200' : ''
          } flex-center gap-3 rounded-lg bg-dark-100 p-3 hover:bg-blue-500 hover:text-white`}
        >
          {cate.id === '' ? 'Create' : 'Update'}
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </div>

      <Loading show={isCreating || isDeleting || isUpdating} />
      <ConfirmDeteleDialog
        open={state === 'delete' && cate.id !== ''}
        handleSubmit={() => deteleCate(cate.id)}
        handleOpen={() => setState(null)}
      />
    </div>
  )
}

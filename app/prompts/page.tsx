'use client'

import { Loading } from '@/component/Loading'
import { UpdateDialog } from '@/component/dialog/UpdatePrompt'
import { ConfirmDeteleDialog } from '@/component/dialog/confirmDetele'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { Card, Typography } from '@material-tailwind/react'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useDatelePrompt, useGetPrompts, useUpdatePrompt } from 'services'

const TABLE_HEAD = ['Category', 'Prompt', 'Created at', 'Updated at']

const CategoryPage = () => {
  const { data: promptList } = useGetPrompts()
  const { mutate: detele, isLoading: isDeleting } = useDatelePrompt()
  const { mutate: update, isLoading: isUpdating } = useUpdatePrompt()

  const [state, setState] = useState<'delete' | 'update' | null>(null)
  const [prompt, setPrompt] = useState({ content: '', id: '', categoryId: '' })
  const router = useRouter()
  useHotkeys('c', () => router.push('/prompts/create?add=prompts'))

  return (
    <Card className="no-scrollbar h-full w-full overflow-y-scroll bg-dark-200">
      <table className="w-full min-w-max table-auto text-left">
        <thead className="bg-dark-100">
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 first:p-4"
              >
                <Typography className="text-lg font-semibold text-white">
                  {head}
                </Typography>
              </th>
            ))}
            <th className="border-b border-blue-gray-100 p-4">
              <Link
                href="/prompts/create?add=prompts"
                className="btn-outline text-white"
              >
                create new
              </Link>
            </th>
          </tr>
        </thead>
        <tbody className="relative">
          {promptList?.length ? (
            promptList?.map(({ title, Prompt, ...cate }) => {
              return Prompt?.map(({ id, content, createdAt, updatedAt }) => {
                return (
                  <tr
                    key={id}
                    className="font-normal text-gray-100 even:bg-dark-100 hover:bg-dark-50"
                  >
                    <td className="p-4">
                      <Typography>{title}</Typography>
                    </td>
                    <td>
                      <Typography>{content}</Typography>
                    </td>
                    <td>
                      <Typography>
                        {moment(createdAt).format('DD/MM/YYYY')}
                      </Typography>
                    </td>
                    <td>
                      <Typography>
                        {moment(updatedAt).format('DD/MM/YYYY')}
                      </Typography>
                    </td>
                    <td className="flex gap-3">
                      <button
                        onClick={() => {
                          setPrompt({ id, content, categoryId: cate.id })
                          setState('update')
                        }}
                        className="rounded-lg p-3 font-normal text-gray-100 hover:bg-blue-400"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>

                      <button
                        onClick={() => {
                          setPrompt({ id, content, categoryId: cate.id })
                          setState('delete')
                        }}
                        className="rounded-lg p-3 font-normal text-gray-100 hover:bg-red-400"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                )
              })
            })
          ) : (
            <div className="absolute right-1/2 top-1/2 translate-x-1/2 translate-y-1/2 text-center">
              <Image
                src="/catinbox.gif"
                alt="Empty image"
                width={300}
                height={300}
              />
              <h3 className="text-2xl text-gray-100">Prompts Empty</h3>
            </div>
          )}
        </tbody>
      </table>

      <Loading show={isDeleting || isUpdating} />

      <ConfirmDeteleDialog
        open={state === 'delete' && prompt.id !== ''}
        handleSubmit={() => {
          detele(prompt.id)
          setState(null)
        }}
        handleOpen={() => setState(null)}
      />

      {state === 'update' && prompt.id !== '' && (
        <UpdateDialog
          title={prompt.content}
          open={state === 'update' && prompt.id !== ''}
          onOpen={() => setState(null)}
          onConfirm={(content) => {
            setState(null)
            update({
              id: prompt.id,
              content,
              categoryId: prompt.categoryId
            })
          }}
        />
      )}
    </Card>
  )
}

export default CategoryPage

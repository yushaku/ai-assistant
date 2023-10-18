'use client'

import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { Card, Typography } from '@material-tailwind/react'
import Link from 'next/link'
import React from 'react'
import { useGetPrompts } from 'services'

const TABLE_HEAD = ['Category', 'content', 'created at', 'updated at']

const CategoryPage = () => {
  const { data: prompts } = useGetPrompts()

  return (
    <Card className="no-scrollbar h-full w-full overflow-y-scroll bg-dark-200">
      <table className="w-full min-w-max table-auto text-left">
        <thead className="bg-dark-100">
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 p-4">
                <Typography className="text-lg font-semibold text-white">
                  {head}
                </Typography>
              </th>
            ))}
            <th className="border-b border-blue-gray-100 p-4">
              <Link href="/prompts/create" className="btn-outline text-white">
                create new
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {prompts?.length !== 0 ? (
            prompts?.map(({ title, Prompt }) => {
              return Prompt?.map(({ id, content, createdAt, updatedAt }) => {
                return (
                  <tr key={id} className="even:bg-dark-100">
                    <td className="p-4">
                      <Typography className="font-normal text-gray-100">
                        {title}
                      </Typography>
                    </td>
                    <td>
                      <Typography className="font-normal text-gray-100">
                        {content}
                      </Typography>
                    </td>
                    <td>
                      <Typography className="font-normal text-gray-100">
                        {createdAt}
                      </Typography>
                    </td>
                    <td>
                      <Typography className="font-normal text-gray-100">
                        {updatedAt}
                      </Typography>
                    </td>
                    <td className="flex gap-3">
                      <Typography className="rounded-lg p-3 font-normal text-gray-100 hover:bg-blue-400">
                        <PencilIcon className="h-5 w-5" />
                      </Typography>

                      <Typography className="rounded-lg p-3 font-normal text-gray-100 hover:bg-red-400">
                        <TrashIcon className="h-5 w-5" />
                      </Typography>
                    </td>
                  </tr>
                )
              })
            })
          ) : (
            <Typography className="text-center font-normal text-gray-100">
              Empty...
            </Typography>
          )}
        </tbody>
      </table>
    </Card>
  )
}

export default CategoryPage

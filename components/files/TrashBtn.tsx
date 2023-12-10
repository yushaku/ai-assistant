'use client'

import { Loading } from '@/component/Loading'
import { ConfirmDeteleDialog } from '@/component/dialog/confirmDetele'
import { TrashIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import { useDeleteFile } from 'services'

export const TrashBtn = function ({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const { mutate: HandleDelete, isLoading } = useDeleteFile()

  return (
    <div>
      <button className="rounded-lg p-3 font-normal text-gray-100 hover:bg-red-400">
        <TrashIcon
          onClick={() => {
            setIsOpen(!isOpen)
          }}
          className="h-5 w-5"
        />
      </button>

      <ConfirmDeteleDialog
        open={isOpen}
        handleSubmit={() => {
          HandleDelete(id)
          setIsOpen(false)
        }}
        handleOpen={() => setIsOpen(false)}
      />

      <Loading show={isLoading} />
    </div>
  )
}

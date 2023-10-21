'use client'

/* eslint-disable no-unused-vars */
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input
} from '@material-tailwind/react'
import { useEffect, useState } from 'react'

export const ThreadDialog = function ({
  title = '',
  open,
  onOpen,
  onConfirm
}: {
  title?: string
  open: boolean
  onOpen: () => void
  onConfirm: (title: string) => void
}): JSX.Element {
  const [value, setValue] = useState(title)

  useEffect(() => {
    setValue(title)
  }, [open, title])

  return (
    <Dialog open={open} handler={onOpen}>
      <div className="flex items-center justify-between">
        <DialogHeader>Create Thread</DialogHeader>
      </div>

      <DialogBody>
        <div className="grid gap-6">
          <Input
            label="Thread Title"
            name="content"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
        </div>
      </DialogBody>

      <DialogFooter className="space-x-2">
        <Button
          variant="outlined"
          color="red"
          onClick={() => {
            onOpen()
            setValue('')
          }}
        >
          close
        </Button>

        <Button
          variant="gradient"
          color="green"
          onClick={() => {
            onConfirm(value)
            setValue('')
          }}
        >
          Submit
        </Button>
      </DialogFooter>
    </Dialog>
  )
}

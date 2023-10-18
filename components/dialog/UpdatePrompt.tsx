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
import { useState } from 'react'

export const UpdateDialog = function ({
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

  const handleQuit = () => {
    onOpen()
  }

  return (
    <Dialog open={open} handler={onOpen}>
      <div className="flex items-center justify-between">
        <DialogHeader>Create your account</DialogHeader>
      </div>

      <DialogBody divider>
        <div className="grid gap-6">
          <Input
            label="New content"
            name="content"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
        </div>
      </DialogBody>

      <DialogFooter className="space-x-2">
        <Button variant="outlined" color="red" onClick={handleQuit}>
          close
        </Button>

        <Button
          variant="gradient"
          color="green"
          onClick={() => onConfirm(value)}
        >
          Submit
        </Button>
      </DialogFooter>
    </Dialog>
  )
}

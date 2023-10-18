import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader
} from '@material-tailwind/react'
import React from 'react'

export const ConfirmDeteleDialog = ({
  open,
  handleOpen,
  handleSubmit
}: {
  open: boolean
  handleOpen: () => void
  handleSubmit: () => void
}) => {
  return (
    <Dialog className="flex-center flex-col" open={open} handler={handleOpen}>
      <DialogHeader>Are you sure?</DialogHeader>

      <DialogBody>
        <p>deleting can not be revert!</p>
        <ExclamationCircleIcon className="mx-auto h-32 w-32" color="red" />
      </DialogBody>

      <DialogFooter>
        <Button
          variant="text"
          color="blue"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="red" onClick={handleSubmit}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  )
}

'use client'

import { HandThumbDownIcon } from '@heroicons/react/24/outline'

/* eslint-disable no-unused-vars */
import {
  Button,
  Checkbox,
  Dialog,
  DialogBody,
  DialogFooter
} from '@material-tailwind/react'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import Textarea from 'react-textarea-autosize'

export type FormReport = {
  report: string
  unsafe: boolean
  isFalse: boolean
  notHelpful: boolean
}

type Props = {
  value?: string
  open: boolean
  onOpen: () => void
  onConfirm: (data: FormReport) => void
}
export const ReportDialog = function ({
  open,
  onOpen,
  onConfirm
}: Props): JSX.Element {
  const [report, setReport] = useState('')
  const [checkboxs, setCheckboxs] = useState({
    unsafe: false,
    isFalse: false,
    notHelpful: false
  })

  function handleClick(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.name as keyof typeof checkboxs
    setCheckboxs({
      ...checkboxs,
      [name]: !checkboxs[name]
    })
  }

  return (
    <Dialog open={open} handler={onOpen}>
      <div className="mt-4 flex items-center gap-4 px-4">
        <HandThumbDownIcon className="mx-0 h-12 w-12 rounded-full bg-red-100 p-2 text-red-400" />
        <span className="text-xl font-bold">Provide additional feedback</span>
      </div>

      <DialogBody>
        <div className="grid">
          <Textarea
            tabIndex={0}
            rows={5}
            value={report}
            onChange={(e) => setReport(e.target.value)}
            placeholder="Fix AI answer..."
            spellCheck={false}
            className="min-h-[160px] w-full resize-none py-5 pl-4 pr-16 text-base text-gray-200"
          />
          <Checkbox
            onChange={handleClick}
            name="unsafe"
            label="This is harmful / unsafe"
          />
          <Checkbox
            onChange={handleClick}
            name="isFalse"
            label="This isn't true"
          />
          <Checkbox
            onChange={handleClick}
            name="notHelpful"
            label="This isn't helpful"
          />
        </div>
      </DialogBody>

      <DialogFooter className="space-x-2">
        <Button
          variant="outlined"
          color="red"
          onClick={() => {
            onOpen()
            setReport('')
          }}
        >
          close
        </Button>

        <Button
          variant="gradient"
          color="green"
          onClick={() => {
            onConfirm({
              report: report,
              ...checkboxs
            })
            setReport('')
          }}
        >
          Submit
        </Button>
      </DialogFooter>
    </Dialog>
  )
}

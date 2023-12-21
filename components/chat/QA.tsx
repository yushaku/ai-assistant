import ReactMarkdown from './ReactMarkdown'
import {
  ArrowPathIcon,
  ClipboardIcon,
  HandThumbDownIcon
} from '@heroicons/react/24/solid'
import { Avatar } from '@material-tailwind/react'
import React from 'react'
import toast from 'react-hot-toast'

export const UserQuestion = ({
  question,
  image = '/man.png'
}: {
  question: string
  image?: string
}) => {
  return (
    <p className="relative my-4 flex gap-4 p-4">
      <span className="hidden h-7 w-7 rounded-full md:block">
        <Avatar size="sm" src={image} alt="avata" />
      </span>
      <span className="flex-1">{question}</span>
    </p>
  )
}

export const BotAnswer = ({
  answer,
  toggleReport,
  reload
}: {
  answer: string
  toggleReport: () => void
  reload: () => void
}) => {
  return (
    <div className="group relative flex gap-4 rounded-lg bg-dark-200 p-4">
      <span className="hidden h-7 w-7 rounded-full md:block">
        <Avatar size="sm" src="/bot.png" alt="avata" />
      </span>
      <span className="absolute -bottom-5 right-4  hidden gap-4 rounded-lg bg-dark-300 px-4 py-2 group-hover:flex">
        <HandThumbDownIcon
          onClick={toggleReport}
          className="mx-auto h-6 w-6 hover:text-blue-500"
        />
        <ClipboardIcon
          onClick={() => {
            navigator.clipboard.writeText(answer)
            toast.success('Copied to clipboard')
          }}
          className="mx-auto h-6 w-6 hover:text-blue-500"
        />
        <ArrowPathIcon
          onClick={reload}
          className="mx-auto h-6 w-6 hover:text-blue-500"
        />
      </span>
      <span id="bot_answer" className="flex-1">
        <ReactMarkdown>{answer}</ReactMarkdown>
      </span>
    </div>
  )
}

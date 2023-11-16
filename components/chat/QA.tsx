import ReactMarkdown from './ReactMarkdown'
import { Avatar } from '@material-tailwind/react'
import React from 'react'

export const UserQuestion = ({
  question,
  image = '/man.png'
}: {
  question: string
  image?: string
}) => {
  return (
    <p className="relative my-4 flex gap-4 p-4">
      <span className="h-7 w-7 rounded-full">
        <Avatar size="sm" src={image} alt="avata" />
      </span>
      <span className="flex-1">{question}</span>
    </p>
  )
}

export const BotAnswer = ({ answer }: { answer: string }) => {
  return (
    <div className="relative flex gap-4 rounded-lg bg-dark-200 p-4">
      <span className="h-7 w-7 rounded-full">
        <Avatar size="sm" src="/bot.png" alt="avata" />
      </span>
      <span id="bot_answer" className="flex-1">
        <ReactMarkdown>{answer}</ReactMarkdown>
      </span>
    </div>
  )
}

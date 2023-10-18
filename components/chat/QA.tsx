import ReactMarkdown from './ReactMarkdown'
import Image from 'next/image'
import React from 'react'

export const UserQuestion = ({ question }: { question: string }) => {
  return (
    <p className="relative my-4 p-4">
      <span className="absolute -left-10 top-1/4 h-7 w-7 rounded-full">
        <Image
          alt="yushaku"
          src="/man.png"
          width={35}
          height={35}
          sizes="35px"
          loading="lazy"
        />
      </span>
      <span>{question}</span>
    </p>
  )
}

export const BotAnswer = ({ answer }: { answer: string }) => {
  return (
    <div className="relative rounded-lg bg-dark-200 p-4">
      <span className="absolute -left-10 h-7 w-7 rounded-full">
        <Image
          alt="yushaku"
          src="/bot.png"
          width={35}
          height={35}
          loading="lazy"
          sizes="35px"
        />
      </span>
      <span>
        <ReactMarkdown>{answer}</ReactMarkdown>
      </span>
    </div>
  )
}

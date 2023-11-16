import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import type { Message } from 'ai'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// import prisma from '@/lib/prisma'
// import { v4 as uidv4 } from 'uuid'

export const runtime = 'edge'
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// const QUEUE_SIZE = 100
// const TIME_OUT = 1000 * 60
// type MSG = Pick<Message, 'role' | 'content'> & {
//   threadId: string
//   createdAt: Date
// }
//
// const bulk = new BulkExecService<MSG>(QUEUE_SIZE, TIME_OUT, (items) => {
//   prisma.message.createMany({
//     data: items.map((msg) => ({
//       threadId: msg.threadId,
//       role: msg.role,
//       content: msg.content,
//       createdAt: msg.createdAt
//     }))
//   })
// })

const prompt = [
  {
    role: 'system',
    content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
      The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
      AI is a well-behaved and well-mannered individual.
      AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
      AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
      AI assistant is a big fan of Pinecone and Vercel.
      `
  }
]

export async function POST(req: NextRequest) {
  const user = await getToken({ req })
  if (!user) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  try {
    const data = await req.json()
    const { messages, id } = data

    // const question = messages.at(-1)
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
        ...prompt,
        ...messages.filter((message: Message) => message.role === 'user')
      ]
    })

    const stream = OpenAIStream(response, {
      async onCompletion(completion) {
        if (!id) return

        const title = messages[0].content.substring(0, 20)
        const createdAt = new Date()
        const threadId: string = id
        // const threadId: string = id ? id : uidv4()

        const payload = {
          id,
          title,
          userId: user.id,
          createdAt,
          messages: [
            ...messages,
            {
              content: completion,
              role: 'assistant'
            }
          ]
        }

        /* bulk.push({ threadId, ...question, createdAt })
        bulk.push({
          threadId,
          content: completion,
          role: 'assistant',
          createdAt
        }) */

        /* await kv.zadd(`user:chat:${user.id}`, {
          member: `chat:${threadId}`,
          score: createdAt
        }) */

        await kv.hmset(`chat:${threadId}`, payload)
      }
    })

    return new StreamingTextResponse(stream)
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error
      return NextResponse.json({ name, status, headers, message }, { status })
    } else {
      throw error
    }
  }
}

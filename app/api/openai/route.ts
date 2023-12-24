/* eslint-disable @typescript-eslint/no-explicit-any */
import { getContext } from '@/lib/queryVertor'
import { kv } from '@vercel/kv'
import type { Message } from 'ai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export const runtime = 'edge'
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

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
    const lastMessage = messages.at(-1)
    const context = await getContext(lastMessage.content)
    console.log({ context })

    const prompt = [
      {
        role: 'system',
        content: `
        Bạn là trợ lý để hỗ trợ sinh viên trường đại học xây dựng hà nội (HUCE) cung cấp ngấn gọn và đẩy đủ thông tin cho các bạn sinh viên
        START CONTEXT BLOCK
        ${context}
        END OF CONTEXT BLOCK
        Nếu ngữ cảnh không cung cấp câu trả lời cho câu hỏi, trợ lý AI sẽ nói: "Tôi xin lỗi, nhưng tôi không biết câu trả lời cho câu hỏi đó. Bạn hãy liên hệ phòng chăm sóc sinh viên qua gmail: cssv@huce.vn.com hoặc qua số điện thoại 0973666666"`
      }
    ]

    const response: any = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-1106',
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

        await kv.hmset(`chat:${threadId}`, {
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
        })
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

import { queryDatabase } from '@/lib/pinecone'
import type { Message as VercelChatMessage } from 'ai'
import { StreamingTextResponse } from 'ai'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { PromptTemplate } from 'langchain/prompts'
import { BytesOutputParser } from 'langchain/schema/output_parser'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'
const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`
}

const TEMPLATE = `bạn là trợ lý của trường đại học xây dựng hà nội, chuyên trỗ trợ trả lời các thắc mắc của sinh viên.
Current conversation: {chat_history}
User: {input}
AI: `

export async function POST(req: NextRequest) {
  const body = await req.json()
  const messages = body.messages ?? []
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage)
  const question = messages[messages.length - 1].content

  const prompt = PromptTemplate.fromTemplate(TEMPLATE)

  const model = new ChatOpenAI({
    temperature: 0.8,
    streaming: true
  })

  const fromdb = await queryDatabase(question)
  console.log(fromdb)

  const chain = prompt.pipe(model).pipe(new BytesOutputParser())

  const stream = await chain.stream({
    chat_history: formattedPreviousMessages.join('\n'),
    input: question
  })

  return new StreamingTextResponse(stream)
}

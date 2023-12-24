import { kv } from '@vercel/kv'
import { StreamingTextResponse } from 'ai'
import { loadQAStuffChain } from 'langchain/chains'
import { Document } from 'langchain/document'
import { OpenAI } from 'langchain/llms/openai'
import { queryDatabase } from 'lib/pinecone'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import type { ChatCache } from 'types'

export const runtime = 'edge'

/* export async function POST(req: NextRequest) {
  const body = await req.json()
  const messages = body.messages ?? []
  const question = messages[messages.length - 1].content
  const text = await queryPineconeVectorStoreAndQueryLLM(question)
  return NextResponse.json({
    data: text
  })
} */

export async function POST(req: NextRequest) {
  const body = await req.json()
  const messages = body.messages ?? []
  const question = messages.at(-1).content

  const matches = await queryDatabase(question)
  const chain = loadQAStuffChain(
    new OpenAI({
      streaming: true,
      modelName: 'gpt-3.5-turbo-1106'
    })
  )
  const content = matches.map((match) => match.metadata?.pageContent).join(' ')

  const result = await chain.stream({
    input_documents: [new Document({ pageContent: content })],
    question
  })

  return new StreamingTextResponse(result)
}

export async function GET(req: NextRequest) {
  const user = await getToken({ req })
  const searchParams = req.nextUrl.searchParams
  const threadId = searchParams.get('threadId')
  // const limit = searchParams.get('limit')

  if (!threadId || !user) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  const data = await kv.hgetall<ChatCache>(`chat:${threadId}`)
  return Response.json(data)
}

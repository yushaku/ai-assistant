import { queryPineconeVectorStoreAndQueryLLM } from 'lib/pinecone'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const messages = body.messages ?? []
  const question = messages[messages.length - 1].content

  const text = await queryPineconeVectorStoreAndQueryLLM(question)
  return NextResponse.json({
    data: text
  })
}

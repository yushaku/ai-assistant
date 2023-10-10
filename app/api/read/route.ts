import { Pinecone } from '@pinecone-database/pinecone'
import { INDEX_NAME } from 'lib/constants'
import { queryPineconeVectorStoreAndQueryLLM } from 'lib/pinecone'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const client = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY || '',
    environment: process.env.PINECONE_ENVIRONMENT || ''
  })

  const text = await queryPineconeVectorStoreAndQueryLLM(
    client,
    INDEX_NAME,
    body
  )

  return NextResponse.json({
    data: text
  })
}

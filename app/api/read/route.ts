import { kv } from '@vercel/kv'
import { queryPineconeVectorStoreAndQueryLLM } from 'lib/pinecone'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import type { ChatCache } from 'types'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const messages = body.messages ?? []
  const question = messages[messages.length - 1].content

  const text = await queryPineconeVectorStoreAndQueryLLM(question)
  return NextResponse.json({
    data: text
  })
}

// export async function GET(req: NextRequest) {
//   console.log('get data from cache')
//
//   const user = await getToken({ req })
//   const searchParams = req.nextUrl.searchParams
//   const threadId = searchParams.get('id')
//   // const limitMessage = searchParams.get('limit')
//
//   console.log({ threadId })
//
//   return []
//
//   // const chat = await kv.hgetall<Chat>(`chat:${threadId}`)
//   // if (!chat || (user?.id && chat.userId !== user.id)) {
//   //   return []
//   // }
//   //
//   // return chat
// }

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

  /* return prisma.thread.findUnique({
    where: {
      id: threadId,
      userId: user.id as string
    },
    include: {
      Message: {
        select: {
          id: true,
          role: true,
          content: true,
          createdAt: true,
          updatedAt: true
        },
        take: limit ? Number(limit) : 10,
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  }) */
}

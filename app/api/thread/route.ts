import prisma from '@/lib/prisma'
import type { Thread } from '@prisma/client'
import { kv } from '@vercel/kv'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function GET(req: NextRequest) {
  const user = await getToken({ req })
  const searchParams = req.nextUrl.searchParams
  const limit = searchParams.get('limit')
    ? Number(searchParams.get('limit'))
    : 10

  if (!user) throw new Error('authentication failed')

  const prompt = await prisma.thread.findMany({
    where: { userId: user.id as string },
    take: limit
  })

  return NextResponse.json(prompt)
}

export async function POST(req: NextRequest) {
  const user = await getToken({ req })
  if (!user) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  const data = (await req.json()) as Pick<Thread, 'title'>
  const thread = await openai.beta.threads.create()
  const cate = await prisma.thread.create({
    data: {
      id: thread.id,
      title: data.title,
      userId: user.id as string
    }
  })
  return NextResponse.json(cate)
}

export async function PUT(req: NextRequest) {
  const data = (await req.json()) as Pick<Thread, 'title' | 'id'>
  const cate = await prisma.thread.update({
    where: { id: data.id },
    data: { title: data.title }
  })
  return NextResponse.json(cate)
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')
  if (!id) {
    return new Response('Missing thread id', {
      status: 403
    })
  }

  await openai.beta.threads.del(id)
  const cate = await prisma.thread.delete({
    where: { id },
    include: { Message: true }
  })
  await kv.del(`chat:${id}`)

  return NextResponse.json(cate)
}

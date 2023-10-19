import prisma from '@/lib/prisma'
import type { Thread } from '@prisma/client'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const user = await getToken({ req })
  if (!user) throw new Error('authentication failed')

  const prompt = await prisma.thread.findMany({
    where: { userId: user.id as string },
    include: {
      Message: {
        select: {
          id: true,
          answer: true,
          question: true,
          createdAt: true,
          updatedAt: true
        }
      }
    }
  })

  return NextResponse.json(prompt)
}

export async function POST(req: NextRequest) {
  const user = await getToken({ req })
  if (!user) throw new Error('authentication failed')

  const data = (await req.json()) as Pick<Thread, 'title'>
  const cate = await prisma.thread.create({
    data: {
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
  const data = (await req.json()) as Pick<Thread, 'id'>
  const cate = await prisma.thread.delete({
    where: { id: data.id },
    include: { Message: true }
  })
  return NextResponse.json(cate)
}

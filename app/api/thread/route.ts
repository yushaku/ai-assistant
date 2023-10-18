import prisma from '@/lib/prisma'
import type { Thread } from '@prisma/client'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const prompt = await prisma.thread.findMany({
    include: {
      Message: {
        select: {
          id: true,
          question: true,
          answer: true,
          createdAt: true,
          updatedAt: true
        }
      }
    }
  })

  return NextResponse.json(prompt)
}

export async function POST(req: NextRequest) {
  const data = (await req.json()) as Pick<Thread, 'title'>
  const cate = await prisma.thread.create({ ...data, userId: '' })
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
    where: { id: data.id }
  })
  return NextResponse.json(cate)
}

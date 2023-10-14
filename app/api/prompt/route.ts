import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import type { Prompt } from '@prisma/client';

export async function POST(req: NextRequest) {
  const data = await req.json() as Omit<Prompt, "id">
  const cate = await prisma.prompt.create({ data });
  return NextResponse.json(cate)
}

export async function PUT(req: NextRequest) {
  const data = await req.json() as Prompt
  const cate = await prisma.prompt.update({
    where: {
      id: data.id
    },
    data: {
      content: data.content,
      categoryId: data.categoryId
    }
  })
  return NextResponse.json(cate)
}

export async function DELETE(req: NextRequest) {
  const data = await req.json() as string[]
  const cate = await prisma.prompt.deleteMany({
    where: {
      id: {
        in: data,
      }
    },
  })
  return NextResponse.json(cate)
}


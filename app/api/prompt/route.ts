import prisma from '@/lib/prisma'
import type { Prompt } from '@prisma/client'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import type { PromptDTO } from 'types'

export async function GET() {
  const prompt = await prisma.category.findMany({
    include: {
      Prompt: {
        select: {
          id: true,
          content: true
        }
      }
    }
  })

  return NextResponse.json(prompt)
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as PromptDTO
  const cate = await prisma.prompt.createMany({
    data: body.promptList.map((item) => ({
      categoryId: body.cateId,
      content: item
    }))
  })
  return NextResponse.json(cate)
}

export async function PUT(req: NextRequest) {
  const data = (await req.json()) as Prompt
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
  const data = (await req.json()) as string[]
  const cate = await prisma.prompt.deleteMany({
    where: {
      id: {
        in: data
      }
    }
  })
  return NextResponse.json(cate)
}

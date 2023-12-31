import prisma from '@/lib/prisma'
import type { Category } from '@prisma/client'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const prompt = await prisma.category.findMany()
  return NextResponse.json(prompt)
}

export async function POST(req: NextRequest) {
  const data = (await req.json()) as Pick<Category, 'title'>
  const old = await prisma.category.findUnique({
    where: {
      id: data.title
    }
  })

  if (old) {
    throw new Error("category's title already exsisted")
  }

  const cate = await prisma.category.create({ data })
  return NextResponse.json(cate)
}

export async function PUT(req: NextRequest) {
  const data = (await req.json()) as Category
  const cate = await prisma.category.update({
    where: {
      id: data.id
    },
    data: {
      title: data.title
    }
  })
  return NextResponse.json(cate)
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')
  if (!id) throw new Error('there is no id')

  const cate = await prisma.category.delete({
    where: { id },
    include: { Prompt: true }
  })
  return NextResponse.json(cate)
}

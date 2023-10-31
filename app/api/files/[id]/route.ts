import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(_: NextRequest, context: { params: { id: string } }) {
  const id = context.params.id
  if (!id) throw new Error('there is no id')

  const data = await prisma.documents.findUnique({
    where: { id }
  })
  return NextResponse.json(data)
}

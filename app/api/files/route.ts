/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteVertor, updatePinecone } from '@/lib/pinecone'
import prisma from '@/lib/prisma'
import type { Document } from 'langchain/document'
import { DocxLoader } from 'langchain/document_loaders/fs/docx'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { TextLoader } from 'langchain/document_loaders/fs/text'
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import type { ActionType } from 'types'

const loaders = new Map<string, any>()
loaders.set('txt', TextLoader)
loaders.set('pdf', PDFLoader)
loaders.set('doc', DocxLoader)
loaders.set('docx', DocxLoader)

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const type = formData.get('type') as ActionType
  const title = formData.get('title') as string

  let docs: Document<Record<string, any>>[]

  if (type === 'WEBSITE') {
    const url = formData.get('url') as string

    const loader = new CheerioWebBaseLoader(url, { selector: 'body' })
    docs = await loader.load()

    const ids = await updatePinecone(docs)
    await prisma.documents.createMany({
      data: docs.map((file) => {
        return {
          title,
          url,
          pineconeIds: ids,
          isTrained: true,
          content: file.pageContent
        }
      })
    })

    return NextResponse.json({
      message: 'ok'
    })
  }

  if (type === 'TEXT') {
    const content = formData.get('content') as string

    // await updatePinecone(INDEX_NAME, docs)
    await prisma.documents.create({
      data: { title, content, isTrained: true }
    })

    return NextResponse.json({ message: 'ok' })
  }

  if (type === 'FILE') {
    const file = formData.get('file') as File
    const extension = file.name.split('.').pop()
    const Loader = loaders.get(extension ?? '')

    if (!Loader) return
    const loader = new Loader(file)
    docs = await loader.load()

    const ids = await updatePinecone(docs)
    await prisma.documents.createMany({
      data: docs.map((file) => ({
        title,
        pineconeIds: ids,
        isTrained: true,
        content: file.pageContent
      }))
    })

    return NextResponse.json({
      data: 'ok'
    })
  }

  return NextResponse.json({ data: 'comming soon' })
}

export async function GET() {
  const data = await prisma.documents.findMany({
    select: {
      id: true,
      title: true,
      url: true,
      content: true,
      isTrained: true,
      createdAt: true,
      updatedAt: true
    }
  })
  return NextResponse.json(data)
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')
  if (!id) throw new Error('there is no id')

  const docs = await prisma.documents.findUnique({
    select: { id: true, pineconeIds: true },
    where: { id }
  })
  if (!docs) return

  await prisma.documents.delete({
    where: { id }
  })
  await deleteVertor(docs.pineconeIds)
  return NextResponse.json({ message: 'ok' })
}

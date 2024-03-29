/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteVertor, updatePinecone, updateText } from '@/lib/pinecone'
import prisma from '@/lib/prisma'
import type { Document } from 'langchain/document'
import { CSVLoader } from 'langchain/document_loaders/fs/csv'
import { DocxLoader } from 'langchain/document_loaders/fs/docx'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { TextLoader } from 'langchain/document_loaders/fs/text'
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import type { ActionType } from 'types'

const loaders = new Map<string, any>()
loaders.set('txt', TextLoader)
loaders.set('pdf', PDFLoader)
loaders.set('doc', DocxLoader)
loaders.set('docx', DocxLoader)
loaders.set('csv', CSVLoader)

export async function POST(req: NextRequest) {
  const user = await getToken({ req })
  if (!user?.isAdmin) {
    return new Response('Unauthorized', {
      status: 403
    })
  }

  const formData = await req.formData()
  const type = formData.get('type') as ActionType
  const title = formData.get('title') as string

  let docs: Document<Record<string, any>>[]

  if (type === 'WEBSITE') {
    const url = formData.get('url') as string

    const loader = new CheerioWebBaseLoader(url, { selector: 'section' })
    docs = await loader.load()

    // const text = docs.map((doc) => doc.pageContent).join('\n')
    // fs.writeFileSync('demo.txt', text)

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
    const ids = await updateText({ title, content })

    await prisma.documents.create({
      data: {
        title,
        content,
        pineconeIds: ids,
        isTrained: true
      }
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

    let allContent = ''
    docs.forEach((doc) => {
      const a = doc.pageContent.replace(/\n/g, '')
      allContent += a
      allContent += '\n\n'
    })

    await prisma.documents.create({
      data: {
        title,
        pineconeIds: ids,
        isTrained: true,
        content: allContent
      }
    })

    return NextResponse.json({ data: 'ok' })
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
  const user = await getToken({ req })
  if (!user?.isAdmin) {
    return new Response('Unauthorized', {
      status: 403
    })
  }
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { INDEX_NAME } from '@/lib/constants'
import { updatePinecone } from '@/lib/pinecone'
import prisma from '@/lib/prisma'
import type { Document } from 'langchain/document'
import { TextLoader } from 'langchain/document_loaders/fs/text'
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import type { ActionType } from 'types'

// export async function POST() {
//   const loader = new DirectoryLoader('./documents', {
//     '.txt': (path) => new TextLoader(path),
//     '.md': (path) => new TextLoader(path),
//     '.pdf': (path) => new PDFLoader(path)
//   })
//
//   const docs = await loader.load()
//   const client = pineconeClient()
//
//   try {
//     await client.describeIndex(INDEX_NAME)
//     await updatePinecone(client, INDEX_NAME, docs)
//   } catch (err) {
//     console.error('error: ', err)
//   }
//
//   return NextResponse.json({
//     data: 'successfully created index and loaded data into pinecone...'
//   })
// }

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const type = formData.get('type') as ActionType
  const title = formData.get('title') as string

  let docs: Document<Record<string, any>>[]

  if (type === 'WEBSITE') {
    const url = formData.get('url') as string

    const loader = new CheerioWebBaseLoader(url, { selector: 'article' })
    docs = await loader.load()
    await updatePinecone(INDEX_NAME, docs)
    await prisma.documents.create({
      data: { title, url }
    })

    return NextResponse.json({
      data: docs.at(0)?.pageContent
    })
  }

  if (type === 'FILE') {
    const file = formData.get('file') as File

    const loader = new TextLoader(file)
    docs = await loader.load()

    await updatePinecone(INDEX_NAME, docs)
    // await prisma.documents.create({
    //   data: {
    //     title: title
    //   }
    // })

    return NextResponse.json({
      data: 'comming soon'
    })
  }

  return NextResponse.json({
    data: 'comming soon'
  })
}

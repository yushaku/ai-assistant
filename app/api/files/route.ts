/* eslint-disable @typescript-eslint/no-explicit-any */
import { INDEX_NAME } from '@/lib/constants'
import { pineconeClient, updatePinecone } from '@/lib/pinecone'
import type { Document } from 'langchain/document'
// import { DirectoryLoader } from 'langchain/document_loaders/fs/directory'
// import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
// import { TextLoader } from 'langchain/document_loaders/fs/text'
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import type { Upload } from 'types'
import { isCrawWebsite, isUploadFile } from 'types'

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
  const data = (await req.json()) as Upload
  let docs: Document<Record<string, any>>[]
  const client = pineconeClient()

  if (isCrawWebsite(data)) {
    const loader = new CheerioWebBaseLoader(data.url, { selector: 'article' })
    docs = await loader.load()
    await updatePinecone(client, INDEX_NAME, docs)
    return NextResponse.json({
      data: docs.at(0)?.pageContent
    })
  }

  if (isUploadFile(data)) {
    return NextResponse.json({
      data: 'comming soon'
    })
  }

  return NextResponse.json({
    data: 'comming soon'
  })
}

import { INDEX_NAME } from '@/lib/constants'
import { pineconeClient, updatePinecone } from '@/lib/pinecone'
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { TextLoader } from 'langchain/document_loaders/fs/text'
import { NextResponse } from 'next/server'

export async function POST() {
  const loader = new DirectoryLoader('./documents', {
    '.txt': (path) => new TextLoader(path),
    '.md': (path) => new TextLoader(path),
    '.pdf': (path) => new PDFLoader(path)
  })

  const docs = await loader.load()
  const client = pineconeClient()

  try {
    await client.describeIndex(INDEX_NAME)
    await updatePinecone(client, INDEX_NAME, docs)
  } catch (err) {
    console.error('error: ', err)
  }

  return NextResponse.json({
    data: 'successfully created index and loaded data into pinecone...'
  })
}

export async function GET() {
  const client = pineconeClient()
  const res = await client.describeIndex(INDEX_NAME)
  return NextResponse.json(res)
}

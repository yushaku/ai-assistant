/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-console */
import { INDEX_NAME } from './constants'
import { Pinecone } from '@pinecone-database/pinecone'
import { loadQAStuffChain } from 'langchain/chains'
import { Document } from 'langchain/document'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { OpenAI } from 'langchain/llms/openai'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { v4 as uuid } from 'uuid'

export class PineconeClient {
  private static instance: Pinecone
  private constructor() {}
  public static getInstance(): Pinecone {
    if (!PineconeClient.instance) {
      PineconeClient.instance = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY || '',
        environment: process.env.PINECONE_ENVIRONMENT || ''
      })
    }
    return PineconeClient.instance
  }
}

const CHUNK_SIZE = 2000

export async function clearIndex() {
  const client = PineconeClient.getInstance()
  const index = client.Index(INDEX_NAME)
  await index.deleteAll()
}

export const queryPineconeVectorStoreAndQueryLLM = async (question: string) => {
  const client = PineconeClient.getInstance()
  const index = client.Index(INDEX_NAME)

  console.log(`Asking question: ${question}...`)
  const queryEmbedding = await new OpenAIEmbeddings().embedQuery(question)
  const queryResponse = await index.query({
    topK: 2,
    vector: queryEmbedding,
    includeMetadata: true,
    includeValues: true
  })

  console.log(`Found ${queryResponse?.matches?.length} matches...`)

  const matches = queryResponse.matches
  if (!matches) return

  const llm = new OpenAI()
  const chain = loadQAStuffChain(llm)
  const content = matches.map((match) => match.metadata?.pageContent).join(' ')

  const result = await chain.call({
    input_documents: [new Document({ pageContent: content })],
    question: question
  })
  return result.text
}

export const queryDatabase = async (question: string) => {
  const client = PineconeClient.getInstance()
  const pineconeIndex = client.Index(INDEX_NAME)
  const queryEmbedding = await new OpenAIEmbeddings({
    modelName: 'text-embedding-ada-002'
  }).embedQuery(question)
  const queryResponse = await pineconeIndex.query({
    topK: 2,
    vector: queryEmbedding,
    includeMetadata: true,
    includeValues: true
  })

  return queryResponse.matches ?? []
}

export const deleteVertor = async (id: string[]) => {
  const client = PineconeClient.getInstance()
  const index = client.Index(INDEX_NAME)
  index.deleteMany(id)
}

export const createPineconeIndex = async (
  client: Pinecone,
  indexName: string,
  vectorDimension: number
) => {
  const existingIndexes = await client.listIndexes()

  if (existingIndexes.some(({ name }) => name === indexName)) {
    console.log(`"${indexName}" already exists.`)
    return
  }

  console.log(`Creating "${indexName}"`)
  await client.createIndex({
    name: indexName,
    dimension: vectorDimension,
    metric: 'cosine'
  })
  console.log(`Creating index.... please wait for it to finish initializing.`)
}

export const updatePinecone = async (docs: Document<Record<string, any>>[]) => {
  const client = PineconeClient.getInstance()
  const pinconeIndex = client.Index(INDEX_NAME)
  const ids: Array<string> = []

  for (const doc of docs) {
    const txtPath = doc.metadata.source
    const text = doc.pageContent.replace(/\n/g, '')
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: CHUNK_SIZE,
      chunkOverlap: 24
    })
    const chunks = await textSplitter.createDocuments([text])

    const embeddings = new OpenAIEmbeddings({
      modelName: 'text-embedding-ada-002'
    })
    const embeddingsArrays = await embeddings.embedDocuments(
      chunks.map((chunk) => chunk.pageContent.replace(/\n/g, ''))
    )

    const batchSize = 2000
    let batch: any = []
    for (let index = 0; index < chunks.length; index++) {
      const id = `${txtPath}_${index}`
      ids.push(id)
      const chunk = chunks[index] as any
      const vector = {
        id,
        values: embeddingsArrays[index],
        metadata: {
          ...chunk.metadata,
          loc: JSON.stringify(chunk.metadata.loc),
          pageContent: chunk.pageContent,
          txtPath: txtPath
        }
      }
      batch = [...batch, vector]

      if (batch.length === batchSize || index === chunks.length - 1) {
        console.log(`Pinecone index updated with ${chunks.length} vectors`)
        await pinconeIndex.upsert([...batch])
      }
    }
  }
  console.log(`Pinecone index add file successfully`)
  return ids
}

export const updateText = async ({
  title,
  content
}: {
  title: string
  content: string
}) => {
  const client = PineconeClient.getInstance()
  const pineconeIndex = client.Index(INDEX_NAME)
  const ids: Array<string> = []

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: CHUNK_SIZE
  })
  const chunks = await textSplitter.createDocuments([content])
  const embeddingsArrays = await new OpenAIEmbeddings({
    modelName: 'text-embedding-ada-002'
  }).embedDocuments(chunks.map((chunk) => chunk.pageContent.replace(/\n/g, '')))

  const batchSize = 1000

  let batch: any = []
  for (let index = 0; index < chunks.length; index++) {
    const id = `${uuid()}_${index}`
    ids.push(id)
    const chunk = chunks[index] as any
    const vector = {
      id,
      values: embeddingsArrays[index],
      metadata: {
        ...chunk.metadata,
        loc: JSON.stringify(chunk.metadata.loc),
        pageContent: chunk.pageContent,
        txtPath: title
      }
    }
    batch = [...batch, vector]

    if (batch.length === batchSize || index === chunks.length - 1) {
      await pineconeIndex.upsert([...batch])
    }
  }

  console.log(`Pinecone index updated with ${chunks.length} vectors`)
  return ids
}

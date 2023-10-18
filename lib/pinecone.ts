/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-console */
import { INDEX_NAME } from './constants'
import { Pinecone } from '@pinecone-database/pinecone'
import { loadQAStuffChain } from 'langchain/chains'
import { Document } from 'langchain/document'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { OpenAI } from 'langchain/llms/openai'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'

let pinecone: Pinecone
export const pineconeClient = () => {
  if (process.env.NODE_ENV === 'production') {
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY || '',
      environment: process.env.PINECONE_ENVIRONMENT || ''
    })
  } else {
    // @ts-ignore:
    if (!global.pinecone) {
      // @ts-ignore:
      global.pinecone = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY || '',
        environment: process.env.PINECONE_ENVIRONMENT || ''
      })
    }
    // @ts-ignore:
    pinecone = global.pinecone
  }
  return pinecone
}

export const queryPineconeVectorStoreAndQueryLLM = async (
  client: Pinecone,
  indexName: string,
  question: string
) => {
  const index = client.Index(indexName)
  const queryEmbedding = await new OpenAIEmbeddings().embedQuery(question)
  console.log(`Asking question: ${question}...`)

  const queryResponse = await index.query({
    topK: 10,
    vector: queryEmbedding,
    includeMetadata: true,
    includeValues: true
  })

  console.log(`Found ${queryResponse?.matches?.length} matches...`)

  const match = queryResponse.matches
  if (!match) return

  const llm = new OpenAI()
  const chain = loadQAStuffChain(llm)
  const concatenatedPageContent = match
    .map((match) => match.metadata?.pageContent)
    .join(' ')

  const result = await chain.call({
    input_documents: [new Document({ pageContent: concatenatedPageContent })],
    question: question
  })

  // 10. Log the answer
  console.log(`Answer: ${result.text}`)
  return result.text
}

export const queryDatabase = async (question: string) => {
  const client = pineconeClient()
  const index = client.Index(INDEX_NAME)

  const queryEmbedding = await new OpenAIEmbeddings().embedQuery(question)
  const queryResponse = await index.query({
    topK: 10,
    vector: queryEmbedding,
    includeMetadata: true,
    includeValues: true
  })

  return queryResponse.matches ?? []
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

export const updatePinecone = async (
  client: Pinecone,
  indexName: string,
  docs: Document<Record<string, any>>[]
) => {
  console.log('Retrieving Pinecone index...')
  // 1. Retrieve Pinecone index
  const index = client.Index(indexName)
  // 2. Log the retrieved index name
  console.log(`Pinecone index retrieved: ${indexName}`)
  // 3. Process each document in the docs array
  for (const doc of docs) {
    console.log(`Processing document: ${doc.metadata.source}`)
    const txtPath = doc.metadata.source
    const text = doc.pageContent
    // 4. Create RecursiveCharacterTextSplitter instance
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000
    })
    console.log('Splitting text into chunks...')
    // 5. Split text into chunks (documents)
    const chunks = await textSplitter.createDocuments([text])
    console.log(`Text split into ${chunks.length} chunks`)
    console.log(
      `Calling OpenAI's Embedding endpoint documents with ${chunks.length} text chunks ...`
    )
    // 6. Create OpenAI embeddings for documents
    const embeddingsArrays = await new OpenAIEmbeddings().embedDocuments(
      chunks.map((chunk) => chunk.pageContent.replace(/\n/g, ' '))
    )
    console.log('Finished embedding documents')
    console.log(
      `Creating ${chunks.length} vectors array with id, values, and metadata...`
    )
    // 7. Create and upsert vectors in batches of 100
    const batchSize = 100
    let batch: any = []
    for (let idx = 0; idx < chunks.length; idx++) {
      const chunk = chunks[idx] as any
      const vector = {
        id: `${txtPath}_${idx}`,
        values: embeddingsArrays[idx],
        metadata: {
          ...chunk.metadata,
          loc: JSON.stringify(chunk.metadata.loc),
          pageContent: chunk.pageContent,
          txtPath: txtPath
        }
      }
      batch = [...batch, vector]

      if (batch.length === batchSize || idx === chunks.length - 1) {
        await index.upsert([...batch])
      }
    }
    console.log(`Pinecone index updated with ${chunks.length} vectors`)
  }
}

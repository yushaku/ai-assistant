import { INDEX_NAME } from '@/lib/constants'
import { PineconeClient } from '@/lib/pinecone'
import type { ScoredVector } from '@pinecone-database/pinecone'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'

export type Metadata = {
  url: string
  text: string
  chunk: string
}

export type Meta = {
  url: string
  text: string
  chunk: string
  hash: string
}

export const getContext = async (
  message: string,
  namespace: string = '',
  maxTokens = 3000,
  minScore = 0.7,
  getOnlyText = true
): Promise<string | ScoredVector[]> => {
  const embedding = await new OpenAIEmbeddings({
    modelName: 'text-embedding-ada-002'
  }).embedQuery(message.replace(/\n/g, ' '))

  const matches = await getMatchesFromEmbeddings(embedding, 1, namespace)
  const qualifyingDocs = matches.filter((m) => m.score && m.score > minScore)

  console.log({ matches })

  if (!getOnlyText) {
    return qualifyingDocs
  }

  const docs = matches
    ? qualifyingDocs.map((match) => match?.metadata?.pageContent ?? '')
    : []

  return docs.join('\n').substring(0, maxTokens)
}

const getMatchesFromEmbeddings = async (
  embeddings: number[],
  topK: number,
  namespace: string
) => {
  const client = PineconeClient.getInstance()
  const index = client.Index(INDEX_NAME)
  const pineconeNamespace = index.namespace(namespace ?? '')

  try {
    const queryResult = await pineconeNamespace.query({
      vector: embeddings,
      topK,
      includeMetadata: true
    })
    return queryResult.matches || []
  } catch (e) {
    console.error('Error querying embeddings: ', e)
    throw new Error(`Error querying embeddings: ${e}`)
  }
}

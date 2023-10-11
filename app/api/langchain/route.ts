import { pineconeClient } from '@/lib/pinecone'
import type { Message as VercelChatMessage } from 'ai'
import { StreamingTextResponse } from 'ai'
import { VectorDBQAChain } from 'langchain/chains'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { PromptTemplate } from 'langchain/prompts'
import { BytesOutputParser } from 'langchain/schema/output_parser'
import { NextResponse, type NextRequest } from 'next/server'
import { OpenAI } from "langchain/llms/openai";
import { INDEX_NAME } from '@/lib/constants'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'

export const runtime = 'edge'
const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`
}

const TEMPLATE = `You are a AI developer named Patchy. you are good at explaining thing so slear and easy to understand.
Current conversation: {chat_history}
User: {input}
AI: `

// export async function POST(req: NextRequest) {
//   const body = await req.json()
//   const messages = body.messages ?? []
//   const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage)
//   const currentMessageContent = messages[messages.length - 1].content
//
//   const prompt = PromptTemplate.fromTemplate(TEMPLATE)
//
//   const model = new ChatOpenAI({
//     temperature: 0.8,
//     streaming: true
//   })
//
//   const chain = prompt.pipe(model).pipe(new BytesOutputParser())
//
//   const stream = await chain.stream({
//     chat_history: formattedPreviousMessages.join('\n'),
//     input: currentMessageContent
//   })
//
//   return new StreamingTextResponse(stream)
// }

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const question = body.messages ?? []
  // const formattedPreviousMessages = question.slice(0, -1).map(formatMessage)
  const currentMessageContent = question[question.length - 1].content

  // const prompt = PromptTemplate.fromTemplate(TEMPLATE)

  const client = pineconeClient()
  const pineconeIndex = client.Index(INDEX_NAME) as any


  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    { pineconeIndex }
  );

  const model = new OpenAI()
  const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
    k: 1,
    returnSourceDocuments: true,
  });

  const response = await chain.call({ query: currentMessageContent });
  console.log(response);

  // const res = prompt.pipe(model).pipe(new BytesOutputParser())

  // const stream = await res.stream({
  //   chat_history: formattedPreviousMessages.join('\n'),
  //   input: currentMessageContent
  // })

  // return new StreamingTextResponse(stream)
  return NextResponse.json({
    data: response
  })

}

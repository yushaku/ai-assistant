import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export const runtime = 'edge'
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  try {
    const { name_file } = await req.json()

    return openai.fineTunes.create({
      training_file: name_file,
      model: 'gpt-3.5-turbo'
    })
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error
      return NextResponse.json({ name, status, headers, message }, { status })
    } else {
      throw error
    }
  }
}

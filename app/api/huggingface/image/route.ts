import { huggingface } from '../route'
import { experimental_buildOpenAssistantPrompt } from 'ai/prompts'

export const runtime = 'edge'
export async function POST(req: Request) {
  const { messages } = await req.json()

  const response: Blob = await huggingface.textToImage({
    model: 'stabilityai/stable-diffusion-2',
    inputs: experimental_buildOpenAssistantPrompt(messages)
  })

  return response.stream()
}

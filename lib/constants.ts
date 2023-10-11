export type Model = {
  title: string
  href: string
}

export const INDEX_NAME = 'ai-assistant'
export const VECTORDIMENSIONS = 1536

export const AI_MODELS: Array<Model> = [
  {
    title: 'hugging face',
    href: '/api/huggingface'
  },
  {
    title: 'open ai',
    href: '/api/openai'
  },
  {
    title: 'langchain',
    href: '/api/langchain'
  },
  {
    title: 'database',
    href: '/api/read'
  }
]

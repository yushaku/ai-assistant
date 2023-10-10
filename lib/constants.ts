export type Model = {
  title: string
  href: string
}

export const INDEX_NAME = 'my-test-pinecone-index'

export const AI_MODELS: Array<Model> = [
  {
    title: 'hugging face',
    href: '/api/huggingface'
  },
  {
    title: 'image',
    href: '/api/huggingface/image'
  },
  {
    title: 'open ai',
    href: '/api/openai'
  },
  {
    title: 'replicatte',
    href: '/api/replicate'
  },
  {
    title: 'langchain',
    href: '/api/langchain'
  }
]

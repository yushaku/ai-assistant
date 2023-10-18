import {
  ArrowUpTrayIcon,
  LinkIcon,
  PencilSquareIcon
} from '@heroicons/react/24/solid'
import type { ActionType } from 'types'

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

export const createDocBtn: {
  type: string
  href: ActionType
  desc: string
  Icon: JSX.Element
}[] = [
  {
    type: 'Write',
    href: 'TEXT',
    desc: 'Write or paste your document',
    Icon: <PencilSquareIcon color="#64ffda" className="h-7 w-7" />
  },
  {
    type: 'Upload',
    href: 'FILE',
    desc: 'PDF, Word or Powerpoint file',
    Icon: <ArrowUpTrayIcon color="orange" className="h-7 w-7" />
  },
  {
    type: 'Import Website',
    href: 'WEBSITE',
    desc: 'Webpage with text content',
    Icon: <LinkIcon color="#1377D3" className="h-7 w-7" />
  }
]

import { httpClient } from './client'
import type { Category } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

const PROMPT_PATH = '/category'
export const useGetCategory = () => {
  return useQuery([PROMPT_PATH], async () => {
    const res = await httpClient().get(PROMPT_PATH)
    const list = res.data ?? []
    return list as Category[]
  })
}

import { httpClient } from './client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type { PromptDTO, PromptList } from 'types'

const PROMPT_PATH = '/prompt'
export const useGetPrompts = () => {
  return useQuery([PROMPT_PATH], async () => {
    const res = await httpClient().get(PROMPT_PATH)
    const botList = res.data ?? []
    return botList as PromptList[]
  })
}

export const useCreatePrompt = () => {
  const queryClient = useQueryClient()

  return useMutation(
    [PROMPT_PATH],
    async (data: PromptDTO) => {
      const res = await httpClient().post(PROMPT_PATH, data)
      return res.data as unknown
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PROMPT_PATH])
        toast.success('Create successfully')
      }
    }
  )
}

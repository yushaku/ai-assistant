import { httpClient } from './client'
import type { Thread } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const PROMPT_PATH = '/thread'
export const useGetThreads = () => {
  return useQuery([PROMPT_PATH], async () => {
    const res = await httpClient().get(PROMPT_PATH)
    const list = res.data ?? []
    return list as Thread[]
  })
}

export const useCreateThread = () => {
  const queryClient = useQueryClient()

  return useMutation(
    [PROMPT_PATH],
    async (data: Pick<Thread, 'title'>) => {
      const res = await httpClient().post(PROMPT_PATH, data)
      return res.data as Thread
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PROMPT_PATH])
        toast.success('Create successfully')
      }
    }
  )
}

export const useUpdateThread = () => {
  const queryClient = useQueryClient()

  return useMutation(
    [PROMPT_PATH],
    async (data: Pick<Thread, 'title' | 'id'>) => {
      const res = await httpClient().put(PROMPT_PATH, data)
      return res.data as unknown
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PROMPT_PATH])
        toast.success('Update successfully')
      }
    }
  )
}

export const useDeleteThread = () => {
  const queryClient = useQueryClient()

  return useMutation(
    [PROMPT_PATH],
    async (id: string) => {
      const res = await httpClient().delete(`${PROMPT_PATH}/${id}`)
      return res.data as unknown
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PROMPT_PATH])
        toast.success('Delete successfully')
      }
    }
  )
}

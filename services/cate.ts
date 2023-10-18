import { httpClient } from './client'
import type { Category } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const PROMPT_PATH = '/category'
export const useGetCategory = () => {
  return useQuery([PROMPT_PATH], async () => {
    const res = await httpClient().get(PROMPT_PATH)
    const list = res.data ?? []
    return list as Category[]
  })
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation(
    [PROMPT_PATH],
    async (data: Pick<Category, 'title'>) => {
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

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()
  return useMutation(
    [PROMPT_PATH],
    async (data: Pick<Category, 'id' | 'title'>) => {
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

export const useDeleleCategory = () => {
  const queryClient = useQueryClient()
  return useMutation(
    [PROMPT_PATH],
    async (data: string) => {
      const res = await httpClient().post(PROMPT_PATH, data)
      return res.data as unknown
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PROMPT_PATH])
        toast.success('Detele successfully')
      }
    }
  )
}

import { httpClient } from './client'
import type { Documents } from '@prisma/client'
import {
  QueryClient,
  dehydrate,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { revalidatePath } from 'next/cache'
import toast from 'react-hot-toast'
import type { Upload } from 'types'

export const FILE_PATH = '/files'

export const useUpload = () => {
  const queryClient = useQueryClient()
  return useMutation(
    [FILE_PATH],
    async (data: Upload) => {
      toast.success('sending files')
      const res = await httpClient().post(`${FILE_PATH}`, data)
      return res.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([FILE_PATH])
      },
      onError: () => {
        toast.error('Create file got error')
      }
    }
  )
}

export const useDeleteFile = () => {
  return useMutation(
    [FILE_PATH],
    async (id: string) => {
      const res = await httpClient().delete(`${FILE_PATH}?id=${id}`)
      return res.data
    },
    {
      onSuccess: () => {
        revalidatePath('/files')
        toast.success('Delete successfully')
      }
    }
  )
}

export const useGetFiles = () => {
  return useQuery(
    [FILE_PATH],
    async () => {
      const res = await httpClient().get(FILE_PATH)
      const list = res.data ?? []
      return list as Documents[]
    },
    {
      cacheTime: Infinity,
      staleTime: 500 * 60 * 60
    }
  )
}

export function useGetFileDetail(id: string) {
  return useQuery(
    [`${FILE_PATH}/${id}`],
    async () => {
      const res = await httpClient().get(`${FILE_PATH}/${id}`)
      const list = res.data ?? []
      return list as Documents
    },
    {
      refetchOnMount: false,
      cacheTime: Infinity,
      staleTime: 500 * 60 * 60
    }
  )
}

export const usePrefetchFile = async (id: string) => {
  const client = new QueryClient()
  await client.prefetchQuery([`${FILE_PATH}/${id}`], async () => {
    const res = await httpClient().get(`${FILE_PATH}/${id}`)
    const list = res.data ?? []
    return list as Documents
  })
  return dehydrate(client)
}

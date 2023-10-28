import { httpClient } from './client'
import type { Documents } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type { Upload } from 'types'

export const FILE_PATH = '/files'

export const useUpload = () => {
  return useMutation([FILE_PATH], async (data: Upload) => {
    const res = await httpClient().post(`${FILE_PATH}`, data)
    return res.data
  })
}

export const useDeleteFile = () => {
  const queryClient = useQueryClient()
  return useMutation(
    [FILE_PATH],
    async (id: string) => {
      const res = await httpClient().delete(`${FILE_PATH}?id=${id}`)
      return res.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([FILE_PATH])
        toast.success('Delete successfully')
      }
    }
  )
}

export const useGetFiles = () => {
  return useQuery([FILE_PATH], async () => {
    const res = await httpClient().get(FILE_PATH)
    const list = res.data ?? []
    return list as Documents[]
  })
}

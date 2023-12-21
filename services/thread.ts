import { httpClient } from './client'
import type { FormReport } from '@/component/dialog/ReportDialog'
import type { Thread } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type { ChatCache } from 'types'

const PROMPT_PATH = '/thread'
export const useGetThreads = (num = 5) => {
  return useQuery([PROMPT_PATH], async () => {
    const res = await httpClient().get(`${PROMPT_PATH}?limit=${num}`)
    const list = res.data ?? []
    return list as Thread[]
  })
}

export const useGetMessage = (threadId: string, limit = 10) => {
  return useQuery(['/read'], async () => {
    const res = await httpClient().get(
      `read?threadId=${threadId}&limit=${limit}`
    )
    const list = res.data ?? []
    return list as ChatCache
  })
}

export const getThreads = async () => {
  const res = await httpClient().get(PROMPT_PATH)
  const list = res.data ?? []
  return list as Thread[]
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
      const res = await httpClient().delete(`${PROMPT_PATH}?id=${id}`)
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

export type Report = FormReport & { question: string; answer: string }

export const useCreateReport = () => {
  return useMutation(['/report'], async (data: Report) => {
    const res = await httpClient().post('report', data)
    return res.data as Thread
  })
}

import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { PreSignFile, PromptList } from 'types'

export const httpClient = () => {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    withCredentials: true,
    headers: {
      Accept: '*',
      'Content-Type': 'application/json'
    }
  })

  return client
}

export const PROMPT_PATH = '/category'
export const useGetPrompts = () => {
  return useQuery(
    [PROMPT_PATH],
    async () => {
      const res = await httpClient().get(PROMPT_PATH)
      const botList = res.data ?? []
      return botList as PromptList[]
    },
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false
    }
  )
}

export const FILE_PATH = '/files'
export const useUploadFile = () => {
  return useMutation([`${FILE_PATH}/presigned`], async (file: File) => {
    const res = await httpClient().post(`${FILE_PATH}/presigned`, {
      fileName: file.name
    })

    const preSign = res.data as PreSignFile
    // await uploadFile(file, preSign.postURL, preSign.formData)
    return preSign.postURL
  })
}

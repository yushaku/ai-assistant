import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import type { PreSignFile } from 'types'

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

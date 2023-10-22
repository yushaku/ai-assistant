import { httpClient } from './client'
import { useMutation } from '@tanstack/react-query'
import type { Upload } from 'types'

export const FILE_PATH = '/files'

export const useUpload = () => {
  return useMutation([`${FILE_PATH}`], async (data: Upload) => {
    const res = await httpClient().post(`${FILE_PATH}`, data)
    return res.data
  })
}

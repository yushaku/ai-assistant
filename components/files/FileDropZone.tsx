/* eslint-disable no-unused-vars */
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid'
import React, { useCallback, useState } from 'react'
import type { FileWithPath } from 'react-dropzone'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import { useUploadFile } from 'services/client'

type Props = { onSave: (url: string, title: string) => void }

export const FileDropZone = ({ onSave }: Props) => {
  const { mutateAsync: uploadFile, isLoading } = useUploadFile()
  const [isDragActive, setIsDragActive] = useState(false)

  const handleDragEnter = () => {
    setIsDragActive(true)
  }

  const handleDragLeave = () => {
    setIsDragActive(false)
  }

  const handleDropFile = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      acceptedFiles.forEach(async (file: File) => {
        const reader = new FileReader()

        reader.onabort = () => toast('file reading was aborted')
        reader.onerror = () => toast.error('file reading has failed')
        const url = await uploadFile(file)
        onSave(url, file.name)
      })
    },
    [uploadFile, onSave]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDropFile,
    maxSize: 20 * 1024 * 1024, // Maximum file size: 20MB
    accept: {
      'text/*': ['.docx', '.doc', '.pdf', '.txt']
    },
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    onDropRejected(fileRejections) {
      handleDragLeave()
      const errMessage = fileRejections?.at(0)?.errors?.at(0)?.message
      toast.error(
        errMessage ? errMessage : 'File type must be text: docx, doc, pdf, txt'
      )
    }
  })
  return (
    <div className="group mx-auto mt-16">
      <h5 className="text-lg font-semibold text-gray">Upload</h5>
      {isLoading ? (
        <span className="flex-center py-10">
          <p>Loading...</p>
        </span>
      ) : (
        <div
          {...getRootProps()}
          className={`flex-center mt-3 cursor-pointer flex-col rounded-lg border border-dashed py-10 ${
            isDragActive
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-gray bg-dark-200'
          }`}
        >
          <input {...getInputProps()} />
          <button>
            <ArrowUpTrayIcon color="orange" className="h-12 w-12" />
          </button>

          <span className="mt-5 max-w-[250px] text-center text-sm font-medium text-gray md:max-w-[415px] md:text-base">
            <span className="text-gray underline group-hover:text-blue-300">
              Click to upload
            </span>{' '}
            or drag and drop Up to 10 files like word, or PDF, and upto 20 MB
            each.
          </span>
        </div>
      )}
    </div>
  )
}

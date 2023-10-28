/* eslint-disable no-unused-vars */
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid'
import React, { useCallback, useState } from 'react'
import type { FileWithPath } from 'react-dropzone'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import type { Upload } from 'types'

export type Props = { onConfirm: (data: Upload) => void }

export const FileDropZone = ({ onConfirm }: Props) => {
  const [isDragActive, setIsDragActive] = useState(false)

  const handleDropFile = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      acceptedFiles.forEach(async (file) => {
        const reader = new FileReader()

        reader.onabort = () => toast('file reading was aborted')
        reader.onerror = () => toast.error('file reading has failed')

        const data = new FormData()
        data.set('file', file)
        data.set('type', 'FILE')
        data.set('title', file.name)
        onConfirm(data)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop: handleDropFile,
    maxSize: 4 * 1024 * 1024, // Maximum file size: 4MB
    accept: {
      'text/*': ['.docx', '.doc', '.pdf', '.txt']
    },
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropRejected(fileRejections) {
      setIsDragActive(false)
      const errMessage = fileRejections?.at(0)?.errors?.at(0)?.message
      toast.error(
        errMessage ? errMessage : 'File type must be text: docx, doc, pdf, txt'
      )
    }
  })

  return (
    <div className="group mx-auto mt-16">
      <h5 className="header-md">Upload</h5>
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
            Click to upload{' '}
          </span>
          or drag and drop Up to 10 files like word, or PDF, and upto 4 MB each.
        </span>
      </div>

      <ul className="list-disc pt-8 text-gray-400">
        {acceptedFiles.map((file: FileWithPath) => (
          <li key={file.path}>
            {file.path} - {file.size} bytes
          </li>
        ))}
      </ul>
    </div>
  )
}

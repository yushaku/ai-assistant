/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-unused-vars */
import { Button, Input } from '@material-tailwind/react'
import { Editor } from '@tinymce/tinymce-react'
import { useRef, useState } from 'react'

type Props = { onConfirm: (data: FormData) => void }

export const TextEditor = ({ onConfirm }: Props) => {
  const [value, setValue] = useState({
    content: '',
    title: ''
  })
  const API_KEY = process.env.NEXT_PUBLIC_TINY_API_KEY ?? ''
  const editorRef = useRef<any>(null)

  function handleSubmit() {
    const form = new FormData()
    form.set('type', 'TEXT')
    form.set('title', value.title)
    form.set('content', value.content)
    onConfirm(form)
  }

  return (
    <div className="my-12 rounded-lg bg-dark-200 p-5">
      <h5 className="header-md mb-4">Content</h5>

      <Input
        name="title"
        type="text"
        label="Title"
        required
        color="blue"
        className="text-gray-200"
        onChange={(e) => setValue({ ...value, title: e.target.value })}
      />

      <br />

      <Editor
        apiKey={API_KEY}
        onInit={(editor) => (editorRef.current = editor)}
        onEditorChange={(stringifiedHtmlValue) => {
          setValue({ ...value, content: stringifiedHtmlValue })
        }}
        init={{
          height: 300,
          resize: true,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
            'fullscreen'
          ],
          toolbar:
            'undo redo | ' +
            'blocks | ' +
            'bullist numlist | ' +
            'forecolor backcolor | ' +
            'outdent indent | ' +
            'bold italic | ' +
            'fullscreen',
          textpattern_patterns: [{ start: '*', end: '*', format: 'italic' }],
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />

      <div className="flex gap-3">
        <Button
          className="btn-outline mt-7 h-12 w-44 text-white"
          onClick={() => handleSubmit()}
        >
          Create
        </Button>
      </div>
    </div>
  )
}

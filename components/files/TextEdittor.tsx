/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-unused-vars */
import { Button, Input } from '@material-tailwind/react'
import JoditEditor from 'jodit-react'
import { useRef, useState } from 'react'

type Props = { onConfirm: (data: FormData) => void }

export const TextEditor = ({ onConfirm }: Props) => {
  const [value, setValue] = useState({
    content: '',
    title: ''
  })
  const editorRef = useRef<any>(null)

  function handleSubmit() {
    const form = new FormData()
    form.set('type', 'TEXT')
    form.set('title', value.title)
    form.set('content', value.content)
    onConfirm(form)
    setValue({ content: '', title: '' })
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

      <JoditEditor
        className="h-[300px] w-full"
        ref={editorRef}
        config={{
          theme: 'dark',
          colors: ['#fff']
        }}
        value={value.content}
        onBlur={(newContent) => setValue({ ...value, content: newContent })}
        // onChange={(text) => setValue({ ...value, content: text })}
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

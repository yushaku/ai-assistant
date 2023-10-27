'use client'

import { Button, Input } from '@material-tailwind/react'
import { useState } from 'react'
import type { Upload } from 'types'

// eslint-disable-next-line no-unused-vars
type Props = { onConfirm: (form: Upload) => void }

export const CrawlWebsiteForm = function ({ onConfirm }: Props) {
  const [form, setForm] = useState({ url: '', title: '' })

  function handleSubmit() {
    const data = new FormData()
    data.set('type', 'WEBSITE')
    data.set('title', form.title)
    data.set('url', form.url)
    onConfirm(data)
  }

  return (
    <div className="mt-16">
      <h5 className="font-semibold text-gray">Crawl Website</h5>

      <div className="mt-3 grid gap-6 rounded-lg bg-dark-200 p-5">
        <Input
          type="text"
          name="title"
          label="Website Title"
          color="blue"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="text-gray-400 focus:border-gray-600"
        />

        <Input
          type="text"
          name="link"
          label="Import Website"
          color="blue"
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
          className="text-gray-400 focus:border-gray-600"
        />

        <p className="mt-4 py-3 text-sm text-gray">
          Crawls your website for all textual content that HUCE AI can learn
          from, it works even better if you import with a sitemap link.
        </p>

        {/* <h5 className="font-semibold text-blue-300">Update to Premium</h5> */}

        <Button
          onClick={handleSubmit}
          title="Import Website"
          className="btn-outline my-4 bg-blue-500"
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

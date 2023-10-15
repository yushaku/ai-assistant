/* eslint-disable no-unused-vars */
import { Button, Input } from '@material-tailwind/react'

type Props = { onCrawlWebsite: (link: string) => void }

export const CrawlWebsiteForm = ({ onCrawlWebsite }: Props) => {
  return (
    <div className="mt-16">
      <h5 className="font-semibold text-gray">Crawl Website</h5>

      <div className="mt-3 rounded-lg bg-dark-200 p-5">
        <Input
          type="text"
          name="link"
          label="Import Website"
          color="blue"
          className="text-gray-400 focus:border-gray-600"
        />

        <p className="mt-4 py-3 text-sm text-gray">
          Crawls your website for all textual content that Tigon AI can learn
          from, it works even better if you import with a sitemap link.
        </p>

        <h5 className="font-semibold text-blue-300">Update to Premium</h5>

        <Button title="Import Website" className="btn-outline my-4 bg-blue-500">
          Submit
        </Button>
      </div>
    </div>
  )
}

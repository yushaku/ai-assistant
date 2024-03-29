import { TrashBtn } from '@/component/files/TrashBtn'
import { UPLOAD_FILE_PATH } from '@/lib/constants'
import prisma from '@/lib/prisma'
import moment from 'moment'
import Link from 'next/link'

const TABLE_HEAD = ['Title', 'Type', 'Is Trained', 'Created at', 'Updated at']

const queryData = async () => {
  'use server'
  const data = await prisma.documents.findMany({
    select: {
      id: true,
      title: true,
      url: true,
      content: true,
      isTrained: true,
      createdAt: true,
      updatedAt: true
    }
  })
  return data
}

export default async function DocumentPage() {
  const promptList = await queryData()

  return (
    <div className="no-scrollbar h-full w-full overflow-y-scroll bg-dark-200 px-12 pb-12 pt-24">
      <table className="w-full min-w-max table-auto text-left">
        <thead className="bg-dark-100">
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="mx-auto border-b border-blue-gray-100 first:p-4"
              >
                <p className="text-lg font-semibold text-white">{head}</p>
              </th>
            ))}

            <th className="border-b border-blue-gray-100 p-4">
              <Link href={UPLOAD_FILE_PATH} className="btn-outline text-white">
                create new
              </Link>
            </th>
          </tr>
        </thead>

        <tbody className="relative">
          {promptList?.length &&
            promptList?.map(
              ({ id, title, isTrained, url, createdAt, updatedAt }) => {
                return (
                  <tr
                    key={id}
                    className="font-normal text-gray-100 even:bg-dark-100 hover:bg-dark-50"
                  >
                    <td className="p-4">
                      <Link
                        className="link max-w-sm truncate"
                        href={`/files/${id}`}
                      >
                        {title}
                      </Link>
                    </td>
                    <td>
                      <p className="max-w-xs truncate">
                        {url ? 'Website Crawled' : 'Document Uploaded'}
                      </p>
                    </td>
                    <td>
                      {isTrained ? (
                        <p className="font-semibold text-green-500">yes</p>
                      ) : (
                        <p className="font-semibold text-orange-300">
                          Processing
                        </p>
                      )}
                    </td>
                    <td>
                      <p>{moment(createdAt).format('DD/MM/YYYY')}</p>
                    </td>
                    <td>
                      <p>{moment(updatedAt).format('DD/MM/YYYY')}</p>
                    </td>
                    <td className="flex-center">
                      <button className="rounded-lg p-3 font-normal text-gray-100 hover:bg-red-400">
                        <TrashBtn id={id} />
                      </button>
                    </td>
                  </tr>
                )
              }
            )}
        </tbody>
      </table>
    </div>
  )
}

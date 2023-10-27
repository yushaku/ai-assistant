/* eslint-disable no-console */
import { del, list } from '@vercel/blob'
import { type HandleUploadBody, handleUpload } from '@vercel/blob/client'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: NextRequest): Promise<NextResponse> {
  const user = await getToken({ req })

  const body = (await req.json()) as HandleUploadBody

  try {
    const jsonResponse = await handleUpload({
      token: '',
      body,
      request: req,
      onBeforeGenerateToken: async (pathname: string) => {
        console.log(pathname)

        return {
          allowedContentTypes: ['.docx', '.doc', '.pdf', '.txt'],
          tokenPayload: JSON.stringify({
            id: user?.id
          })
        }
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        try {
          const { userId } = JSON.parse(tokenPayload ?? '')
          console.log('blob upload completed', blob, tokenPayload, userId)
          // await db.update({ avatar: blob.url, userId })
        } catch (error) {
          throw new Error('Could not update user')
        }
      }
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    )
  }
}

export async function GET() {
  const { blobs } = await list()
  return Response.json(blobs)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const urlToDelete = searchParams.get('url') as string
  await del(urlToDelete)

  return new Response()
}

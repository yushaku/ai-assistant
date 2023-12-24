import { kv } from '@vercel/kv'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { v4 as uuid } from 'uuid'

export async function POST(req: NextRequest) {
  const data = (await req.json()) as Report
  await kv.hmset(`report`, { data, id: uuid() })
  return NextResponse.json('ok')
}

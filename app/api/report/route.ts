import { kv } from '@vercel/kv'
import { randomUUID } from 'crypto'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const data = (await req.json()) as Report
  await kv.hmset(`report`, { data, id: randomUUID() })
  return NextResponse.json('ok')
}

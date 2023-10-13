import type { Pinecone } from "@pinecone-database/pinecone"
import type { PrismaClient } from "@prisma/client"

declare global {
  const pinecone: Pinecone | undefined
  const prisma: PrismaClient | undefined
}

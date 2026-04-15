import { PrismaClient } from '@prisma/client'

export function getWriteClient(): PrismaClient {
  return new PrismaClient({
    log: ['error'],
  })
}

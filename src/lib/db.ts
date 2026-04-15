import { PrismaClient } from '@prisma/client'

// Only import adapter packages in non-edge runtime
let PrismaLibSQL: any = undefined;
let createLibsqlClient: any = undefined;

try {
  const adapter = require('@prisma/adapter-libsql');
  PrismaLibSQL = adapter.PrismaLibSQL;
  const libsql = require('@libsql/client');
  createLibsqlClient = libsql.createClient;
} catch (e) {
  // Packages not available, use direct connection
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL || ''

  // If DATABASE_URL is a libsql:// URL, use the adapter
  if (databaseUrl.startsWith('libsql://') && PrismaLibSQL && createLibsqlClient) {
    const libsql = createLibsqlClient({ url: databaseUrl })
    const adapter = new PrismaLibSQL(libsql)
    return new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    })
  }

  // Local SQLite or fallback
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

export function getReadClient(): PrismaClient {
  return createPrismaClient()
}

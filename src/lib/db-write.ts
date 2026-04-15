import { PrismaClient } from '@prisma/client'

let PrismaLibSQL: any = undefined;
let createLibsqlClient: any = undefined;

try {
  const adapter = require('@prisma/adapter-libsql');
  PrismaLibSQL = adapter.PrismaLibSQL;
  const libsql = require('@libsql/client');
  createLibsqlClient = libsql.createClient;
} catch (e) {}

export function getWriteClient(): PrismaClient {
  const databaseUrl = process.env.DATABASE_URL || ''

  if (databaseUrl.startsWith('libsql://') && PrismaLibSQL && createLibsqlClient) {
    const libsql = createLibsqlClient({ url: databaseUrl })
    const adapter = new PrismaLibSQL(libsql)
    return new PrismaClient({
      adapter,
      log: ['error'],
    })
  }

  return new PrismaClient({
    log: ['error'],
  })
}

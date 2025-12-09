// ------------------------------------------------------
// Central PrismaClient instance for Prisma 7
// - Uses Postgres via the official @prisma/adapter-pg
// - Reads connection string from process.env.DATABASE_URL
// ------------------------------------------------------

import { PrismaClient } from '@prisma/client';
// Prisma 7: must use a driver adapter for direct DB connections
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg'; // adapter for runtime connections

// Read the connection string from .env
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  // Fail fast if env is missing, easier to debug
  throw new Error('DATABASE_URL is not set in .env');
}

// 1) Create a pg Pool (connection pool to PostgreSQL)
const pool = new Pool({
  connectionString,
});

// 2) Wrap the Pool in PrismaPg adapter
const adapter = new PrismaPg(pool);

// 3) Create PrismaClient with *adapter* (required in Prisma 7)
export const prisma = new PrismaClient({
  adapter,
});

// Optional: add log options
// export const prisma = new PrismaClient({
//   adapter,
//   log: ['query', 'error', 'warn'],
// });

// ------------------------------------------------------
// Central PrismaClient instance for the whole app
// - In Prisma 7, PrismaClient still reads DATABASE_URL
//   from environment by default.
// ------------------------------------------------------

import { PrismaClient } from '@prisma/client';

// Create a single shared PrismaClient.
// In bigger apps might manage lifecycle explicitly,
// but for this learning project one instance is fine.
export const prisma = new PrismaClient();

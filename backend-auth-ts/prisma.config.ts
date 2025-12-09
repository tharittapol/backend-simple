// ------------------------------------------------------
// Prisma 7 configuration file
// - Tells Prisma CLI where schema is
// - Provides datasource URL (from .env) for migrations, etc.
// ------------------------------------------------------

import 'dotenv/config';                    // load .env
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  // Path to Prisma schema file
  schema: 'prisma/schema.prisma',

  // customize migrations path
  migrations: {
    path: 'prisma/migrations',
  },

  // Datasource configuration for CLI (migrate, studio, etc.)
  datasource: {
    // Use DATABASE_URL from .env
    url: env('DATABASE_URL'),
  },
});

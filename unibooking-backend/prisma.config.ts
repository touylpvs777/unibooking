import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

// Prisma 7 config file: used only by the CLI (migrate, studio, db pull/push).
// The running NestJS app never reads this -- PrismaService builds its own
// driver adapter directly from process.env.DATABASE_URL at runtime.
export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // CLI operations (push/migrate) need a session-capable connection --
    // the pgbouncer transaction-mode pooler in DATABASE_URL doesn't support
    // the advisory locks the schema engine relies on and hangs instead of
    // erroring. DIRECT_URL is the session-mode/direct connection reserved
    // for exactly this in .env.
    url: env('DIRECT_URL'),
  },
});

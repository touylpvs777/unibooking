import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
// `import ... = require(...)`, not `import cookieParser from 'cookie-parser'`
// or `import * as cookieParser from 'cookie-parser'` -- this tsconfig
// doesn't set esModuleInterop, and cookie-parser's types declare it via
// `export =` (a callable function+namespace merge, not an ES default
// export), which only this import form both type-checks as callable AND
// resolves to the real callable value at runtime.
import cookieParser = require('cookie-parser');
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  // rawBody: true makes Nest stash the unparsed request body on
  // `req.rawBody` alongside the normal parsed `req.body` -- payment
  // gateway webhooks (PaymentsController's /payments/webhook/* routes)
  // need the exact original bytes to verify a signature over; re-serializing
  // the parsed JSON body rarely reproduces them byte-for-byte.
  const app = await NestFactory.create(AppModule, { rawBody: true });

  // Populates `request.cookies`, which JwtStrategy's cookie extractor reads.
  app.use(cookieParser());

  // The Nuxt frontend calls this API with `credentials: 'include'`, so the
  // browser only attaches/accepts the auth cookie if the server explicitly
  // opts in with `credentials: true` -- and per the Fetch/XHR CORS spec,
  // that combination is REJECTED if `origin` is the wildcard `*`, so the
  // frontend's exact origin(s) must be named.
  app.enableCors({
    origin: (process.env.CORS_ORIGIN ?? 'http://localhost:3000').split(','),
    credentials: true,
  });

  // Applied globally so every DTO (RegisterDto, LoginDto, ...) is validated
  // the same way without each controller opting in individually.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips any request field not declared on the DTO
      forbidNonWhitelisted: true, // ...and 400s instead of silently dropping it
      transform: true, // turns plain JSON into real DTO class instances
    }),
  );

  // Ties Prisma's connection pool to Nest's own shutdown lifecycle -- see
  // the comment on PrismaService.enableShutdownHooks for why this matters
  // under a container orchestrator's SIGTERM during a rolling deploy.
  const prismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

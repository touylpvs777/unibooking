# syntax=docker/dockerfile:1

##############################################################################
# Stage 1: Build
##############################################################################
FROM node:20-alpine AS builder

# python3/make/g++: the C toolchain bcrypt's native addon needs to compile
# during `npm ci` -- alpine ships none of this by default. It never reaches
# the final image; only the already-compiled node_modules does (see the
# `npm prune` step at the end of this stage), so stage 2 stays free of the
# entire toolchain.
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Installed from the lockfile before any other source is copied in, so this
# layer -- the slowest one -- is only invalidated when a dependency
# actually changes, not on every source edit.
COPY package.json package-lock.json ./
RUN npm ci

# prisma.config.ts + prisma/schema.prisma before `prisma generate`: the
# Prisma 7 CLI reads prisma.config.ts to find the schema (see that file's
# own comment), so both must exist before this runs. The generated
# @prisma/client types are what `npm run build`'s type-check depends on --
# without this, the build fails.
COPY prisma.config.ts ./
COPY prisma ./prisma
RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" DIRECT_URL="postgresql://dummy:dummy@localhost:5432/dummy" npx prisma generate

COPY tsconfig*.json nest-cli.json ./
COPY src ./src
# 🌟 ອັບເດດ Nest CLI ໃຫ້ໃໝ່ເພື່ອໃຫ້ມັນຢຸດສົ່ງ Flag ຕົວເກົ່າທີ່ພັງນັ້ນອອກມາ
RUN npm install -g @nestjs/cli && npm run build


# Strips devDependencies (typescript, @nestjs/cli, jest, eslint, ...) out
# of the node_modules that's about to be copied into stage 2, while
# keeping bcrypt's already-compiled native addon intact. Reinstalling with
# --omit=dev from scratch in stage 2 would need the C toolchain there too,
# which defeats the point of a slim production image.
RUN npm prune --omit=dev

##############################################################################
# Stage 2: Production
##############################################################################
FROM node:20-alpine AS production

ENV NODE_ENV=production

# A dedicated, unprivileged system user. node:20-alpine runs as root by
# default; a process compromised via a dependency CVE or a request-handling
# bug should not have root inside its own container, let alone whatever
# root can reach if that container is ever escaped.
RUN addgroup -S nestjs && adduser -S nestjs -G nestjs

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# schema.prisma + migrations/ + prisma.config.ts aren't needed by the
# compiled app itself (PrismaService talks to the already-generated client
# sitting in node_modules), but they -- and the `prisma` CLI package,
# moved from devDependencies to dependencies in package.json specifically
# for this -- are exactly what docker-entrypoint.sh needs to run
# `prisma migrate deploy` from inside this container before the app
# starts. See that script and the "Prisma migration strategy" note in
# docker-compose.yml.
COPY --from=builder /app/prisma ./prisma
COPY prisma.config.ts package.json ./
COPY docker-entrypoint.sh ./

# mkdir uploads: LocalDiskStorageProvider creates this directory on boot
# too (mkdir recursive:true), but chown'ing it here, before USER drops
# root, is what makes it writable by the unprivileged nestjs user from the
# very first request rather than relying on that later best-effort mkdir.
RUN chmod +x docker-entrypoint.sh \
  && mkdir -p uploads \
  && chown -R nestjs:nestjs /app

USER nestjs

EXPOSE 3000

# No dedicated /health endpoint exists yet -- this checks the root route
# (AppController's unguarded GET /) as a "the process is alive and
# accepting HTTP" signal. Worth replacing with a real /health endpoint
# (e.g. one that also pings Postgres/Redis) as a follow-up.
#
# Shell form (not exec array), so $PORT is expanded at check time via
# `sh -c` -- hosts like Render assign PORT at runtime, and main.ts listens
# on whatever that is, so a hardcoded port here would silently stop
# matching and report false unhealthy status.
HEALTHCHECK --interval=30s --timeout=3s CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:${PORT:-3000}/ || exit 1

ENTRYPOINT ["./docker-entrypoint.sh"]

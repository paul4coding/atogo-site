# =============================================================================
#  @TOGO — Dockerfile multi-stage (Next.js 16 + pnpm + sortie standalone)
# =============================================================================

# ----- Base commune : Node 22 Alpine + pnpm via corepack -------------------
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app


# ----- 1. Dépendances ------------------------------------------------------
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Réseau tolérant aux connexions très lentes (gros binaires : three, mediapipe…)
# 1h de timeout par fichier, 1 seul téléchargement à la fois.
RUN pnpm config set fetch-retries 10 \
 && pnpm config set fetch-timeout 3600000 \
 && pnpm config set fetch-retry-mintimeout 30000 \
 && pnpm config set fetch-retry-maxtimeout 1200000 \
 && pnpm config set network-concurrency 1
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --network-concurrency=1


# ----- 2. Build ------------------------------------------------------------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Variables publiques nécessaires au build (injectées via --build-arg)
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build


# ----- 3. Image finale (production) ---------------------------------------
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Utilisateur non-root pour la sécurité
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Copie de la build standalone (minimale)
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]

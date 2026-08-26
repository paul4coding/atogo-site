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
# Seule variable publique restante : l'URL du site. Les identifiants de base et
# la clé de session sont lus AU RUNTIME — ils n'ont plus à être présents au
# build, contrairement aux anciennes clés NEXT_PUBLIC_SUPABASE_*.
ARG NEXT_PUBLIC_SITE_URL
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

# Script de création du compte admin (pnpm admin:create dans le conteneur)
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts

# Dossier des fichiers uploadés — monté sur un volume par docker compose.
# Créé et donné à `nextjs` ici pour que l'app puisse y écrire même si le
# volume est vide au premier démarrage.
RUN mkdir -p /app/storage && chown -R nextjs:nodejs /app/storage
ENV STORAGE_DIR=/app/storage
VOLUME ["/app/storage"]

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]

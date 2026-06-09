# Déploiement @TOGO — Docker

Image **Next.js 16** optimisée (multi-stage + sortie `standalone`, ~150 Mo, utilisateur non-root).

## Prérequis
- Docker + Docker Compose installés sur le serveur
- Un projet Supabase configuré (voir `SUPABASE_SETUP.sql`)

## 1. Variables d'environnement
Copier le modèle et remplir avec les vraies clés :

```bash
cp .env.example .env
# puis éditer .env
```

## 2. Lancer (build + démarrage)

```bash
docker compose up -d --build
```

Le site est disponible sur **http://localhost:3000**.

## Commandes utiles

```bash
docker compose logs -f          # voir les logs en direct
docker compose restart          # redémarrer
docker compose down             # arrêter et supprimer le conteneur
docker compose up -d --build    # reconstruire après une mise à jour du code
```

## Sans Docker Compose (Docker seul)

```bash
# Build
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL="https://xxxx.supabase.co" \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..." \
  --build-arg NEXT_PUBLIC_SITE_URL="https://atogo.tg" \
  -t atogo-site .

# Run
docker run -d -p 3000:3000 \
  -e SUPABASE_SERVICE_ROLE_KEY="eyJ..." \
  -e RESEND_API_KEY="re_..." \
  -e NEXT_PUBLIC_SUPABASE_URL="https://xxxx.supabase.co" \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..." \
  -e NEXT_PUBLIC_SITE_URL="https://atogo.tg" \
  --name atogo-site atogo-site
```

## Notes importantes

- Les variables `NEXT_PUBLIC_*` sont nécessaires **au build** (intégrées dans le bundle client) → passées en `--build-arg`.
- Les secrets serveur (`SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`) sont injectés **au runtime** uniquement → jamais dans le bundle client.
- Pour un reverse-proxy (Nginx / Traefik / Caddy) devant le conteneur, pointer vers le port `3000`.
- Mettre le site derrière **HTTPS** en production (Caddy/Traefik gèrent Let's Encrypt automatiquement).

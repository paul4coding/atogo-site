# Déploiement @TOGO — Docker + PostgreSQL

Deux conteneurs : l'application **Next.js 16** (multi-stage + sortie `standalone`,
~150 Mo, utilisateur non-root) et **PostgreSQL 17**.

> **Changement d'architecture.** Le site ne dépend plus de Supabase. La base est
> un PostgreSQL standard, l'authentification admin est gérée par l'application
> (cookie de session signé), et les fichiers sont écrits sur un volume disque.
> Voir [Migration depuis Supabase](#migration-depuis-supabase) en fin de document.

## Prérequis

| Composant | Version minimale |
|---|---|
| Docker Engine | 24.0+ |
| Docker Compose | v2.20+ |
| RAM | 2 Go (4 Go recommandé) |
| Stockage | 10 Go + la place des fichiers uploadés |
| Port exposé | 3000 (reverse-proxy Nginx/Caddy devant pour HTTPS) |

Hors Docker : Node.js 24.x LTS, pnpm 11.x (`corepack enable`), PostgreSQL 15+.

## 1. Variables d'environnement

```bash
cp .env.example .env
```

Puis remplir `.env`. Trois valeurs sont **obligatoires** :

| Variable | Rôle |
|---|---|
| `POSTGRES_PASSWORD` | mot de passe de la base (compose refuse de démarrer sans) |
| `SESSION_SECRET` | clé de signature des sessions admin — **48 caractères aléatoires** |
| `RESEND_API_KEY` | envoi des emails |

Générer la clé de session :

```bash
openssl rand -base64 48
```

`DATABASE_URL` et `STORAGE_DIR` sont construits automatiquement par
`docker-compose.yml` — ne les surchargez que hors Docker.

## 2. Lancer

```bash
docker compose up -d --build
```

Au tout premier démarrage, `postgres/schema.sql` est joué automatiquement sur la
base vide (tables, index, domaines par défaut). Le site répond sur
**http://localhost:3000**.

## 3. Créer le compte administrateur

Il n'y a plus de dashboard Supabase : le compte se crée en ligne de commande.

```bash
docker compose exec web node scripts/create-admin.mjs admin@atogo.tg 'MOT_DE_PASSE_FORT'
```

Connexion ensuite sur `/admin/login`. La même commande relancée sur un email
existant **remplace le mot de passe** — c'est la procédure de réinitialisation
en cas d'oubli.

## Commandes utiles

```bash
docker compose logs -f web      # logs de l'application
docker compose logs -f db       # logs PostgreSQL
docker compose restart          # redémarrer
docker compose up -d --build    # reconstruire après une mise à jour du code
docker compose down             # arrêter (données conservées)
docker compose down -v          # ⚠ arrêter ET SUPPRIMER base + fichiers
```

Ouvrir un `psql` sur la base :

```bash
docker compose exec db psql -U atogo -d atogo
```

## Sauvegardes

Deux choses à sauvegarder — la base **et** les fichiers.

```bash
# Base de données
docker compose exec -T db pg_dump -U atogo atogo | gzip > atogo-$(date +%F).sql.gz

# Fichiers uploadés (CV, dossiers AO, images)
docker run --rm -v atogo-site_atogo-storage:/data -v "$PWD":/backup alpine \
  tar czf /backup/atogo-storage-$(date +%F).tar.gz -C /data .
```

Restauration de la base :

```bash
gunzip -c atogo-2026-06-01.sql.gz | docker compose exec -T db psql -U atogo -d atogo
```

## Développement local

```bash
pnpm install
cp .env.example .env.local          # renseigner DATABASE_URL + SESSION_SECRET
psql "$DATABASE_URL" -f postgres/schema.sql
pnpm admin:create admin@atogo.tg 'MOT_DE_PASSE_FORT'
pnpm dev                            # → http://localhost:3000
```

## Points d'attention

| Point | Détail |
|---|---|
| `SESSION_SECRET` | Le changer **déconnecte tous les admins** (les jetons existants deviennent invalides). Ne pas le régénérer à chaque déploiement. |
| Volume `atogo-storage` | Indispensable. Sans lui, tous les CV et dossiers AO disparaissent au redémarrage du conteneur. |
| Volume `atogo-db` | Idem pour les données. `docker compose down -v` détruit les deux. |
| Base non exposée | Le port 5432 n'est pas publié sur l'hôte. Ne l'ouvrez pas sur un serveur public. |
| Reverse-proxy HTTPS | Nginx ou Caddy devant le port 3000. Les cookies de session sont `secure` en production : **sans HTTPS, la connexion admin ne fonctionnera pas.** |
| `NEXT_PUBLIC_SITE_URL` | Doit refléter le domaine réel, y compris le schéma (`https://atogo.tg`). |
| Domaine Resend | Vérifier `atogo.tg` dans le dashboard Resend pour éviter le spam. |
| Tailwind CSS v4 | Config CSS-first via `@theme` dans `globals.css`. Les classes utilitaires ne compilent pas dans les composants `use client` — styles inline. |

## Déploiement sur Vercel

**Vercel n'est plus adapté tel quel.** Son système de fichiers est éphémère : les
CV, dossiers AO et images d'actualités écrits dans `STORAGE_DIR` disparaîtraient
à chaque redéploiement. Auparavant ces fichiers vivaient dans Supabase Storage,
un service externe — ce n'est plus le cas.

Trois options si Vercel doit être conservé :

1. **Auto-héberger** (Docker sur un VPS) — c'est le chemin décrit ci-dessus, et
   le seul qui fonctionne sans modification.
2. **Brancher un stockage objet** (S3, Cloudflare R2, Scaleway) en réécrivant
   `src/lib/storage.ts`. C'est le seul fichier à changer : le reste du code ne
   connaît que `saveFile` / `readFile` / `publicUrl`.
3. **Garder Vercel pour le front** et pointer `DATABASE_URL` vers un Postgres
   managé (Neon, Supabase en mode base seule, RDS) avec `DATABASE_SSL=true` —
   en sachant que les **uploads resteront cassés** tant que le point 2 n'est pas
   fait.

## Migration depuis Supabase

Ce qui a changé, et ce que ça implique côté exploitation :

| Avant (Supabase) | Après (PostgreSQL) |
|---|---|
| Base managée + RLS | PostgreSQL standard. Le contrôle d'accès est fait par les routes `/api/*`, seules à parler à la base. |
| Supabase Auth | Table `admin_users` + cookie de session JWT signé (`SESSION_SECRET`). Compte créé par `pnpm admin:create`. |
| Supabase Storage (buckets) | Dossiers sur disque sous `STORAGE_DIR`. Bucket privé `cvs` servi par `/api/admin/files/...` (session requise). |
| URLs signées temporaires | Accès vérifié à chaque requête sur le cookie admin — plus d'URL à faire expirer. |
| 3 clés `SUPABASE_*` | `DATABASE_URL` + `SESSION_SECRET` |

**Reprise des données existantes**, si un projet Supabase est encore en service :

```bash
# 1. Exporter les données depuis Supabase (Dashboard → Settings → Database)
pg_dump --data-only --no-owner --no-privileges \
  --table=job_offers --table=applications --table=news \
  --table=tenders --table=tender_responses --table=domains \
  "postgresql://postgres:MDP@db.xxxx.supabase.co:5432/postgres" > donnees.sql

# 2. Créer le schéma sur la nouvelle base, puis importer
psql "$DATABASE_URL" -f postgres/schema.sql
psql "$DATABASE_URL" -f donnees.sql
```

Deux points de vigilance :

- **Les comptes admin ne se migrent pas.** Les mots de passe vivaient dans
  `auth.users` côté Supabase. Recréer chaque admin avec `pnpm admin:create`.
- **Les fichiers doivent être retéléchargés** depuis les buckets Supabase et
  déposés dans `STORAGE_DIR/cvs`, `STORAGE_DIR/tender-docs` et
  `STORAGE_DIR/news-images`, en conservant les noms de fichiers. Les anciennes
  lignes dont `image_url` / `document_url` contient une URL Supabase complète
  continuent de pointer vers Supabase : le code les ouvre telles quelles tant
  que le projet existe.

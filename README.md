# @TOGO — Site vitrine

Site institutionnel de **@TOGO** (Lomé, Togo) — Next.js 16 (App Router),
React 19, TypeScript, Tailwind CSS v4, PostgreSQL.

Production : [atogo.tg](https://atogo.tg)

## Stack

| Couche | Techno |
|---|---|
| Framework | Next.js 16 (App Router) — SSR + routes API |
| Base de données | PostgreSQL 15+ (via `pg`) |
| Auth admin | Session JWT maison (`jose`) + mots de passe scrypt |
| Fichiers | Disque local (`STORAGE_DIR`), servi par des routes API |
| Email | Resend |
| UI | Tailwind CSS v4, Framer Motion, Three.js / R3F, Lucide |
| Formulaires | React Hook Form + Zod |
| Paquets | pnpm 11 |

## Démarrage rapide

```bash
pnpm install
cp .env.example .env.local
```

Renseigner au minimum `DATABASE_URL` et `SESSION_SECRET` dans `.env.local`
(`openssl rand -base64 48` pour la clé), puis :

```bash
psql "$DATABASE_URL" -f postgres/schema.sql   # créer les tables
pnpm admin:create admin@atogo.tg 'MOT_DE_PASSE_FORT'
pnpm dev                                       # → http://localhost:3000
```

L'espace d'administration est sur [/admin](http://localhost:3000/admin).

Avec Docker (l'application **et** la base) :

```bash
cp .env.example .env    # remplir POSTGRES_PASSWORD, SESSION_SECRET, RESEND_API_KEY
docker compose up -d --build
docker compose exec web node scripts/create-admin.mjs admin@atogo.tg 'MOT_DE_PASSE_FORT'
```

## Commandes

```bash
pnpm dev           # serveur de développement
pnpm build         # build production
pnpm start         # servir la build
pnpm lint          # ESLint
pnpm typecheck     # tsc --noEmit
pnpm db:init       # jouer postgres/schema.sql sur $DATABASE_URL
pnpm admin:create  # créer / réinitialiser un compte admin
```

## Architecture

Le navigateur ne parle **jamais** à la base de données. Toutes les lectures et
écritures passent par des routes API, qui sont le seul endroit où vivent les
identifiants et le contrôle d'accès.

```
src/
├── app/
│   ├── (pages publiques)      /  /services  /transferts  /danayacash
│   │                          /about  /actualites  /carriere  /contact
│   ├── admin/                 espace d'administration (protégé)
│   └── api/
│       ├── auth/              login · logout · me · account
│       ├── public/            lectures publiques (contenu publié uniquement)
│       ├── admin/             CRUD admin — chaque route exige une session
│       ├── files/[bucket]/    fichiers publics (images, cahiers des charges)
│       ├── apply/             candidature (upload CV + lettre)
│       ├── tender-response/   réponse à un appel d'offres (dossier .zip)
│       └── contact/           formulaire de contact (Resend)
├── lib/
│   ├── db.ts                  pool PostgreSQL + helpers de requête
│   ├── auth.ts                hachage scrypt + accès aux comptes admin
│   ├── session.ts             JWT de session (compatible runtime Edge)
│   ├── storage.ts             stockage disque (buckets cvs / tender-docs / news-images)
│   ├── api.ts                 garde `requireAdmin` + validation (serveur)
│   └── api-client.ts          appels HTTP typés (navigateur)
├── middleware.ts              protège /admin/* avant rendu
└── types/database.ts          types des tables
```

### Sécurité

- Les routes `/api/admin/*` vérifient la session à chaque appel. Le middleware
  ne protège que l'**affichage** des pages ; les données sont protégées côté
  route (c'est ce qui remplace les politiques RLS de Supabase).
- Le bucket `cvs` (CV, lettres, dossiers AO) n'est accessible que par
  `/api/admin/files/<nom>`, sous session admin.
- Toutes les requêtes SQL sont paramétrées (`$1, $2…`) ; les colonnes
  modifiables passent par une liste blanche explicite.
- Le cookie de session est `httpOnly` et `secure` en production — **le site doit
  être servi en HTTPS** pour que la connexion admin fonctionne.

## Base de données

Le schéma complet est dans [`postgres/schema.sql`](postgres/schema.sql) :
`admin_users`, `job_offers`, `applications`, `news`, `tenders`,
`tender_responses`, `domains`.

## Déploiement

Voir [DEPLOY.md](DEPLOY.md) — Docker Compose, sauvegardes, et la note sur
Vercel (le stockage de fichiers sur disque impose l'auto-hébergement, ou un
stockage objet à brancher dans `src/lib/storage.ts`).

-- =============================================================================
--  @TOGO — Schéma PostgreSQL complet
--  À exécuter une seule fois sur une base vierge :
--     psql "$DATABASE_URL" -f postgres/schema.sql
--  (en Docker, le fichier est monté dans /docker-entrypoint-initdb.d et joué
--   automatiquement au premier démarrage du conteneur postgres)
-- =============================================================================
--  Différences avec l'ancien SUPABASE_SETUP.sql :
--   - plus de RLS : le contrôle d'accès est fait par les routes API Next.js,
--     qui sont les seules à parler à la base (le navigateur ne s'y connecte pas)
--   - plus de storage.buckets : les fichiers sont écrits sur disque (STORAGE_DIR)
--   - nouvelle table admin_users : remplace Supabase Auth
--   - colonne tender_responses.dossier_zip_url ajoutée (elle manquait dans
--     l'ancien script alors que le code l'écrivait déjà)
-- =============================================================================

-- gen_random_uuid() est natif à partir de PostgreSQL 13 ; l'extension couvre
-- les versions antérieures et ne coûte rien sur les récentes.
create extension if not exists pgcrypto;


-- =============================================================================
--  1. ADMINISTRATEURS (remplace Supabase Auth)
-- =============================================================================
create table if not exists admin_users (
  id            uuid primary key default gen_random_uuid(),
  email         text not null unique,
  -- Format : scrypt:N:r:p:<sel hex>:<empreinte hex>  (voir src/lib/auth.ts)
  password_hash text not null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);


-- =============================================================================
--  2. CONTENU
-- =============================================================================

-- Offres d'emploi -------------------------------------------------------------
create table if not exists job_offers (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  department    text not null,
  contract_type text not null,
  location      text not null default 'Lomé, Togo',
  description   text not null,
  requirements  text[] not null default '{}',
  status        text not null default 'draft' check (status in ('draft', 'published')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Candidatures (sur offre précise OU spontanées) ------------------------------
create table if not exists applications (
  id             uuid primary key default gen_random_uuid(),
  job_offer_id   uuid references job_offers(id) on delete set null,
  type           text not null check (type in ('application', 'spontaneous')),
  name           text not null,
  email          text not null,
  phone          text,
  cover_letter   text not null default '',
  cv_url         text,            -- chemin relatif dans le bucket privé "cvs"
  motivation_url text,            -- chemin de la lettre de motivation
  status         text not null default 'pending' check (status in ('pending', 'reviewed', 'accepted', 'rejected')),
  created_at     timestamptz not null default now()
);

-- Actualités ------------------------------------------------------------------
create table if not exists news (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  excerpt      text not null,
  content      text not null,
  image_url    text,
  status       text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at   timestamptz not null default now()
);

-- Appels d'offres -------------------------------------------------------------
create table if not exists tenders (
  id           uuid primary key default gen_random_uuid(),
  ref          text not null unique,
  title        text not null,
  description  text not null,
  deadline     text not null default 'Ouvert',
  document_url text,              -- cahier des charges (bucket public "tender-docs")
  status       text not null default 'draft' check (status in ('draft', 'published')),
  created_at   timestamptz not null default now()
);

-- Réponses aux appels d'offres ------------------------------------------------
create table if not exists tender_responses (
  id              uuid primary key default gen_random_uuid(),
  tender_id       uuid not null references tenders(id) on delete cascade,
  company_name    text not null,
  contact_name    text not null,
  email           text not null,
  phone           text,
  message         text,
  document_url    text,           -- proforma / devis   (bucket privé "cvs")
  dossier_zip_url text,           -- dossier complet .zip (bucket privé "cvs")
  created_at      timestamptz not null default now()
);

-- Domaines d'intérêt (page Carrière — candidature spontanée) ------------------
create table if not exists domains (
  id         uuid primary key default gen_random_uuid(),
  label      text not null,
  color      text not null default '#1E9FE8',
  active     boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);


-- =============================================================================
--  3. INDEX
--     Les listes publiques filtrent sur status et trient par date : ces index
--     évitent un seq scan dès que les tables grossissent.
-- =============================================================================
create index if not exists idx_job_offers_status       on job_offers (status, created_at desc);
create index if not exists idx_news_status             on news (status, published_at desc nulls last);
create index if not exists idx_tenders_status          on tenders (status, created_at desc);
create index if not exists idx_applications_created    on applications (created_at desc);
create index if not exists idx_applications_job_offer  on applications (job_offer_id);
create index if not exists idx_tender_responses_tender on tender_responses (tender_id);
create index if not exists idx_domains_sort            on domains (sort_order);


-- =============================================================================
--  4. DONNÉES INITIALES — Domaines d'intérêt
-- =============================================================================
insert into domains (label, color, sort_order)
select * from (values
  ('Fintech & Transferts',       '#10B981', 1),
  ('Développement Web & Mobile', '#1E9FE8', 2),
  ('Commercial & Marketing',     '#F59E0B', 3),
  ('Cybersécurité',              '#EF4444', 4),
  ('Design & Communication',     '#7C3AED', 5),
  ('Administration & Finance',   '#0891B2', 6)
) as seed(label, color, sort_order)
where not exists (select 1 from domains);


-- =============================================================================
--  FIN — Créer ensuite le compte admin :
--     pnpm admin:create admin@atogo.tg '<MOT_DE_PASSE_FORT>'
-- =============================================================================

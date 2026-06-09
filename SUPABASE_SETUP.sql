-- =============================================================================
--  @TOGO — Script de configuration Supabase complet
--  À exécuter dans : Supabase Dashboard → SQL Editor → New query
--  Pour un NOUVEAU projet : exécuter ce script en entier, une seule fois.
-- =============================================================================
--  Après exécution, n'oublie pas :
--   1. Créer le compte admin : Authentication → Users → Add user (email + mot de passe)
--   2. Renseigner les variables dans .env.local :
--        NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
-- =============================================================================


-- =============================================================================
--  1. TABLES
-- =============================================================================

-- Offres d'emploi -------------------------------------------------------------
create table if not exists job_offers (
  id            uuid default gen_random_uuid() primary key,
  title         text not null,
  department    text not null,
  contract_type text not null,
  location      text default 'Lomé, Togo',
  description   text not null,
  requirements  text[] default '{}',
  status        text default 'draft' check (status in ('draft', 'published')),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- Candidatures (sur offre précise OU spontanées) ------------------------------
create table if not exists applications (
  id             uuid default gen_random_uuid() primary key,
  job_offer_id   uuid references job_offers(id) on delete set null,
  type           text not null check (type in ('application', 'spontaneous')),
  name           text not null,
  email          text not null,
  phone          text,
  cover_letter   text not null,
  cv_url         text,            -- chemin du CV dans le bucket privé "cvs"
  motivation_url text,            -- chemin de la lettre de motivation
  status         text default 'pending' check (status in ('pending', 'reviewed', 'accepted', 'rejected')),
  created_at     timestamptz default now()
);

-- Actualités ------------------------------------------------------------------
create table if not exists news (
  id           uuid default gen_random_uuid() primary key,
  title        text not null,
  excerpt      text not null,
  content      text not null,
  image_url    text,
  status       text default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at   timestamptz default now()
);

-- Appels d'offres -------------------------------------------------------------
create table if not exists tenders (
  id           uuid default gen_random_uuid() primary key,
  ref          text not null unique,
  title        text not null,
  description  text not null,
  deadline     text default 'Ouvert',
  document_url text,              -- cahier des charges (bucket public "tender-docs")
  status       text default 'draft' check (status in ('draft', 'published')),
  created_at   timestamptz default now()
);

-- Réponses aux appels d'offres ------------------------------------------------
create table if not exists tender_responses (
  id           uuid default gen_random_uuid() primary key,
  tender_id    uuid references tenders(id) on delete cascade not null,
  company_name text not null,
  contact_name text not null,
  email        text not null,
  phone        text,
  message      text,
  document_url text,              -- proforma (bucket privé "cvs")
  created_at   timestamptz default now()
);

-- Domaines d'intérêt (page Carrière — candidature spontanée) ------------------
create table if not exists domains (
  id         uuid default gen_random_uuid() primary key,
  label      text not null,
  color      text default '#1E9FE8',
  active     boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);


-- =============================================================================
--  2. ACTIVER ROW LEVEL SECURITY
-- =============================================================================
alter table job_offers       enable row level security;
alter table applications     enable row level security;
alter table news             enable row level security;
alter table tenders          enable row level security;
alter table tender_responses enable row level security;
alter table domains          enable row level security;


-- =============================================================================
--  3. POLITIQUES RLS — TABLES
--     (les politiques se combinent en OR : public voit le "publié",
--      l'admin connecté voit/gère tout)
-- =============================================================================

-- Lecture publique du contenu publié -----------------------------------------
drop policy if exists "Public read published job_offers" on job_offers;
create policy "Public read published job_offers" on job_offers
  for select using (status = 'published');

drop policy if exists "Public read published news" on news;
create policy "Public read published news" on news
  for select using (status = 'published');

drop policy if exists "Public read published tenders" on tenders;
create policy "Public read published tenders" on tenders
  for select using (status = 'published');

-- Insertion publique (formulaires candidature / réponse AO) -------------------
drop policy if exists "Public insert applications" on applications;
create policy "Public insert applications" on applications
  for insert with check (true);

drop policy if exists "Public insert tender_responses" on tender_responses;
create policy "Public insert tender_responses" on tender_responses
  for insert with check (true);

-- Accès admin complet (utilisateurs authentifiés) ----------------------------
drop policy if exists "Auth full access job_offers" on job_offers;
create policy "Auth full access job_offers" on job_offers
  for all to authenticated using (true) with check (true);

drop policy if exists "Auth full access news" on news;
create policy "Auth full access news" on news
  for all to authenticated using (true) with check (true);

drop policy if exists "Auth full access tenders" on tenders;
create policy "Auth full access tenders" on tenders
  for all to authenticated using (true) with check (true);

-- Candidatures : l'admin lit et met à jour le statut -------------------------
drop policy if exists "Auth read applications" on applications;
create policy "Auth read applications" on applications
  for select to authenticated using (true);

drop policy if exists "Auth update applications" on applications;
create policy "Auth update applications" on applications
  for update to authenticated using (true) with check (true);

-- Réponses AO : l'admin les consulte -----------------------------------------
drop policy if exists "Auth read tender_responses" on tender_responses;
create policy "Auth read tender_responses" on tender_responses
  for select to authenticated using (true);

-- Domaines : public lit les actifs, admin gère tout --------------------------
drop policy if exists "Public read active domains" on domains;
create policy "Public read active domains" on domains
  for select using (active = true);

drop policy if exists "Auth read all domains" on domains;
create policy "Auth read all domains" on domains
  for select to authenticated using (true);

drop policy if exists "Auth insert domains" on domains;
create policy "Auth insert domains" on domains
  for insert to authenticated with check (true);

drop policy if exists "Auth update domains" on domains;
create policy "Auth update domains" on domains
  for update to authenticated using (true) with check (true);

drop policy if exists "Auth delete domains" on domains;
create policy "Auth delete domains" on domains
  for delete to authenticated using (true);


-- =============================================================================
--  4. DONNÉES INITIALES — Domaines d'intérêt
-- =============================================================================
insert into domains (label, color, sort_order) values
  ('Fintech & Transferts',       '#10B981', 1),
  ('Développement Web & Mobile', '#1E9FE8', 2),
  ('Commercial & Marketing',     '#F59E0B', 3),
  ('Cybersécurité',              '#EF4444', 4),
  ('Design & Communication',     '#7C3AED', 5),
  ('Administration & Finance',   '#0891B2', 6)
on conflict do nothing;


-- =============================================================================
--  5. STORAGE — Création des buckets
--     cvs         → PRIVÉ  (CV, lettres de motivation, proformas)
--     tender-docs → PUBLIC (cahiers des charges téléchargeables)
--     news-images → PUBLIC (images des actualités)
-- =============================================================================
insert into storage.buckets (id, name, public) values
  ('cvs',         'cvs',         false),
  ('tender-docs', 'tender-docs', true),
  ('news-images', 'news-images', true)
on conflict (id) do update set public = excluded.public;


-- =============================================================================
--  6. POLITIQUES RLS — STORAGE
-- =============================================================================

-- Lecture publique des buckets publics ---------------------------------------
drop policy if exists "Public read tender-docs" on storage.objects;
create policy "Public read tender-docs" on storage.objects
  for select using (bucket_id = 'tender-docs');

drop policy if exists "Public read news-images" on storage.objects;
create policy "Public read news-images" on storage.objects
  for select using (bucket_id = 'news-images');

-- Lecture admin du bucket privé (génération des URLs signées) -----------------
drop policy if exists "Public read cvs" on storage.objects;     -- ancienne politique publique éventuelle
drop policy if exists "Auth read cvs" on storage.objects;
create policy "Auth read cvs" on storage.objects
  for select to authenticated using (bucket_id = 'cvs');

-- Upload par l'admin connecté (images actualités + cahiers des charges) -------
-- (les CV/proformas sont uploadés côté serveur via la clé service_role)
drop policy if exists "Auth upload cvs" on storage.objects;
create policy "Auth upload cvs" on storage.objects
  for insert to authenticated with check (bucket_id = 'cvs');

drop policy if exists "Auth upload tender-docs" on storage.objects;
create policy "Auth upload tender-docs" on storage.objects
  for insert to authenticated with check (bucket_id = 'tender-docs');

drop policy if exists "Auth upload news-images" on storage.objects;
create policy "Auth upload news-images" on storage.objects
  for insert to authenticated with check (bucket_id = 'news-images');


-- =============================================================================
--  FIN — Pense à créer le compte admin dans Authentication → Users
-- =============================================================================

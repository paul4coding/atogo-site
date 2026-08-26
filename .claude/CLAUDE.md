# @TOGO — Instructions Claude Code

> Fichier de référence pour Claude Code sur ce projet. Lire avant toute modification.

---

## Contexte projet

Site vitrine **new gen 2025-2026** pour la société **@TOGO**, basée à Lomé, Togo.
Activités : Fintech (DanayaCash), IT, Marketing Digital, Cybersécurité, Développement de contenus.

**URL cible** : https://atogo.tg  
**Déploiement** : Docker (app + PostgreSQL) — voir `DEPLOY.md`  
**Dev** : `pnpm dev` → http://localhost:3000

> ⚠ Le projet n'utilise **plus Supabase**. Base PostgreSQL standard, auth admin
> maison (cookie de session signé), fichiers sur disque (`STORAGE_DIR`).
> Vercel n'est plus adapté en l'état : son FS est éphémère et les uploads
> seraient perdus à chaque déploiement (détails dans `DEPLOY.md`).

---

## Stack technique

| Couche | Techno | Notes |
|--------|--------|-------|
| Framework | Next.js (App Router) | TypeScript |
| Styles | **Tailwind CSS v4** | Config CSS-first via `@theme` dans globals.css — PAS de tailwind.config.ts |
| Composants UI | shadcn/ui + Radix UI | |
| Animations | Framer Motion v12 | Compatible React 19 |
| 3D / WebGL | Three.js + React Three Fiber + Drei | |
| Particules | Canvas custom (`ParticlesBg.tsx`) | tsparticles v4 incompatible |
| Formulaires | React Hook Form + Zod | |
| Base de données | **PostgreSQL** (`pg`) | Schéma dans `postgres/schema.sql` — jamais appelée depuis le navigateur |
| Auth admin | JWT maison (`jose`) + scrypt | Table `admin_users` · `pnpm admin:create` |
| Fichiers | Disque (`STORAGE_DIR`) | Buckets `cvs` (privé) · `tender-docs` · `news-images` |
| Email | Resend | Route `/api/contact` |
| i18n | next-intl | FR/EN — pas encore configuré |
| Package manager | **pnpm v11** | |

---

## ⚠️ Règles critiques CSS

**Tailwind v4 JIT ne compile pas les classes utilitaires dans les composants `"use client"`.**

→ **Toujours utiliser des styles inline** pour tout CSS layout/critique dans les client components :

```tsx
// ❌ NE PAS FAIRE (ne compilera pas)
<div className="pt-16 max-w-7xl mx-auto grid grid-cols-2">

// ✅ FAIRE
<div style={{ paddingTop: "68px", maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.1fr" }}>
```

Les classes Tailwind fonctionnent uniquement dans les **Server Components** et dans `globals.css`.

---

## Charte graphique — Couleurs

### Variables CSS (définies dans `globals.css`)

```css
/* Brand @TOGO */
--color-brand-primary:  #1E9FE8;   /* Bleu @TOGO — CTA, accents, icônes */
--color-brand-dark:     #1A3A8F;   /* Bleu nuit — titres, navbar fond sombre */
--color-brand-hover:    #0A76C0;   /* Hover / états actifs */
--color-brand-light:    #E3F4FD;   /* Fond sections, badges */

/* DanayaCash (sous-marque) */
--color-danaya-primary: #0D7A4E;   /* Vert DanayaCash — dominant */
--color-danaya-light:   #10B981;   /* Vert clair / accents */
--color-danaya-bg:      #D1FAE5;   /* Fond vert / badges */

/* Texte */
--color-text-body:      #64748B;   /* Corps de texte */
--color-text-heading:   #1A3A8F;   /* Titres */
--color-text-muted:     #94A3B8;   /* Texte tertiaire */

/* Fonds */
--color-bg-main:        #FFFFFF;   /* Fond principal */
--color-bg-alt:         #F8FAFC;   /* Sections alternées */
--color-bg-dark:        #0A0A0A;   /* Dark mode */
```

### Palette rapide

| Couleur | Hex | Usage |
|---------|-----|-------|
| Bleu @TOGO | `#1E9FE8` | Primaire — CTA, arcs globe, highlights |
| Bleu nuit | `#1A3A8F` | Titres H1/H2, fond footer/navbar dark |
| Bleu hover | `#0A76C0` | États actifs et survol |
| Bleu clair | `#E3F4FD` | Fonds légers, badges |
| Vert DanayaCash | `#0D7A4E` | Bouton principal DanayaCash |
| Vert clair | `#10B981` | Accents, gradients DanayaCash |
| Vert fond | `#D1FAE5` | Badges DanayaCash |
| Blanc | `#FFFFFF` | Fond principal |
| Gris perle | `#F8FAFC` | Sections alternées |
| Gris texte | `#64748B` | Corps de texte |
| Gris muted | `#94A3B8` | Texte secondaire, labels |

---

## Typographie (charte officielle)

Police principale : **Inter** (Google Fonts)  
Police mono : **Geist Mono**

| Élément | Desktop | Mobile | Poids | Line-height | Couleur |
|---------|---------|--------|-------|-------------|---------|
| H1 | 56px | 36px | 600 | 1.12 | `#1A3A8F` |
| H2 | 36px | 26px | 500 | 1.25 | `#1A3A8F` |
| H3 | 22px | 18px | 500 | 1.35 | `#1A3A8F` |
| Body | 16px | 16px | 400 | 1.7 | `#64748B` |
| Small | 13px | 13px | 400 | 1.6 | `#94A3B8` |

```tsx
// H1 — utiliser clamp pour le responsive
fontSize: "clamp(2.2rem, 5vw, 3.5rem)"  // ~35px → 56px

// Sous-titre hero
fontSize: "clamp(1rem, 1.5vw, 1.2rem)"
```

---

## Layout

- **maxWidth** : `1400px` partout (navbar, hero, sections)
- **Padding horizontal** : `0 5%` (s'adapte aux écrans larges)
- **Navbar height** : `68px` (fixed, zIndex 50)
- **Hero paddingTop** : `68px` (compense la navbar fixed)
- **Gap entre sections** : `80px` desktop, `40px` mobile

---

## Composants 3D — GlobeAfrica.tsx

- Texture Terre : `https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg`  
- Bump map : `https://unpkg.com/three-globe/example/img/earth-topology.png`
- **Important** : les points pays ET les arcs doivent être dans le même `<group ref>` que la sphère pour tourner ensemble
- Rotation : `groupRef.current.rotation.y = clock.getElapsedTime() * 0.08`
- `<Canvas>` doit avoir `gl={{ alpha: true }}` et `style={{ background: "transparent" }}`

---

## Images & Logo

- Logo principal : `/public/images/logo.png` (version bleue, sur fond blanc)
- Utiliser `<Image unoptimized />` — sharp n'est pas buildé en dev
- Navbar logo : `height: "52px", width: "auto"`
- Footer logo : `filter: "brightness(0) invert(1)"` (logo blanc sur fond sombre)
- Ne jamais déformer ou recolorer le logo
- Taille minimum affichage : 32px de hauteur

---

## Structure des pages

```
src/app/
├── page.tsx              ← Homepage (sections empilées)
├── about/page.tsx
├── services/page.tsx
├── danayacash/page.tsx
└── contact/page.tsx

src/components/
├── layout/  Navbar.tsx · Footer.tsx
├── sections/ HeroSection · ServicesSection · DanayaCashSection
│            StatsSection · CyberSecSection · ContactSection
└── 3d/      GlobeAfrica.tsx · ParticlesBg.tsx
```

---

## Boutons — patterns à réutiliser

```tsx
// Primaire @TOGO
style={{
  background: "var(--color-brand-primary)",
  color: "#fff", padding: "12px 28px", borderRadius: "8px",
  fontWeight: 600, border: "none", cursor: "pointer"
}}

// DanayaCash
style={{
  background: "linear-gradient(135deg, #0D7A4E 0%, #10B981 100%)",
  color: "#fff", padding: "14px 28px", borderRadius: "10px",
  fontWeight: 600, boxShadow: "0 4px 20px rgba(13,122,78,0.3)"
}}

// Ghost / Outlined
style={{
  border: "2px solid var(--color-brand-primary)",
  color: "var(--color-brand-primary)", background: "transparent",
  padding: "12px 28px", borderRadius: "8px", fontWeight: 600
}}
```

---

## Données — `src/constants/data.ts`

- `NAV_ITEMS` : liens navbar (Accueil, Services, DanayaCash, À propos, Contact)
- `STATS` : 50 000+ clients, 2M+ transactions/mois, 8 pays, 5 ans
- `SERVICES` : Fintech, IT Solutions, Marketing Digital, Cybersécurité, Développement de contenus
- `DANAYACASH_COUNTRIES` : 8 pays avec lat/lng (Togo, Bénin, CI, Ghana, Sénégal, Burkina, Mali, Niger)
- `DANAYACASH_STEPS` : 3 étapes (Inscription, Transfert, Réception)

---

## Commandes utiles

```bash
pnpm dev          # Démarrer le serveur dev → localhost:3000
pnpm build        # Build production
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
pnpm db:init      # Jouer postgres/schema.sql sur $DATABASE_URL
pnpm admin:create # Créer / réinitialiser un compte admin
git log --oneline # Historique commits
```

### Règle base de données

Le navigateur ne parle **jamais** à PostgreSQL. Toute lecture/écriture passe par
une route `/api/*`. Les routes `/api/admin/*` doivent **toutes** commencer par :

```ts
const auth = await requireAdmin(req)
if ("response" in auth) return auth.response
```

C'est ce qui remplace les politiques RLS de Supabase — le middleware ne protège
que l'affichage des pages, pas les données.

---

## Todo / Roadmap

- [x] Navbar + Hero section
- [x] GlobeAfrica 3D avec arcs animés
- [x] StatsSection avec CountUp
- [x] ServicesSection cards
- [x] ContactSection + API route Resend
- [ ] DanayaCashSection (homepage)
- [ ] CyberSecSection (homepage)
- [ ] Page /danayacash complète
- [ ] Page /services complète
- [ ] Page /about
- [ ] Dark mode
- [ ] i18n FR/EN (next-intl)
- [ ] shadcn/ui setup
- [x] Migration Supabase → PostgreSQL
- [ ] Déploiement Docker en production

---

*@TOGO — Lomé, Togo — Brief Claude Code*

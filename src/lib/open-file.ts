/**
 * Ouvre un document privé (CV, lettre de motivation, proforma, dossier AO).
 *
 * Remplace les URLs signées Supabase : le fichier est servi par
 * `/api/admin/files/<nom>`, qui exige une session admin. Il n'y a donc plus de
 * lien temporaire à générer ni à faire expirer — le contrôle se fait à chaque
 * requête, sur le cookie de session.
 *
 * Rétro-compatible : les anciennes lignes dont la valeur est déjà une URL http
 * (données créées du temps de Supabase Storage) sont ouvertes telles quelles.
 */
export function openPrivateFile(value: string | null) {
  if (!value) return

  const href = value.startsWith("http")
    ? value
    : `/api/admin/files/${encodeURIComponent(value)}`

  window.open(href, "_blank", "noopener,noreferrer")
}

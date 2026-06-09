import { createClient } from "@/lib/supabase/client"

/**
 * Ouvre un document privé (CV, lettre, proforma) via une URL signée temporaire.
 * Rétro-compatible : si la valeur est déjà une URL http (anciennes données), on l'ouvre directement.
 */
export async function openPrivateFile(value: string | null, bucket = "cvs") {
  if (!value) return
  if (value.startsWith("http")) {
    window.open(value, "_blank", "noopener,noreferrer")
    return
  }
  const supabase = createClient()
  const { data, error } = await supabase.storage.from(bucket).createSignedUrl(value, 300) // 5 min
  if (error || !data?.signedUrl) {
    alert("Impossible d'ouvrir le document : " + (error?.message ?? "erreur inconnue"))
    return
  }
  window.open(data.signedUrl, "_blank", "noopener,noreferrer")
}

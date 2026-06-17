// Validation des fichiers uploadés (type + taille)

export const MAX_FILE_SIZE = 5 * 1024 * 1024   // 5 Mo
export const MAX_ZIP_SIZE  = 50 * 1024 * 1024  // 50 Mo pour les dossiers AO

// Types autorisés par usage
export const DOC_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]

export const ZIP_TYPES = [
  "application/zip",
  "application/x-zip-compressed",
  "application/octet-stream", // certains OS envoient ce MIME pour les .zip
]

export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]

const EXT_WHITELIST = ["pdf", "doc", "docx", "xls", "xlsx", "jpg", "jpeg", "png", "webp", "avif", "zip"]

/**
 * Vérifie un fichier. Retourne un message d'erreur (string) ou null si OK.
 */
export function validateFile(
  file: File,
  allowedTypes: string[] = DOC_TYPES,
  maxSize: number = MAX_FILE_SIZE
): string | null {
  if (file.size === 0) return "Fichier vide."
  if (file.size > maxSize) {
    return `Fichier trop volumineux (max ${Math.round(maxSize / 1024 / 1024)} Mo).`
  }
  // Vérif type MIME
  if (allowedTypes.length && file.type && !allowedTypes.includes(file.type)) {
    return "Type de fichier non autorisé."
  }
  // Vérif extension (défense supplémentaire)
  const ext = file.name.split(".").pop()?.toLowerCase()
  if (!ext || !EXT_WHITELIST.includes(ext)) {
    return "Extension de fichier non autorisée."
  }
  return null
}

// Nettoie un nom de fichier pour le stockage (évite l'injection de chemin)
export function safeFilename(name: string): string {
  return name
    .normalize("NFD").replace(/[̀-ͯ]/g, "") // retire les accents
    .replace(/[^a-zA-Z0-9.-]/g, "-")                   // caractères sûrs uniquement
    .replace(/-+/g, "-")
    .slice(0, 80)
}

import type {
  AdminStats, Application, ApplicationStatus, Domain, JobOffer, News, Tender, TenderResponse,
} from "@/types/database"

/**
 * Client HTTP des composants React — remplace le SDK Supabase côté navigateur.
 *
 * Le navigateur ne se connecte plus à la base : il appelle les routes `/api/*`,
 * qui sont les seules à parler à PostgreSQL. La session admin voyage dans un
 * cookie httpOnly envoyé automatiquement (le fetch same-origin inclut les
 * cookies par défaut), donc aucun jeton ne transite par le JavaScript client.
 */

export class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message)
    this.name = "ApiError"
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: init?.body instanceof FormData
      ? init?.headers
      : { "Content-Type": "application/json", ...init?.headers },
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new ApiError(data.error ?? `Erreur ${res.status}`, res.status)
  }
  return res.json() as Promise<T>
}

const get = <T>(path: string) => request<T>(path)
const post = <T>(path: string, body?: unknown) =>
  request<T>(path, { method: "POST", body: body instanceof FormData ? body : JSON.stringify(body ?? {}) })
const patch = <T>(path: string, body: unknown) =>
  request<T>(path, { method: "PATCH", body: JSON.stringify(body) })
const del = <T>(path: string) => request<T>(path, { method: "DELETE" })

/* ── Authentification ─────────────────────────────────────────────────── */

export const login = (email: string, password: string) =>
  post<{ success: true; email: string }>("/api/auth/login", { email, password })

export const logout = () => post<{ success: true }>("/api/auth/logout")

/** Session courante, ou null si le cookie est absent/expiré. */
export async function me(): Promise<{ id: string; email: string } | null> {
  try {
    return await get<{ id: string; email: string }>("/api/auth/me")
  } catch {
    return null
  }
}

export const updateAccountEmail = (currentPassword: string, email: string) =>
  patch<{ success: true; email: string }>("/api/auth/account", { action: "email", currentPassword, email })

export const updateAccountPassword = (currentPassword: string, newPassword: string) =>
  patch<{ success: true }>("/api/auth/account", { action: "password", currentPassword, newPassword })

/* ── Lectures publiques ───────────────────────────────────────────────── */

export const fetchPublishedNews = (limit?: number) =>
  get<News[]>(`/api/public/news${limit ? `?limit=${limit}` : ""}`)

export const fetchPublishedTenders = () => get<Tender[]>("/api/public/tenders")

export const fetchPublishedJobOffers = () => get<JobOffer[]>("/api/public/job-offers")

/* ── Administration ───────────────────────────────────────────────────── */

export const fetchStats = () => get<AdminStats>("/api/admin/stats")

export const fetchJobOffers = () => get<JobOffer[]>("/api/admin/job-offers")
export const createJobOffer = (data: Partial<JobOffer>) => post<JobOffer>("/api/admin/job-offers", data)
export const updateJobOffer = (id: string, data: Partial<JobOffer>) => patch<JobOffer>(`/api/admin/job-offers/${id}`, data)
export const deleteJobOffer = (id: string) => del<{ success: true }>(`/api/admin/job-offers/${id}`)

export const fetchNews = () => get<News[]>("/api/admin/news")
export const createNews = (data: Partial<News>) => post<News>("/api/admin/news", data)
export const updateNews = (id: string, data: Partial<News>) => patch<News>(`/api/admin/news/${id}`, data)
export const deleteNews = (id: string) => del<{ success: true }>(`/api/admin/news/${id}`)

export const fetchTenders = () => get<Tender[]>("/api/admin/tenders")
export const createTender = (data: Partial<Tender>) => post<Tender>("/api/admin/tenders", data)
export const updateTender = (id: string, data: Partial<Tender>) => patch<Tender>(`/api/admin/tenders/${id}`, data)
export const deleteTender = (id: string) => del<{ success: true }>(`/api/admin/tenders/${id}`)

export const fetchDomains = () => get<Domain[]>("/api/admin/domains")
export const createDomain = (data: Partial<Domain>) => post<Domain>("/api/admin/domains", data)
export const updateDomain = (id: string, data: Partial<Domain>) => patch<Domain>(`/api/admin/domains/${id}`, data)
export const deleteDomain = (id: string) => del<{ success: true }>(`/api/admin/domains/${id}`)

export const fetchApplications = () => get<Application[]>("/api/admin/applications")
export const updateApplicationStatus = (id: string, status: ApplicationStatus) =>
  patch<Application>(`/api/admin/applications/${id}`, { status })

export const fetchTenderResponses = () => get<TenderResponse[]>("/api/admin/tender-responses")

/** Envoie un fichier dans un bucket public et retourne son URL de lecture. */
export async function uploadFile(bucket: "news-images" | "tender-docs", file: File): Promise<string> {
  const fd = new FormData()
  fd.append("file", file)
  fd.append("bucket", bucket)
  const { url } = await post<{ url: string; name: string }>("/api/admin/upload", fd)
  return url
}

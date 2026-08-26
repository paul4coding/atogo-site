export type JobStatus = "draft" | "published"
export type ApplicationStatus = "pending" | "reviewed" | "accepted" | "rejected"
export type ApplicationType = "application" | "spontaneous"

export const JOB_STATUSES: readonly JobStatus[] = ["draft", "published"]
export const APPLICATION_STATUSES: readonly ApplicationStatus[] = ["pending", "reviewed", "accepted", "rejected"]
export const APPLICATION_TYPES: readonly ApplicationType[] = ["application", "spontaneous"]

export interface JobOffer {
  id: string
  title: string
  department: string
  contract_type: string
  location: string
  description: string
  requirements: string[]
  status: JobStatus
  created_at: string
  updated_at: string
}

export interface Application {
  id: string
  job_offer_id: string | null
  type: ApplicationType
  name: string
  email: string
  phone: string | null
  cover_letter: string
  cv_url: string | null
  motivation_url: string | null
  status: ApplicationStatus
  created_at: string
  /** Titre de l'offre visée, joint par la route API (null si spontanée). */
  job_offers?: { title: string } | null
}

export interface News {
  id: string
  title: string
  excerpt: string
  content: string
  image_url: string | null
  status: JobStatus
  published_at: string | null
  created_at: string
}

export interface Tender {
  id: string
  ref: string
  title: string
  description: string
  deadline: string
  document_url: string | null
  status: JobStatus
  created_at: string
}

export interface TenderResponse {
  id: string
  tender_id: string
  company_name: string
  contact_name: string
  email: string
  phone: string | null
  message: string | null
  document_url: string | null
  dossier_zip_url: string | null
  created_at: string
  /** Appel d'offres concerné, joint par la route API. */
  tenders?: { title: string; ref: string } | null
}

export interface Domain {
  id: string
  label: string
  color: string
  active: boolean
  sort_order: number
  created_at: string
}

/** Compteurs du tableau de bord admin. */
export interface AdminStats {
  offers: number
  applications: number
  news: number
  tenders: number
  responses: number
}

export type JobStatus = "draft" | "published"
export type ApplicationStatus = "pending" | "reviewed" | "accepted" | "rejected"
export type ApplicationType = "application" | "spontaneous"

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
  created_at: string
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

export interface Database {
  public: {
    Tables: {
      domains: { Row: Domain; Insert: Omit<Domain, "id" | "created_at">; Update: Partial<Omit<Domain, "id">>; Relationships: [] }
      job_offers: { Row: JobOffer; Insert: Omit<JobOffer, "id" | "created_at" | "updated_at">; Update: Partial<Omit<JobOffer, "id">>; Relationships: [] }
      applications: { Row: Application; Insert: Omit<Application, "id" | "created_at" | "status">; Update: Partial<Omit<Application, "id">>; Relationships: [] }
      news: { Row: News; Insert: Omit<News, "id" | "created_at">; Update: Partial<Omit<News, "id">>; Relationships: [] }
      tenders: { Row: Tender; Insert: Omit<Tender, "id" | "created_at">; Update: Partial<Omit<Tender, "id">>; Relationships: [] }
      tender_responses: { Row: TenderResponse; Insert: Omit<TenderResponse, "id" | "created_at">; Update: Partial<Omit<TenderResponse, "id">>; Relationships: [] }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

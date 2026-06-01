export interface NavItem {
  label: string
  href: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  color: "brand" | "danaya"
}

export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface Country {
  name: string
  code: string
  lat: number
  lng: number
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  service: string
  message: string
}

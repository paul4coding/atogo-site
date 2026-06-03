import type { NavItem, Service, Stat } from "@/types"

export const NAV_ITEMS: NavItem[] = [
  { label: "Accueil",    href: "/"          },
  { label: "Services",   href: "/services"  },
  { label: "Transferts", href: "/transferts" },
  { label: "À propos",   href: "/about"     },
  { label: "Contact",    href: "/contact"   },
]

export const STATS: Stat[] = [
  { value: 50000, suffix: "+",    label: "Clients actifs"       },
  { value: 6,     suffix: "+",    label: "Services disponibles" },
  { value: 3,     suffix: "",     label: "Marques de téléphones"},
  { value: 5,     suffix: " ans", label: "D'expérience"         },
]

export const SERVICES: Service[] = [
  {
    id: "transferts",
    title: "Transferts d'argent",
    description: "National (Flooz, Yas, MixBy) et international (Western Union, MoneyGram, RIA) — envoyez et recevez de l'argent en toute simplicité.",
    icon: "ArrowLeftRight",
    color: "brand",
  },
  {
    id: "it",
    title: "Solutions Informatiques",
    description: "Intégration de systèmes, infrastructure IT et développement sur mesure pour les entreprises.",
    icon: "Server",
    color: "brand",
  },
  {
    id: "phones",
    title: "Vente de Téléphones",
    description: "Revendeur agréé Blackview, Oukitel et Doogee — smartphones robustes, fiables et adaptés au marché africain.",
    icon: "Smartphone",
    color: "brand",
  },
  {
    id: "marketing",
    title: "Marketing Digital",
    description: "Stratégies digitales, gestion des réseaux sociaux et campagnes pour booster votre visibilité.",
    icon: "TrendingUp",
    color: "brand",
  },
  {
    id: "cybersec",
    title: "Cybersécurité",
    description: "Protection de vos systèmes, audit de sécurité et formation aux bonnes pratiques cyber.",
    icon: "Shield",
    color: "brand",
  },
  {
    id: "content",
    title: "Développement de Contenus",
    description: "Création et intégration de contenus digitaux pour tous vos supports de communication.",
    icon: "FileText",
    color: "brand",
  },
]

// Points pour le globe — Togo + destinations transferts internationaux
export interface GlobePoint {
  name: string
  code: string
  lat: number
  lng: number
  type: "local" | "intl"
}

export const GLOBE_POINTS: GlobePoint[] = [
  // Afrique de l'Ouest (transferts nationaux)
  { name: "Togo",          code: "TG", lat:  8.6195,  lng:  0.8248,  type: "local" },
  { name: "Bénin",         code: "BJ", lat:  9.3077,  lng:  2.3158,  type: "local" },
  { name: "Ghana",         code: "GH", lat:  7.9465,  lng: -1.0232,  type: "local" },
  { name: "Côte d'Ivoire", code: "CI", lat:  7.5399,  lng: -5.5471,  type: "local" },
  { name: "Sénégal",       code: "SN", lat: 14.4974,  lng:-14.4524,  type: "local" },
  { name: "Nigeria",       code: "NG", lat:  9.0820,  lng:  8.6753,  type: "local" },
  // Destinations internationales
  { name: "France",        code: "FR", lat: 46.2276,  lng:  2.2137,  type: "intl"  },
  { name: "États-Unis",    code: "US", lat: 37.0902,  lng:-95.7129,  type: "intl"  },
  { name: "Royaume-Uni",   code: "UK", lat: 55.3781,  lng: -3.4360,  type: "intl"  },
  { name: "Italie",        code: "IT", lat: 41.8719,  lng: 12.5674,  type: "intl"  },
  { name: "Allemagne",     code: "DE", lat: 51.1657,  lng: 10.4515,  type: "intl"  },
]

// Services nationaux de transfert
export const TRANSFER_NATIONAL = [
  { name: "Flooz",       logo: "/images/flooz.png",     desc: "MOOV Money"  },
  { name: "MixBy Yas",   logo: "/images/yas-agent.png", desc: "Yas Agent"   },
]

// Services internationaux de transfert
export const TRANSFER_INTERNATIONAL = [
  { name: "Western Union", logo: "/images/western-union.webp",  desc: "Worldwide" },
  { name: "MoneyGram",     logo: "/images/moneygram.webp",      desc: "Global"    },
  { name: "RIA",           logo: "/images/ria.png",             desc: "Money Transfer" },
]

// Marques téléphones
export const PHONE_BRANDS = [
  { name: "Blackview", logo: "/images/blackview.png",  desc: "Smartphones robustes" },
  { name: "Oukitel",   logo: "/images/oukitel2.jpg",   desc: "Grande batterie"      },
  { name: "Doogee",    logo: "/images/doogee2.png",    desc: "Résistants & abordables" },
]

export const TRANSFER_STEPS = [
  { step: 1, title: "Venez en agence", description: "Rendez-vous dans notre agence à Lomé avec votre pièce d'identité et le montant à envoyer." },
  { step: 2, title: "Choisissez le service", description: "Sélectionnez le service adapté : Flooz, Yas ou MixBy pour le national, Western Union, MoneyGram ou RIA pour l'international." },
  { step: 3, title: "L'argent est envoyé", description: "La transaction est traitée immédiatement. Le destinataire reçoit l'argent en quelques minutes." },
]

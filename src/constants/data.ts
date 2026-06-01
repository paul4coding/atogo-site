import type { NavItem, Service, Stat, Country } from "@/types"

export const NAV_ITEMS: NavItem[] = [
  { label: "Accueil",    href: "/" },
  { label: "Services",   href: "/services" },
  { label: "DanayaCash", href: "/danayacash" },
  { label: "À propos",   href: "/about" },
  { label: "Contact",    href: "/contact" },
]

export const STATS: Stat[] = [
  { value: 50000, suffix: "+",    label: "Clients actifs" },
  { value: 2,     suffix: "M+",   label: "Transactions / mois" },
  { value: 8,     suffix: "",     label: "Pays couverts" },
  { value: 5,     suffix: " ans", label: "D'expérience" },
]

export const SERVICES: Service[] = [
  {
    id: "fintech",
    title: "Fintech & DanayaCash",
    description: "Transfert d'argent mobile rapide, sécurisé et accessible partout en Afrique de l'Ouest.",
    icon: "Wallet",
    color: "danaya",
  },
  {
    id: "it",
    title: "Solutions Informatiques",
    description: "Intégration de systèmes, infrastructure IT et développement sur mesure pour les entreprises.",
    icon: "Server",
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

export const DANAYACASH_COUNTRIES: Country[] = [
  { name: "Togo",           code: "TG", lat:  8.6195,  lng:  0.8248 },
  { name: "Bénin",          code: "BJ", lat:  9.3077,  lng:  2.3158 },
  { name: "Côte d'Ivoire",  code: "CI", lat:  7.5399, lng: -5.5471 },
  { name: "Ghana",          code: "GH", lat:  7.9465, lng: -1.0232 },
  { name: "Sénégal",        code: "SN", lat: 14.4974, lng: -14.4524 },
  { name: "Burkina Faso",   code: "BF", lat: 12.3640, lng: -1.5330 },
  { name: "Mali",           code: "ML", lat: 17.5707, lng: -3.9962 },
  { name: "Niger",          code: "NE", lat: 17.6078, lng:  8.0817 },
]

export const DANAYACASH_STEPS = [
  {
    step: 1,
    title: "Créez votre compte",
    description: "Téléchargez l'app DanayaCash et inscrivez-vous en quelques minutes avec votre numéro de téléphone.",
  },
  {
    step: 2,
    title: "Rechargez votre portefeuille",
    description: "Alimentez votre compte via Mobile Money, carte bancaire ou en agence partenaire.",
  },
  {
    step: 3,
    title: "Envoyez de l'argent",
    description: "Saisissez le numéro du destinataire, le montant et validez. L'argent arrive en secondes.",
  },
]

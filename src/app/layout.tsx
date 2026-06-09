import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google"
import "./globals.css"
import CookieConsent from "@/components/layout/CookieConsent"
import GoogleTranslate from "@/components/layout/GoogleTranslate"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "@TOGO — Fintech & Solutions Digitales au Togo",
    template: "%s | @TOGO",
  },
  description:
    "@TOGO est la référence Fintech et solutions informatiques au Togo. Transfert d'argent avec DanayaCash, cybersécurité, marketing digital et développement de contenus.",
  keywords: [
    "Fintech Togo",
    "DanayaCash",
    "transfert argent Togo",
    "solutions informatiques Lomé",
    "cybersécurité Afrique",
  ],
  openGraph: {
    type: "website",
    locale: "fr_TG",
    url: "https://atogo.tg",
    siteName: "@TOGO",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Applique le thème avant le rendu pour éviter le flash blanc */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('atogo-theme')||'light';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col text-[var(--color-text-body)]">
        {children}
        <CookieConsent />
        <GoogleTranslate />
      </body>
    </html>
  )
}

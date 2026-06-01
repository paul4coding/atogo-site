import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google"
import "./globals.css"

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
      className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[var(--color-text-body)]">
        {children}
      </body>
    </html>
  )
}

import Link from "next/link"
import { NAV_ITEMS } from "@/constants/data"

export default function Footer() {
  return (
    <footer className="bg-[var(--color-brand-dark)] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="font-bold text-xl mb-2">@TOGO</p>
          <p className="text-sm text-white/70">
            Fintech & Solutions Digitales<br />Lomé, Togo
          </p>
        </div>

        <div>
          <p className="font-semibold mb-3 text-sm uppercase tracking-wider text-white/50">Navigation</p>
          <ul className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/70 hover:text-white transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-3 text-sm uppercase tracking-wider text-white/50">DanayaCash</p>
          <p className="text-sm text-white/70">
            Transfert d&apos;argent mobile rapide et sécurisé en Afrique de l&apos;Ouest.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center">
        <p className="text-xs text-white/40">© {new Date().getFullYear()} @TOGO. Tous droits réservés.</p>
      </div>
    </footer>
  )
}

"use client"

import { useEffect } from "react"

// Déclare la fonction globale attendue par le script Google
declare global {
  interface Window {
    googleTranslateElementInit?: () => void
    google?: { translate: { TranslateElement: new (opts: object, el: string) => void } }
  }
}

/**
 * Injecte le widget Google Translate (caché) sur toutes les pages.
 * La bascule de langue se fait via le cookie `googtrans` (voir LanguageToggle).
 */
export default function GoogleTranslate() {
  useEffect(() => {
    // Évite la double injection
    if (document.getElementById("google-translate-script")) return

    window.googleTranslateElementInit = () => {
      if (!window.google) return
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "fr",
          includedLanguages: "fr,en",
          autoDisplay: false,
        },
        "google_translate_element"
      )
    }

    const s = document.createElement("script")
    s.id = "google-translate-script"
    s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    s.async = true
    document.body.appendChild(s)
  }, [])

  // Élément requis par Google (déplacé hors écran) + CSS pour neutraliser la mise en page Google
  return (
    <>
      <div id="google_translate_element" aria-hidden="true" />
      <style>{`
        /* Élément Google déplacé hors écran (sans display:none qui empêche l'init) */
        #google_translate_element {
          position: absolute !important;
          left: -9999px !important; top: -9999px !important;
          width: 1px !important; height: 1px !important;
          overflow: hidden !important;
        }
        /* Masque la barre supérieure et le cadre Google qui décalent la page */
        .goog-te-banner-frame, .goog-te-banner-frame.skiptranslate { display: none !important; }
        iframe.skiptranslate { display: none !important; }
        /* Empêche tout décalage vertical/horizontal du body imposé par Google */
        body { top: 0 !important; position: static !important; }
        html { margin-top: 0 !important; }
        /* Neutralise le surlignage et le tooltip Google */
        .goog-tooltip, .goog-tooltip:hover { display: none !important; }
        .goog-text-highlight { background: none !important; box-shadow: none !important; }
        font[style] { background: transparent !important; box-shadow: none !important; }
      `}</style>
    </>
  )
}

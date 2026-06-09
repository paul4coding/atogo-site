"use client"

import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"

type Theme = "light" | "dark"

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme)
  localStorage.setItem("atogo-theme", theme)
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    const saved = (localStorage.getItem("atogo-theme") as Theme) || "light"
    setTheme(saved)
    document.documentElement.setAttribute("data-theme", saved)
  }, [])

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light"
    setTheme(next)
    applyTheme(next)
  }

  const isDark = theme === "dark"

  return (
    <button onClick={toggle} aria-label={isDark ? "Mode clair" : "Mode sombre"}
      title={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: "36px", height: "36px", borderRadius: "8px", cursor: "pointer",
        border: "1.5px solid var(--nav-border, #E2E8F0)",
        background: "transparent", color: "var(--nav-text, #475569)",
        transition: "all 0.2s", flexShrink: 0,
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "#1E9FE8"; e.currentTarget.style.color = "#1E9FE8" }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--nav-border, #E2E8F0)"; e.currentTarget.style.color = "var(--nav-text, #475569)" }}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}

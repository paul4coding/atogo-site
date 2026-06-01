"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import type { ContactFormData } from "@/types"

const schema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  service: z.string().min(1, "Sélectionnez un service"),
  message: z.string().min(10, "Message trop court"),
})

export default function ContactSection() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: ContactFormData) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (res.ok) alert("Message envoyé !")
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold" style={{ color: "var(--color-text-heading)" }}>
            Contactez-nous
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--color-text-body)" }}>
            Lomé, Togo — réponse sous 24h
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input
                {...register("name")}
                placeholder="Nom complet"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[var(--color-brand-primary)]"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <input
                {...register("email")}
                placeholder="Email"
                type="email"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[var(--color-brand-primary)]"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <input
            {...register("phone")}
            placeholder="Téléphone (optionnel)"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[var(--color-brand-primary)]"
          />

          <select
            {...register("service")}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[var(--color-brand-primary)] text-slate-500"
          >
            <option value="">Service concerné</option>
            <option value="fintech">Fintech / DanayaCash</option>
            <option value="it">Solutions Informatiques</option>
            <option value="marketing">Marketing Digital</option>
            <option value="cybersec">Cybersécurité</option>
            <option value="content">Développement de Contenus</option>
          </select>
          {errors.service && <p className="text-xs text-red-500 mt-1">{errors.service.message}</p>}

          <textarea
            {...register("message")}
            placeholder="Votre message"
            rows={5}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[var(--color-brand-primary)] resize-none"
          />
          {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg text-white font-medium transition-opacity disabled:opacity-60"
            style={{ backgroundColor: "var(--color-brand-primary)" }}
          >
            {isSubmitting ? "Envoi..." : "Envoyer le message"}
          </button>
        </form>
      </div>
    </section>
  )
}

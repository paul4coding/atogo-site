import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Génère une build autonome minimale pour Docker (n'embarque que le nécessaire)
  output: "standalone",

  // `pg` charge ses dépendances dynamiquement : on le laisse hors du bundle
  // pour qu'il soit résolu normalement par Node au runtime.
  serverExternalPackages: ["pg"],

  // NB : `typescript.ignoreBuildErrors` a été retiré avec Supabase. Il ne
  // servait qu'à contourner les types `never` produits par l'inférence du
  // client @supabase/supabase-js sur les mutations. Le type-check complet
  // tourne donc à nouveau au build.
};

export default nextConfig;

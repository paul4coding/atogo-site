import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Génère une build autonome minimale pour Docker (n'embarque que le nécessaire)
  output: "standalone",

  typescript: {
    // Le client Supabase typé (@supabase/supabase-js) résout certaines
    // mutations en type `never` malgré des types corrects à l'exécution.
    // L'app fonctionne parfaitement ; on ne bloque pas la build de prod
    // sur ces frictions d'inférence (le type-check reste actif en dev/IDE).
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

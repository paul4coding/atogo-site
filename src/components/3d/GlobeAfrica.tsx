"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import * as THREE from "three"
import { DANAYACASH_COUNTRIES } from "@/constants/data"

function EarthGlobe() {
  const meshRef = useRef<THREE.Mesh>(null)

  // Textures NASA via CDN JPEG uniquement
  const [colorMap, bumpMap] = useLoader(THREE.TextureLoader, [
    "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
    "https://unpkg.com/three-globe/example/img/earth-topology.png",
  ])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (meshRef.current) meshRef.current.rotation.y = t * 0.08
  })

  return (
    <group>
      {/* Terre */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={colorMap}
          bumpMap={bumpMap}
          bumpScale={0.05}
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* Points pays DanayaCash */}
      {DANAYACASH_COUNTRIES.map((country) => {
        const phi   = (90 - country.lat) * (Math.PI / 180)
        const theta = (country.lng + 180) * (Math.PI / 180)
        const r = 2.06
        const x = -(r * Math.sin(phi) * Math.cos(theta))
        const z =   r * Math.sin(phi) * Math.sin(theta)
        const y =   r * Math.cos(phi)

        return (
          <mesh key={country.code} position={[x, y, z]}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial
              color="#1E9FE8"
              emissive="#1E9FE8"
              emissiveIntensity={1.2}
              roughness={0}
              metalness={0.3}
            />
          </mesh>
        )
      })}

      {/* Halo atmosphérique */}
      <mesh>
        <sphereGeometry args={[2.15, 64, 64]} />
        <meshPhongMaterial
          color="#1E9FE8"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

export default function GlobeAfrica() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      {/* Étoiles en fond */}
      <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade />

      {/* Lumières — éclairage uniforme pour voir toute la Terre */}
      <ambientLight intensity={2.5} />
      <directionalLight position={[5, 3, 5]}   intensity={1.5} color="#ffffff" />
      <directionalLight position={[-5, -3, -5]} intensity={1.0} color="#c8e0ff" />
      <directionalLight position={[0, 5, 0]}   intensity={0.8} color="#ffffff" />

      <Suspense fallback={null}>
        <EarthGlobe />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        rotateSpeed={0.4}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI * 2 / 3}
      />
    </Canvas>
  )
}

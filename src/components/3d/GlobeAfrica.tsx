"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import * as THREE from "three"
import { DANAYACASH_COUNTRIES } from "@/constants/data"

// Convertit lat/lng en coordonnées 3D sur la sphère
function latLngToVec3(lat: number, lng: number, r: number): [number, number, number] {
  const phi   = (90 - lat)  * (Math.PI / 180)  // colatitude (nord=0)
  const theta = (lng + 180) * (Math.PI / 180)  // longitude (dateline=0)
  const x =  -r * Math.sin(phi) * Math.cos(theta)
  const y =   r * Math.cos(phi)
  const z =   r * Math.sin(phi) * Math.sin(theta)
  return [x, y, z]
}

function EarthGlobe() {
  const groupRef = useRef<THREE.Group>(null)

  const [colorMap, bumpMap] = useLoader(THREE.TextureLoader, [
    "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
    "https://unpkg.com/three-globe/example/img/earth-topology.png",
  ])

  // Toute la Terre + les points tournent ensemble
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.08
    }
  })

  return (
    <group ref={groupRef}>
      {/* Sphère terrestre */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={colorMap}
          bumpMap={bumpMap}
          bumpScale={0.05}
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* Points pays DanayaCash — ancrés sur la surface */}
      {DANAYACASH_COUNTRIES.map((country) => {
        const pos = latLngToVec3(country.lat, country.lng, 2.07)
        return (
          <group key={country.code} position={pos}>
            {/* Point central */}
            <mesh>
              <sphereGeometry args={[0.045, 12, 12]} />
              <meshStandardMaterial
                color="#1E9FE8"
                emissive="#1E9FE8"
                emissiveIntensity={2}
                roughness={0}
                metalness={0.3}
              />
            </mesh>
            {/* Halo extérieur */}
            <mesh>
              <sphereGeometry args={[0.085, 12, 12]} />
              <meshStandardMaterial
                color="#1E9FE8"
                emissive="#1E9FE8"
                emissiveIntensity={0.6}
                transparent
                opacity={0.35}
                roughness={1}
              />
            </mesh>
          </group>
        )
      })}

      {/* Halo atmosphérique */}
      <mesh>
        <sphereGeometry args={[2.18, 64, 64]} />
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
      <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade />

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
        rotateSpeed={0.4}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI * 2 / 3}
      />
    </Canvas>
  )
}

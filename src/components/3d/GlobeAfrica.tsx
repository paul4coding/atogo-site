"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere } from "@react-three/drei"
import * as THREE from "three"
import { DANAYACASH_COUNTRIES } from "@/constants/data"

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
    }
  })

  return (
    <group>
      {/* Earth sphere */}
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#0D7A4E"
          wireframe={false}
          roughness={0.8}
          metalness={0.1}
        />
      </Sphere>

      {/* Country dots */}
      {DANAYACASH_COUNTRIES.map((country) => {
        const phi = (90 - country.lat) * (Math.PI / 180)
        const theta = (country.lng + 180) * (Math.PI / 180)
        const x = -(2.05 * Math.sin(phi) * Math.cos(theta))
        const z = 2.05 * Math.sin(phi) * Math.sin(theta)
        const y = 2.05 * Math.cos(phi)

        return (
          <mesh key={country.code} position={[x, y, z]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#1E9FE8" emissive="#1E9FE8" emissiveIntensity={0.5} />
          </mesh>
        )
      })}
    </group>
  )
}

export default function GlobeAfrica() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Globe />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
    </Canvas>
  )
}

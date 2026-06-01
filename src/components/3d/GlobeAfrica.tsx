"use client"

import { useRef, Suspense, useMemo } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import * as THREE from "three"
import { DANAYACASH_COUNTRIES } from "@/constants/data"

// ── Coordonnées sphériques ──────────────────────────────────────────────────
function latLngToVec3(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi   = (90 - lat)  * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta)
  )
}

// Offset initial pour centrer sur l'Afrique de l'Ouest (lng ≈ -2°)
// À rotation.y=0 → lng=-90 face caméra. On compense : -((-2)-(-90))×π/180
const AFRICA_OFFSET = -(88 * Math.PI / 180)  // ≈ -1.536 rad

// ── Arc animé avec tête lumineuse ──────────────────────────────────────────
function TransferArc({
  from, to,
  arcColor = "#1E9FE8",
  headColor = "#ffffff",
  speed = 1,
  delay = 0,
}: {
  from: THREE.Vector3
  to: THREE.Vector3
  arcColor?: string
  headColor?: string
  speed?: number
  delay?: number
}) {
  const headRef  = useRef<THREE.Mesh>(null)
  const haloRef  = useRef<THREE.Mesh>(null)
  const tRef     = useRef(delay % 1)

  // Courbe de Bézier quadratique — arc levé au-dessus du globe
  const curve = useMemo(() => {
    const mid = from.clone().add(to).multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(2.55)
    return new THREE.QuadraticBezierCurve3(from, mid, to)
  }, [from, to])

  // Géométrie ligne complète — trajet discret
  const trailGeo = useMemo(() => {
    const pts = curve.getPoints(80)
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [curve])

  // Géométrie partielle animée
  const arcGeo = useMemo(() => {
    const pts = curve.getPoints(80)
    const geo = new THREE.BufferGeometry().setFromPoints(pts)
    geo.setDrawRange(0, 0)
    return geo
  }, [curve])

  useFrame((_, delta) => {
    tRef.current = (tRef.current + delta * speed * 0.35) % 1
    arcGeo.setDrawRange(0, Math.floor(tRef.current * 80) + 1)
    arcGeo.attributes.position.needsUpdate = true

    if (headRef.current && haloRef.current) {
      const pt = curve.getPoint(tRef.current)
      headRef.current.position.set(pt.x, pt.y, pt.z)
      haloRef.current.position.set(pt.x, pt.y, pt.z)
      const fade = Math.sin(tRef.current * Math.PI)
      ;(headRef.current.material as THREE.MeshBasicMaterial).opacity = fade * 0.95
      ;(haloRef.current.material as THREE.MeshBasicMaterial).opacity = fade * 0.28
    }
  })

  return (
    <group>
      {/* Trajet complet très discret */}
      <line geometry={trailGeo}>
        <lineBasicMaterial color={arcColor} transparent opacity={0.12} />
      </line>
      {/* Arc animé lumineux */}
      <line geometry={arcGeo}>
        <lineBasicMaterial color={arcColor} transparent opacity={0.9} />
      </line>
      {/* Tête de transfert */}
      <mesh ref={headRef}>
        <sphereGeometry args={[0.036, 8, 8]} />
        <meshBasicMaterial color={headColor} transparent opacity={1} />
      </mesh>
      {/* Halo de la tête */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.075, 8, 8]} />
        <meshBasicMaterial color={headColor} transparent opacity={0.25} />
      </mesh>
    </group>
  )
}

// ── Point pays avec pulse ──────────────────────────────────────────────────
function CountryDot({ position, color, isHub = false }: {
  position: THREE.Vector3
  color: string
  isHub?: boolean
}) {
  const pulseRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (pulseRef.current) {
      const s = 1 + Math.sin(clock.getElapsedTime() * (isHub ? 1.8 : 2.2)) * 0.4
      pulseRef.current.scale.setScalar(s)
      ;(pulseRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.15 + Math.sin(clock.getElapsedTime() * 2.2) * 0.08
    }
  })

  return (
    <group position={[position.x, position.y, position.z]}>
      {/* Cœur */}
      <mesh>
        <sphereGeometry args={[isHub ? 0.058 : 0.042, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Halo fixe */}
      <mesh>
        <sphereGeometry args={[isHub ? 0.13 : 0.1, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.22} />
      </mesh>
      {/* Halo pulsé */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[isHub ? 0.2 : 0.15, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>
    </group>
  )
}

// ── Globe principal ────────────────────────────────────────────────────────
function EarthGlobe() {
  const groupRef = useRef<THREE.Group>(null)

  const [colorMap, bumpMap] = useLoader(THREE.TextureLoader, [
    "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
    "https://unpkg.com/three-globe/example/img/earth-topology.png",
  ])

  const positions = useMemo(
    () => DANAYACASH_COUNTRIES.map(c => latLngToVec3(c.lat, c.lng, 2.05)),
    []
  )

  // Tous les arcs rayonnent depuis Togo (index 0)
  const arcs = useMemo(() => [
    { from: 0, to: 1, color: "#1E9FE8", head: "#7DD3FC", speed: 0.90, delay: 0.0  },
    { from: 0, to: 2, color: "#10B981", head: "#6EE7B7", speed: 0.75, delay: 0.15 },
    { from: 0, to: 3, color: "#1E9FE8", head: "#7DD3FC", speed: 1.05, delay: 0.3  },
    { from: 0, to: 4, color: "#10B981", head: "#6EE7B7", speed: 0.65, delay: 0.45 },
    { from: 0, to: 5, color: "#1E9FE8", head: "#7DD3FC", speed: 0.85, delay: 0.6  },
    { from: 0, to: 6, color: "#10B981", head: "#6EE7B7", speed: 0.70, delay: 0.75 },
    { from: 0, to: 7, color: "#1E9FE8", head: "#7DD3FC", speed: 0.95, delay: 0.9  },
    // Liaisons régionales secondaires
    { from: 3, to: 2, color: "#818CF8", head: "#C4B5FD", speed: 0.55, delay: 0.2  },
    { from: 5, to: 6, color: "#818CF8", head: "#C4B5FD", speed: 0.50, delay: 0.5  },
    { from: 1, to: 7, color: "#818CF8", head: "#C4B5FD", speed: 0.48, delay: 0.8  },
  ], [])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = AFRICA_OFFSET
    }
  })

  return (
    <group ref={groupRef}>
      {/* Sphère terrestre */}
      <mesh>
        <sphereGeometry args={[2, 72, 72]} />
        <meshStandardMaterial
          map={colorMap}
          bumpMap={bumpMap}
          bumpScale={0.06}
          roughness={0.78}
          metalness={0.05}
        />
      </mesh>

      {/* Halo atmosphérique */}
      <mesh>
        <sphereGeometry args={[2.22, 64, 64]} />
        <meshPhongMaterial color="#1E9FE8" transparent opacity={0.045} side={THREE.BackSide} />
      </mesh>

      {/* Points pays — Togo en or (hub), autres en bleu */}
      {positions.map((pos, i) => (
        <CountryDot
          key={DANAYACASH_COUNTRIES[i].code}
          position={pos}
          color={i === 0 ? "#FBBF24" : "#1E9FE8"}
          isHub={i === 0}
        />
      ))}

      {/* Arcs de transfert */}
      {arcs.map((arc, i) => (
        <TransferArc
          key={i}
          from={positions[arc.from]}
          to={positions[arc.to]}
          arcColor={arc.color}
          headColor={arc.head}
          speed={arc.speed}
          delay={arc.delay}
        />
      ))}
    </group>
  )
}

// ── Export ─────────────────────────────────────────────────────────────────
export default function GlobeAfrica() {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 5.2], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Stars radius={120} depth={60} count={3500} factor={3.5} saturation={0} fade />

      <ambientLight intensity={2.2} />
      <directionalLight position={[5, 3, 5]}    intensity={1.8} color="#ffffff" />
      <directionalLight position={[-4, -2, -4]} intensity={0.8} color="#c8e0ff" />
      <directionalLight position={[0, 6, 2]}    intensity={0.6} color="#ffffff" />

      <Suspense fallback={null}>
        <EarthGlobe />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </Canvas>
  )
}

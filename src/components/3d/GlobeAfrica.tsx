"use client"

import { useRef, Suspense, useMemo } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import * as THREE from "three"
import { DANAYACASH_COUNTRIES } from "@/constants/data"

function latLngToVec3(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi   = (90 - lat)  * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta)
  )
}

// Arc animé entre deux points
function Arc({ from, to, color = "#1E9FE8", speed = 1 }: {
  from: THREE.Vector3; to: THREE.Vector3; color?: string; speed?: number
}) {
  const ref = useRef<THREE.Line>(null)
  const progressRef = useRef(0)

  const points = useMemo(() => {
    const mid = from.clone().add(to).multiplyScalar(0.5).normalize().multiplyScalar(2.6)
    const curve = new THREE.QuadraticBezierCurve3(from, mid, to)
    return curve.getPoints(60)
  }, [from, to])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(points.length * 3)
    points.forEach((p, i) => { positions[i*3]=p.x; positions[i*3+1]=p.y; positions[i*3+2]=p.z })
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geo.setDrawRange(0, 0)
    return geo
  }, [points])

  useFrame((_, delta) => {
    progressRef.current = (progressRef.current + delta * speed * 0.4) % 1
    const visible = Math.floor(progressRef.current * points.length)
    geometry.setDrawRange(0, visible)
    geometry.attributes.position.needsUpdate = true
  })

  return (
    <line ref={ref} geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.7} linewidth={1} />
    </line>
  )
}

function EarthGlobe() {
  const groupRef = useRef<THREE.Group>(null)

  const [colorMap, bumpMap] = useLoader(THREE.TextureLoader, [
    "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
    "https://unpkg.com/three-globe/example/img/earth-topology.png",
  ])

  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = clock.getElapsedTime() * 0.08
  })

  // Paires de pays connectés par des arcs
  const arcs = useMemo(() => [
    [0, 1], [0, 2], [0, 3], [1, 3], [2, 3],  // Togo → voisins
    [4, 0], [5, 0], [6, 0], [7, 0],            // Sénégal/Burkina/Mali/Niger → Togo
    [4, 2], [5, 6], [3, 7],                     // autres connexions
  ], [])

  const positions = useMemo(
    () => DANAYACASH_COUNTRIES.map(c => latLngToVec3(c.lat, c.lng, 2.07)),
    []
  )

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

      {/* Points pays */}
      {positions.map((pos, i) => (
        <group key={DANAYACASH_COUNTRIES[i].code} position={[pos.x, pos.y, pos.z]}>
          <mesh>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial color="#1E9FE8" emissive="#1E9FE8" emissiveIntensity={2} roughness={0} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.085, 12, 12]} />
            <meshStandardMaterial color="#1E9FE8" emissive="#1E9FE8" emissiveIntensity={0.6} transparent opacity={0.3} />
          </mesh>
        </group>
      ))}

      {/* Arcs de transfert animés */}
      {arcs.map(([a, b], i) => (
        <Arc
          key={i}
          from={positions[a]}
          to={positions[b]}
          color={i % 3 === 0 ? "#1E9FE8" : i % 3 === 1 ? "#10B981" : "#60C8FF"}
          speed={0.6 + (i % 4) * 0.2}
        />
      ))}

      {/* Halo atmosphérique */}
      <mesh>
        <sphereGeometry args={[2.18, 64, 64]} />
        <meshPhongMaterial color="#1E9FE8" transparent opacity={0.055} side={THREE.BackSide} />
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

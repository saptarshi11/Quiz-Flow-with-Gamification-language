"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import * as THREE from "three"

const Background3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    const bubbles: THREE.Mesh[] = []
    const bubbleCount = 50

    for (let i = 0; i < bubbleCount; i++) {
      const geometry = new THREE.SphereGeometry(Math.random() * 0.5 + 0.1, 32, 32)
      const material = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.7,
        shininess: 100,
      })
      const bubble = new THREE.Mesh(geometry, material)

      bubble.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5)

      bubbles.push(bubble)
      scene.add(bubble)
    }

    const light = new THREE.PointLight(0xffffff, 1, 100)
    light.position.set(0, 0, 10)
    scene.add(light)

    camera.position.z = 5

    const animate = () => {
      requestAnimationFrame(animate)

      bubbles.forEach((bubble) => {
        bubble.position.y += 0.01
        if (bubble.position.y > 5) {
          bubble.position.y = -5
        }
        bubble.rotation.x += 0.01
        bubble.rotation.y += 0.01
      })

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}

export default Background3D


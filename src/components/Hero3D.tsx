'use client';

import React, { useRef, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Text } from '@react-three/drei';

// Component to load and display the GLB model
function CampaignLogoModel() {
  const { scene } = useGLTF('/campaign-logo.glb'); // Load the model
  const modelRef = useRef<THREE.Group>(null!);

  // Basic rotation animation
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y -= delta * 0.2; // Reversed rotation
    }
  });

  // useGLTF returns the scene; we might need to adjust scale/position
  // Clone the scene to avoid modifying the original cache
  return (
    <primitive
      ref={modelRef}
      object={scene.clone()} // Use primitive to render the loaded scene object
      scale={2.0} // Keep scale for now, might need adjustment with smaller canvas
      position={[0, 0.2, 0]} // Lowered model slightly (Y from 1.0 to 0.2)
    />
  );
}

// Fallback component while the model loads
function ModelFallback() {
  return (
    <Text color="white" anchorX="center" anchorY="middle">
      Loading Logo...
    </Text>
  );
}

// Hero 3D Scene Component
export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null!); // Ref for the container div

  // Note: Scroll-out animation will be controlled from the main page (page.tsx) using GSAP

  return (
    // Set height to ~40% of viewport height
    <div ref={containerRef} className="h-[40vh] w-full relative">
      <Canvas camera={{ position: [0, 0.5, 4.5], fov: 50 }}> {/* Adjusted camera slightly */}
        {/* Simplified & Maximized Lighting */}
        {/* High intensity ambient light */}
        <ambientLight intensity={3.0} />
        {/* One strong directional light from the front */}
        <directionalLight position={[0, 1, 5]} intensity={2.0} />
        {/* Removed previous point, hemisphere lights */}

        {/* Use Suspense to handle model loading state */}
        <Suspense fallback={<ModelFallback />}>
          <CampaignLogoModel />
        </Suspense>

        {/* Disable zoom and pan to allow page scrolling */}
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
} 
'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface IssueCardProps {
  id: number;
  title: string;
  description: string;
  icon: string; // Emoji icon for now
}

// Simple rotating icon component
function RotatingIcon({ icon, isHovered }: { icon: string; isHovered: boolean }) {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotate faster when hovered
      meshRef.current.rotation.y += delta * (isHovered ? 2 : 0.5);
    }
  });

  return (
    <group ref={meshRef}>
      <Text
        fontSize={1.5} // Adjust size as needed
        color="#3B82F6" // Change color to primary brand blue
        anchorX="center"
        anchorY="middle"
      >
        {icon}
      </Text>
    </group>
  );
}

export default function IssueCard({ id, title, description, icon }: IssueCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      key={id}
      className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-50 dark:bg-gray-800 flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* R3F Canvas for the icon */}
      <div className="w-24 h-24 mb-4">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[5, 5, 5]} intensity={1} />
          <RotatingIcon icon={icon} isHovered={isHovered} />
        </Canvas>
      </div>

      <h3 className="text-xl font-semibold mb-2 text-center text-red-600 dark:text-red-400">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-200 text-center">
        {description}
      </p>
    </div>
  );
} 
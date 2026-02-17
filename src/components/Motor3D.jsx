import React, { useRef } from 'react';
import { Html } from '@react-three/drei';

/**
 * Motor3D Component
 * Renders a 3D representation of an FPV motor with accurate proportional dimensions
 * 
 * @param {Object} spec - Motor specifications (from motorData.js)
 */
export default function Motor3D({ spec }) {
  const groupRef = useRef();

  // Calculate dimensions
  const statorRadius = spec.statorWidth / 2;
  const baseRadius = statorRadius * 1.3; // Base is slightly larger
  const shaftRadius = spec.shaftDiameter / 2;
  const shaftHeight = spec.totalHeight - spec.baseHeight - spec.statorHeight;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Base plate */}
      <mesh position={[0, spec.baseHeight / 2, 0]} castShadow>
        <cylinderGeometry args={[baseRadius, baseRadius, spec.baseHeight, 32]} />
        <meshStandardMaterial 
          color={spec.color} 
          metalness={0.7}
          roughness={0.3}
          transparent={true}
          opacity={0.7}
        />
      </mesh>

      {/* Stator (main motor body) */}
      <mesh position={[0, spec.baseHeight + spec.statorHeight / 2, 0]} castShadow>
        <cylinderGeometry args={[statorRadius, statorRadius, spec.statorHeight, 32]} />
        <meshStandardMaterial 
          color={spec.color}
          metalness={0.6}
          roughness={0.4}
          transparent={true}
          opacity={0.7}
        />
      </mesh>

      {/* Shaft */}
      <mesh position={[0, spec.baseHeight + spec.statorHeight + shaftHeight / 2, 0]} castShadow>
        <cylinderGeometry args={[shaftRadius, shaftRadius, shaftHeight, 16]} />
        <meshStandardMaterial 
          color="#333333"
          metalness={0.9}
          roughness={0.2}
          transparent={true}
          opacity={0.8}
        />
      </mesh>

      {/* Motor label - HTML overlay */}
      <Html position={[0, spec.totalHeight + 3, 0]} center>
        <div style={{
          color: spec.color,
          fontSize: '14px',
          fontWeight: 'bold',
          padding: '4px 8px',
          background: 'rgba(0,0,0,0.7)',
          borderRadius: '4px',
          whiteSpace: 'nowrap',
          border: `2px solid ${spec.color}`
        }}>
          {spec.name}
        </div>
      </Html>

      {/* Mounting holes (visual indicators) */}
      {[
        [-baseRadius * 0.6, spec.baseHeight, -baseRadius * 0.6],
        [baseRadius * 0.6, spec.baseHeight, -baseRadius * 0.6],
        [-baseRadius * 0.6, spec.baseHeight, baseRadius * 0.6],
        [baseRadius * 0.6, spec.baseHeight, baseRadius * 0.6],
      ].map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.3, 0.3, 0.5, 8]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
      ))}
    </group>
  );
}

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import Motor3D from './Motor3D';

/**
 * Scene Component
 * Sets up the 3D environment with lighting, camera controls, and motors
 * 
 * @param {Array} selectedMotors - Array of motor specifications to display
 */
export default function Scene({ selectedMotors }) {
  return (
    <Canvas
      camera={{ position: [40, 30, 40], fov: 50 }}
      shadows
      style={{ background: '#1a1a2e' }}
    >
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} />

        {/* Grid helper for reference */}
        <Grid
          args={[100, 100]}
          cellSize={5}
          cellThickness={0.5}
          cellColor="#6f6f6f"
          sectionSize={10}
          sectionThickness={1}
          sectionColor="#9d9d9d"
          fadeDistance={100}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid={false}
          position={[0, 0, 0]}
        />

        {/* Render selected motors */}
        {selectedMotors.map((spec, index) => (
          <Motor3D key={spec.name} spec={spec} index={index} />
        ))}

        {/* Camera controls */}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
          zoomSpeed={0.8}
          minDistance={10}
          maxDistance={100}
        />
      </Suspense>
    </Canvas>
  );
}

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import CarModel from './CarModel';

type CarCanvasStageProps = {
  scrollProgress?: number;
  className?: string;
  modelScale?: number;
  interactive?: boolean;
  spinOnScroll?: boolean;
  autoSpin?: boolean;
};

export default function CarCanvasStage({
  scrollProgress = 0,
  className = '',
  modelScale = 0.82,
  interactive = false,
  spinOnScroll = false,
  autoSpin = false,
}: CarCanvasStageProps) {
  return (
    <div className={`${interactive ? 'pointer-events-auto' : 'pointer-events-none'} absolute inset-0 z-30 ${className}`}>
      <Canvas
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        camera={{ position: [0, 0.18, 6.8], fov: 38 }}
        onCreated={({ gl }) => {
          gl.setClearAlpha(0);
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFShadowMap;
        }}
        className={`${interactive ? 'pointer-events-auto' : 'pointer-events-none'} relative z-30 h-full w-full`}
      >
        <ambientLight intensity={1.25} />
        <directionalLight position={[6, 10, 8]} intensity={2.8} color="#ffffff" castShadow />
        <directionalLight position={[-6, 5, 3]} intensity={1.35} color="#87CEEB" />
        <directionalLight position={[0, 6, -6]} intensity={1.05} color="#FFD166" />
        <Suspense fallback={null}>
          <CarModel
            scrollProgress={scrollProgress}
            scaleMultiplier={modelScale}
            spinOnScroll={spinOnScroll}
            autoSpin={autoSpin}
          />
        </Suspense>
        {interactive ? (
          <OrbitControls
            enableDamping
            dampingFactor={0.06}
            enablePan={false}
            minDistance={5.2}
            maxDistance={7.5}
            minPolarAngle={Math.PI / 2.45}
            maxPolarAngle={Math.PI / 1.8}
          />
        ) : null}
      </Canvas>
    </div>
  );
}

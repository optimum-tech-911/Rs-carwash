import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows, RoundedBox, Cylinder, Box } from '@react-three/drei';
import * as THREE from 'three';

export default function CarModel({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    
    // Smoothly interpolate rotation based on scroll progress
    // scrollProgress goes from 0 to 1 (only during hero section)
    // Rotate 180 degrees to show the profile and back as you scroll down
    const targetRotationY = scrollProgress * Math.PI; 
    const targetRotationX = Math.sin(scrollProgress * Math.PI) * 0.1;
    const targetScale = 1 + Math.sin(scrollProgress * Math.PI) * 0.3; // Scale up as you scroll

    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotationY, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotationX, 0.05);
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, targetScale, 0.05));
    
    // Add a gentle floating effect independent of scroll
    group.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
  });

  // Brand colors: Purple #6B5B95, Blue #87CEEB
  const bodyMaterial = new THREE.MeshPhysicalMaterial({ 
    color: '#6B5B95', 
    metalness: 0.7, 
    roughness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.1
  });
  
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: '#1A1A2E',
    metalness: 0.5,
    roughness: 0.1,
    transmission: 0.8,
    thickness: 0.5,
    transparent: true,
    opacity: 0.9
  });

  const grillMaterial = new THREE.MeshStandardMaterial({
    color: '#000000',
    roughness: 0.9,
    metalness: 0.1
  });

  const wheelMaterial = new THREE.MeshStandardMaterial({
    color: '#111111',
    roughness: 0.8,
    metalness: 0.2
  });

  const headlightMaterial = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    emissive: '#ffffff',
    emissiveIntensity: 2,
    toneMapped: false
  });

  const taillightMaterial = new THREE.MeshStandardMaterial({
    color: '#ff0000',
    emissive: '#ff0000',
    emissiveIntensity: 2,
    toneMapped: false
  });

  return (
    <>
      <Environment preset="city" />
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <group ref={group} position={[0, -0.5, 0]}>
          {/* RS3 Sportback Lower Body */}
          <RoundedBox args={[2.1, 0.55, 4.2]} radius={0.15} smoothness={4} position={[0, 0.5, 0]} material={bodyMaterial} />
          
          {/* RS3 Hatchback Cabin */}
          <RoundedBox args={[1.5, 0.45, 2.2]} radius={0.2} smoothness={4} position={[0, 1.0, -0.4]} material={glassMaterial} />
          
          {/* Aggressive Front Grill (Audi style) */}
          <Box args={[1.2, 0.45, 0.1]} position={[0, 0.45, 2.1]} material={grillMaterial} />
          
          {/* Headlights */}
          <Box args={[0.4, 0.1, 0.1]} position={[0.7, 0.6, 2.08]} material={headlightMaterial} />
          <Box args={[0.4, 0.1, 0.1]} position={[-0.7, 0.6, 2.08]} material={headlightMaterial} />

          {/* Taillights */}
          <Box args={[0.5, 0.1, 0.1]} position={[0.6, 0.6, -2.08]} material={taillightMaterial} />
          <Box args={[0.5, 0.1, 0.1]} position={[-0.6, 0.6, -2.08]} material={taillightMaterial} />
          
          {/* Sporty Wheels */}
          <Cylinder args={[0.4, 0.4, 0.25, 32]} rotation={[0, 0, Math.PI / 2]} position={[1.05, 0.4, 1.3]} material={wheelMaterial} />
          <Cylinder args={[0.4, 0.4, 0.25, 32]} rotation={[0, 0, Math.PI / 2]} position={[-1.05, 0.4, 1.3]} material={wheelMaterial} />
          <Cylinder args={[0.4, 0.4, 0.25, 32]} rotation={[0, 0, Math.PI / 2]} position={[1.05, 0.4, -1.2]} material={wheelMaterial} />
          <Cylinder args={[0.4, 0.4, 0.25, 32]} rotation={[0, 0, Math.PI / 2]} position={[-1.05, 0.4, -1.2]} material={wheelMaterial} />
        </group>
      </Float>
      <ContactShadows position={[0, -1.0, 0]} opacity={0.5} scale={12} blur={2.5} far={4} />
    </>
  );
}

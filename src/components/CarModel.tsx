import { useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import * as THREE from 'three';

import modelUrl from '../2020-audi-rs6-avant/source-files/FINAL_MODEL_1.fbx?url';

const textureModules = import.meta.glob('../2020-audi-rs6-avant/source-files/*.{png,jpg,jpeg}', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>;

export default function CarModel({
  scrollProgress = 0,
  scaleMultiplier = 1,
  spinOnScroll = false,
  autoSpin = false,
}: {
  scrollProgress?: number;
  scaleMultiplier?: number;
  spinOnScroll?: boolean;
  autoSpin?: boolean;
}) {
  const textureMap = useMemo(() => {
    return Object.fromEntries(
      Object.entries(textureModules).map(([path, url]) => [path.split('/').pop() ?? path, url]),
    );
  }, []);

  const source = useLoader(FBXLoader, modelUrl, (loader) => {
    loader.manager.setURLModifier((url) => {
      const key = url.split('/').pop() ?? url;
      return textureMap[key] ?? url;
    });
  });

  const car = useMemo(() => {
    const cloned = source.clone();
    const bounds = new THREE.Box3().setFromObject(cloned);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;
    const fitScale = 3.6 / maxDimension;

    cloned.position.sub(center);
    cloned.scale.setScalar(fitScale);

    cloned.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.castShadow = true;
      child.receiveShadow = true;

      const applyMaterialTweaks = (material: THREE.Material) => {
        const standardMaterial = material as THREE.MeshStandardMaterial;
        standardMaterial.envMapIntensity = 1.35;
        standardMaterial.needsUpdate = true;

        if ('metalness' in standardMaterial && typeof standardMaterial.metalness === 'number') {
          standardMaterial.metalness = Math.min(1, Math.max(0.15, standardMaterial.metalness));
        }

        if ('roughness' in standardMaterial && typeof standardMaterial.roughness === 'number') {
          standardMaterial.roughness = Math.min(0.72, Math.max(0.12, standardMaterial.roughness));
        }
      };

      if (Array.isArray(child.material)) {
        child.material.forEach(applyMaterialTweaks);
      } else if (child.material) {
        applyMaterialTweaks(child.material);
      }
    });

    return cloned;
  }, [source]);

  const group = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!group.current || !haloRef.current) return;

    const pulse = Math.sin(state.clock.elapsedTime * 1.4) * 0.03;
    const targetY = autoSpin || spinOnScroll ? pulse : pulse - scrollProgress * 0.14;
    const targetScale = scaleMultiplier;
    const targetXRotation = autoSpin || spinOnScroll ? 0.04 : 0.04 - scrollProgress * 0.035;
    const targetYRotation = autoSpin || spinOnScroll
      ? state.clock.elapsedTime * 0.45
      : Math.sin(scrollProgress * Math.PI) * 0.07;

    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.06);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetXRotation, 0.05);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetYRotation, 0.045);
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, targetScale, 0.06));

    haloRef.current.rotation.z += 0.0026;
    haloRef.current.scale.setScalar(1 + scrollProgress * 0.12);
  });

  return (
    <>
      <Environment preset="city" />
      <group ref={group} position={[0, 0, 0]} rotation={[0.04, 0, 0]} scale={scaleMultiplier}>
        <mesh ref={haloRef} position={[0, -1.25, -0.65]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.85, 2.05, 72]} />
          <meshBasicMaterial color="#87CEEB" transparent opacity={0.24} side={THREE.DoubleSide} />
        </mesh>
        <primitive object={car} position={[0, 0, 0]} rotation={[0, 0, 0]} />
      </group>
      <ContactShadows position={[0, -1.7, 0]} opacity={0.52} scale={8} blur={2.8} far={4.8} />
    </>
  );
}

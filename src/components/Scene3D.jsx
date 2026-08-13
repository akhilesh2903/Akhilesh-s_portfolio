import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useTheme } from '../context/ThemeContext';
import * as THREE from 'three';

// Floating particles
function Particles({ count = 2500, color }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.03;
    ref.current.rotation.y = state.clock.elapsedTime * 0.04;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

// Wireframe torus
function FloatingTorus({ position, speed = 0.3, scale = 1, color }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.7;
    ref.current.rotation.y = state.clock.elapsedTime * speed;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <torusGeometry args={[1, 0.3, 16, 60]} />
      <meshBasicMaterial color={color} wireframe opacity={0.15} transparent />
    </mesh>
  );
}

// Octahedron wireframe
function FloatingOctahedron({ position, speed = 0.2, scale = 1, color }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * speed;
    ref.current.rotation.z = state.clock.elapsedTime * speed * 0.8;
    ref.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 0.4) * 0.4;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color={color} wireframe opacity={0.12} transparent />
    </mesh>
  );
}

// Icosahedron
function FloatingIcosahedron({ position, speed = 0.15, scale = 1, color }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * speed;
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.6;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + 1) * 0.5;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color={color} wireframe opacity={0.10} transparent />
    </mesh>
  );
}

// Main Scene
function Scene3DInner({ theme }) {
  const groupRef = useRef();

  // Define colors based on theme
  const colors = {
    cyan: theme === 'light' ? '#d97757' : '#00e5ff',
    blue: theme === 'light' ? '#a67c52' : '#3d8ef8',
    violet: theme === 'light' ? '#8c6b5d' : '#7c3aed',
  };

  useFrame((state) => {
    if (!groupRef.current) return;
    // Very subtle global drift
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <Particles count={window.innerWidth < 768 ? 800 : 2500} color={colors.cyan} />
      <FloatingTorus position={[-4, 1, -3]} speed={0.25} scale={1.2} color={colors.blue} />
      <FloatingTorus position={[5, -2, -5]} speed={0.18} scale={0.8} color={colors.blue} />
      <FloatingOctahedron position={[3, 2, -2]} speed={0.22} scale={1.5} color={colors.violet} />
      <FloatingOctahedron position={[-5, -1, -4]} speed={0.16} scale={0.9} color={colors.violet} />
      <FloatingIcosahedron position={[0, -3, -3]} speed={0.20} scale={1.1} color={colors.cyan} />
      <FloatingIcosahedron position={[-2, 3, -6]} speed={0.12} scale={2.0} color={colors.cyan} />
    </group>
  );
}

const Scene3D = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <Scene3DInner theme={theme} />
      </Canvas>
    </div>
  );
};

export default Scene3D;

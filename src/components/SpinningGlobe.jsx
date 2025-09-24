import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';

function RotatingGlobe() {
  const meshRef = useRef();
  const textGroupRef = useRef();

  // All technologies - Frontend, Backend, Database, and Tools
  const languages = [
    // Frontend
    'JavaScript', 'React', 'TypeScript', 'HTML5', 'CSS3', 'Sass', 'Vue.js', 'Next.js', 'Tailwind',
    // Backend
    'Node.js', 'Python', 'Express.js', 'Django', 'Flask', 'Java', 'Spring Boot', 'PHP', 'Laravel',
    // Databases
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'SQLite', 'Prisma',
    // Tools & DevOps
    'Git', 'Docker', 'AWS', 'Vercel', 'Netlify', 'GitHub Actions', 'Webpack', 'Vite', 'Figma', 'Postman'
  ];

  // Rotate the entire group
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
    if (textGroupRef.current) {
      textGroupRef.current.rotation.y += delta * 0.3;
    }
  });

  // Generate positions on sphere surface with better distribution
  const getPositionOnSphere = (index, total) => {
    const phi = Math.acos(-1 + (2 * index) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;
    const radius = 3.2; // Increased radius for more technologies
    
    return [
      radius * Math.cos(theta) * Math.sin(phi),
      radius * Math.cos(phi),
      radius * Math.sin(theta) * Math.sin(phi)
    ];
  };

  return (
    <>
      {/* Wireframe Sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.6, 32, 32]} />
        <meshBasicMaterial 
          color="#ff0000" 
          wireframe={true} 
          transparent={true}
          opacity={0.3}
        />
      </mesh>
      
      {/* Programming Language Labels */}
      <group ref={textGroupRef}>
        {languages.map((language, index) => {
          const position = getPositionOnSphere(index, languages.length);
          return (
            <Text
              key={language}
              position={position}
              fontSize={0.15}
              color="#ff0000"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0}
            >
              {language}
            </Text>
          );
        })}
      </group>
    </>
  );
}

function SpinningGlobe() {
  return (
    <div className="globe-container" style={{ width: '100%', height: '100vh' }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 75 }}
        style={{ width: '100%', height: '100%', background: '#000000' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        <RotatingGlobe />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.8}
          minDistance={4}
          maxDistance={12}
        />
      </Canvas>
    </div>
  );
}

export default SpinningGlobe;
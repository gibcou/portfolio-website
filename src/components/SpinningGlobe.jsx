import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';

function RotatingGlobe() {
  const meshRef = useRef();
  const textGroupRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  // Front-end technologies
  const languages = [
    'JavaScript', 'React', 'TypeScript', 'HTML5',
    'CSS3', 'Sass', 'Vue.js', 'Next.js', 'Tailwind', 'Git', 'Figma'
  ];

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      
      setIsMobile(mobileRegex.test(userAgent) || (isTouchDevice && isSmallScreen));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Rotate the entire group - disabled on mobile
  useFrame((state, delta) => {
    if (!isMobile) {
      if (meshRef.current) {
        meshRef.current.rotation.y += delta * 0.3;
      }
      if (textGroupRef.current) {
        textGroupRef.current.rotation.y += delta * 0.3;
      }
    }
  });

  // Generate positions on sphere surface
  const getPositionOnSphere = (index, total) => {
    const phi = Math.acos(-1 + (2 * index) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;
    const radius = 2.8;
    
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
        <sphereGeometry args={[2.2, 32, 32]} />
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
              fontSize={0.18}
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
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      
      setIsMobile(mobileRegex.test(userAgent) || (isTouchDevice && isSmallScreen));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
          autoRotate={!isMobile}
          autoRotateSpeed={0.8}
          minDistance={4}
          maxDistance={12}
        />
      </Canvas>
    </div>
  );
}

export default SpinningGlobe;
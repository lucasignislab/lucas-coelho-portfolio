import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const VortexBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;


    // Create floating particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 3000;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 30;
    }

    // Create circular texture for particles
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d')!;
    context.beginPath();
    context.arc(16, 16, 16, 0, Math.PI * 2);
    context.fillStyle = '#ffffff';
    context.fill();
    
    const circleTexture = new THREE.CanvasTexture(canvas);

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x8754FF,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
      map: circleTexture
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);


    // Position camera
    camera.position.z = 8;
    camera.position.y = 2;

    // Animation
    let time = 0;
    const animate = () => {
      time += 0.01;

      // Animate particles floating gently
      const particlePositions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Faster floating movement
        particlePositions[i3] += Math.sin(time + i * 0.01) * 0.008;
        particlePositions[i3 + 1] += Math.cos(time + i * 0.015) * 0.008;
        particlePositions[i3 + 2] += Math.sin(time + i * 0.02) * 0.006;
        
        // Reset particles that go too far
        if (particlePositions[i3] > 15) particlePositions[i3] = -15;
        if (particlePositions[i3] < -15) particlePositions[i3] = 15;
        if (particlePositions[i3 + 1] > 15) particlePositions[i3 + 1] = -15;
        if (particlePositions[i3 + 1] < -15) particlePositions[i3 + 1] = 15;
        if (particlePositions[i3 + 2] > 15) particlePositions[i3 + 2] = -15;
        if (particlePositions[i3 + 2] < -15) particlePositions[i3 + 2] = 15;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Camera gentle movement
      camera.position.x = Math.sin(time * 0.1) * 0.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!renderer || !camera) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default VortexBackground;
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

    // Create vortex geometry
    const createVortexRing = (radius: number, color: number, offset: number) => {
      const geometry = new THREE.TorusGeometry(radius, 0.02, 8, 100);
      const material = new THREE.MeshBasicMaterial({ 
        color: color,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
      });
      const torus = new THREE.Mesh(geometry, material);
      torus.rotation.x = Math.PI / 2;
      torus.position.z = offset;
      return torus;
    };

    // Create multiple rings for vortex effect
    const vortexRings: THREE.Mesh[] = [];
    const colors = [0x8754FF, 0xC0C5C7, 0xE5D7C4, 0x3A4143];
    
    for (let i = 0; i < 20; i++) {
      const radius = 0.5 + i * 0.3;
      const color = colors[i % colors.length];
      const offset = -i * 0.5;
      const ring = createVortexRing(radius, color, offset);
      vortexRings.push(ring);
      scene.add(ring);
    }

    // Create floating particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x8754FF,
      size: 0.02,
      transparent: true,
      opacity: 0.8
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Create wave lines
    const createWaveLine = () => {
      const points = [];
      for (let i = 0; i <= 100; i++) {
        const x = (i - 50) * 0.1;
        const y = Math.sin(i * 0.1) * 0.5;
        const z = Math.cos(i * 0.05) * 2;
        points.push(new THREE.Vector3(x, y, z));
      }
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ 
        color: 0xE5D7C4,
        transparent: true,
        opacity: 0.4
      });
      
      return new THREE.Line(geometry, material);
    };

    const waveLines: THREE.Line[] = [];
    for (let i = 0; i < 10; i++) {
      const line = createWaveLine();
      line.rotation.y = (i / 10) * Math.PI * 2;
      line.position.y = (Math.random() - 0.5) * 4;
      waveLines.push(line);
      scene.add(line);
    }

    // Position camera
    camera.position.z = 8;
    camera.position.y = 2;

    // Animation
    let time = 0;
    const animate = () => {
      time += 0.01;

      // Animate vortex rings
      vortexRings.forEach((ring, index) => {
        ring.rotation.z += 0.002 + index * 0.0002;
        ring.position.y = Math.sin(time + index * 0.1) * 0.1;
        
        // Create spiral effect
        const scale = 1 + Math.sin(time + index * 0.2) * 0.1;
        ring.scale.set(scale, scale, scale);
      });

      // Animate particles in spiral
      const particlePositions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const radius = Math.sqrt(particlePositions[i3] ** 2 + particlePositions[i3 + 1] ** 2);
        const angle = Math.atan2(particlePositions[i3 + 1], particlePositions[i3]) + 0.01;
        
        particlePositions[i3] = Math.cos(angle) * radius;
        particlePositions[i3 + 1] = Math.sin(angle) * radius;
        particlePositions[i3 + 2] += 0.01;
        
        // Reset particles that go too far
        if (particlePositions[i3 + 2] > 10) {
          particlePositions[i3 + 2] = -10;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Animate wave lines
      waveLines.forEach((line, index) => {
        line.rotation.y += 0.001;
        line.rotation.z += 0.0005;
        
        const positions = line.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] = Math.sin(time * 2 + positions[i] * 2 + index) * 0.5;
        }
        line.geometry.attributes.position.needsUpdate = true;
      });

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
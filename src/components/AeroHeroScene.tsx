import { useEffect, useRef } from "react";

export function AeroHeroScene() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const sceneRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const container = sceneRef.current;
		if (!canvas || !container) return;

		const reducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;
		const mobile = window.matchMedia("(max-width: 760px)").matches;
		let disposed = false;
		let animationFrame = 0;
		let cleanupScene = () => {};

		async function buildScene() {
			const THREE = await import("three");
			if (disposed || !canvas || !container) return;

			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
			camera.position.set(0, 0.1, 8.5);

			const renderer = new THREE.WebGLRenderer({
				canvas,
				alpha: true,
				antialias: !mobile,
				powerPreference: "high-performance",
			});
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1 : 1.5));
			renderer.outputColorSpace = THREE.SRGBColorSpace;

			const root = new THREE.Group();
			root.rotation.set(-0.08, -0.22, 0.035);
			scene.add(root);

			const texture = new THREE.TextureLoader().load(
				"/cases/aero/01-abertura.png",
				loadedTexture => {
					loadedTexture.colorSpace = THREE.SRGBColorSpace;
					loadedTexture.anisotropy = Math.min(
						4,
						renderer.capabilities.getMaxAnisotropy()
					);
				}
			);

			const screen = new THREE.Mesh(
				new THREE.PlaneGeometry(5.15, 3.46),
				new THREE.MeshBasicMaterial({ map: texture })
			);
			root.add(screen);

			const screenEdge = new THREE.LineSegments(
				new THREE.EdgesGeometry(screen.geometry),
				new THREE.LineBasicMaterial({
					color: 0x70aaff,
					transparent: true,
					opacity: 0.7,
				})
			);
			screenEdge.position.z = 0.012;
			screen.add(screenEdge);

			const ghostMaterial = new THREE.MeshBasicMaterial({
				color: 0x17243a,
				transparent: true,
				opacity: 0.32,
				wireframe: true,
			});
			for (let index = 1; index <= 3; index += 1) {
				const ghost = new THREE.Mesh(
					new THREE.PlaneGeometry(5.15, 3.46, 8, 5),
					ghostMaterial.clone()
				);
				ghost.position.set(index * 0.16, index * -0.13, index * -0.42);
				root.add(ghost);
			}

			const ringMaterial = new THREE.MeshBasicMaterial({
				color: 0x388cfa,
				transparent: true,
				opacity: 0.42,
			});
			const ring = new THREE.Mesh(
				new THREE.TorusGeometry(2.35, 0.008, 8, 160),
				ringMaterial
			);
			ring.position.set(2.25, -1.5, -1.4);
			ring.rotation.set(1.15, 0.4, 0.35);
			root.add(ring);

			const particleCount = mobile ? 90 : 190;
			const particlePositions = new Float32Array(particleCount * 3);
			for (let index = 0; index < particleCount; index += 1) {
				particlePositions[index * 3] = (Math.random() - 0.5) * 11;
				particlePositions[index * 3 + 1] = (Math.random() - 0.5) * 7;
				particlePositions[index * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
			}
			const particleGeometry = new THREE.BufferGeometry();
			particleGeometry.setAttribute(
				"position",
				new THREE.BufferAttribute(particlePositions, 3)
			);
			const particles = new THREE.Points(
				particleGeometry,
				new THREE.PointsMaterial({
					color: 0x64a7ff,
					size: mobile ? 0.018 : 0.024,
					transparent: true,
					opacity: 0.62,
					sizeAttenuation: true,
				})
			);
			scene.add(particles);

			const pointer = { x: 0, y: 0 };
			const targetPointer = { x: 0, y: 0 };
			const onPointerMove = (event: PointerEvent) => {
				targetPointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
				targetPointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
			};
			const resize = () => {
				const { width, height } = container.getBoundingClientRect();
				renderer.setSize(Math.max(width, 1), Math.max(height, 1), false);
				camera.aspect = Math.max(width, 1) / Math.max(height, 1);
				camera.updateProjectionMatrix();
			};

			resize();
			window.addEventListener("resize", resize);
			if (!reducedMotion) {
				window.addEventListener("pointermove", onPointerMove, { passive: true });
			}

			const clock = new THREE.Clock();
			const render = () => {
				if (disposed) return;
				const elapsed = clock.getElapsedTime();
				const heroProgress = Math.min(
					1,
					Math.max(0, window.scrollY / Math.max(window.innerHeight, 1))
				);

				pointer.x += (targetPointer.x - pointer.x) * 0.045;
				pointer.y += (targetPointer.y - pointer.y) * 0.045;

				if (!reducedMotion) {
					root.rotation.y = -0.22 + pointer.x * 0.09 + heroProgress * 0.28;
					root.rotation.x = -0.08 - pointer.y * 0.06 + heroProgress * 0.08;
					root.position.y =
						Math.sin(elapsed * 0.65) * 0.06 + heroProgress * 0.35;
					root.position.z = heroProgress * 0.9;
					ring.rotation.z = elapsed * 0.09;
					particles.rotation.y = elapsed * 0.012;
				}

				renderer.render(scene, camera);
				animationFrame = requestAnimationFrame(render);
			};
			render();

			cleanupScene = () => {
				cancelAnimationFrame(animationFrame);
				window.removeEventListener("resize", resize);
				window.removeEventListener("pointermove", onPointerMove);
				texture.dispose();
				particleGeometry.dispose();
				scene.traverse(object => {
					if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
						object.geometry?.dispose();
						const materials = Array.isArray(object.material)
							? object.material
							: [object.material];
						materials.forEach(material => material?.dispose());
					}
				});
				renderer.dispose();
			};
		}

		void buildScene();

		return () => {
			disposed = true;
			cancelAnimationFrame(animationFrame);
			cleanupScene();
		};
	}, []);

	return (
		<div ref={sceneRef} className="aero-3d-scene" aria-hidden="true">
			<div className="aero-3d-hud aero-3d-hud-top">
				<span>AERO.OS</span>
				<span>LIVE SYSTEM</span>
			</div>
			<canvas ref={canvasRef} />
			<div className="aero-3d-hud aero-3d-hud-bottom">
				<span>35°41&apos;22.4&quot;</span>
				<span className="aero-3d-signal">
					<i />
					Signal
				</span>
			</div>
		</div>
	);
}

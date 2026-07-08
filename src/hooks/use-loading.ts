import { useEffect, useState } from "react";

/**
 * Hook que controla o estado de loading do site.
 * Mostra a tela de loading por `delay` ms no primeiro mount.
 * Inclui fallback: apos `delay + safetyMs`, garante que isLoading vira false
 * mesmo se algo der errado.
 */
export function useLoading(delay: number = 1800, safetyMs: number = 500) {
	const [isLoading, setIsLoading] = useState(true);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const start = performance.now();
		let raf: number;
		let safetyTimer: ReturnType<typeof setTimeout>;

		const finish = () => setIsLoading(false);

		const tick = (t: number) => {
			const elapsed = t - start;
			const pct = Math.min(100, Math.round((elapsed / delay) * 100));
			setProgress(pct);
			if (pct < 100) {
				raf = requestAnimationFrame(tick);
			} else {
				setTimeout(finish, 200);
			}
		};
		raf = requestAnimationFrame(tick);

		// Safety fallback: garante que sai do loading apos delay + safety
		safetyTimer = setTimeout(finish, delay + safetyMs);

		return () => {
			cancelAnimationFrame(raf);
			clearTimeout(safetyTimer);
		};
	}, [delay, safetyMs]);

	return { isLoading, progress };
}

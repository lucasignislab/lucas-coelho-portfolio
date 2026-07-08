import { useEffect, useState } from "react";

/**
 * Retorna o horário local formatado, atualizando a cada minuto.
 */
export function useLocalTime(timezone?: string) {
	const [time, setTime] = useState(() => formatTime(timezone));

	useEffect(() => {
		const tick = () => setTime(formatTime(timezone));
		tick();
		const id = setInterval(tick, 1000 * 30); // a cada 30s
		return () => clearInterval(id);
	}, [timezone]);

	return time;
}

function formatTime(timezone?: string) {
	const now = new Date();
	const options: Intl.DateTimeFormatOptions = {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
		...(timezone ? { timeZone: timezone } : {}),
	};
	const formatted = new Intl.DateTimeFormat("pt-BR", options).format(now);
	// separa hora e AM/PM para possível split render
	const [h, rest] = formatted.split(":");
	const m = rest?.split(" ")[0] ?? "";
	const ampm = rest?.split(" ")[1] ?? "";
	return { h, m, ampm, full: formatted };
}

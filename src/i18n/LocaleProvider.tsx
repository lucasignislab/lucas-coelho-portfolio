import type { ReactNode } from "react";
import type { Locale } from "./locale";
import { LocaleContext } from "./localeContext";

export function LocaleProvider({
	locale,
	children,
}: {
	locale: Locale;
	children: ReactNode;
}) {
	return (
		<LocaleContext.Provider value={locale}>
			{children}
		</LocaleContext.Provider>
	);
}

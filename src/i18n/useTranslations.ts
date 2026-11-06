import { useContext } from "react";
import { LocaleContext } from "./localeContext";
import { messages, type MessageKey } from "./messages";

export function useLocale() {
	return useContext(LocaleContext);
}

export function useTranslations() {
	const locale = useLocale();
	return messages[locale];
}

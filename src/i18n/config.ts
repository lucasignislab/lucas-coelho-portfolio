
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import pt from './locales/pt.json';
import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'pt',
        supportedLngs: ['pt', 'en', 'es', 'de'],
        load: 'languageOnly',
        resources: {
            pt: { translation: pt },
            en: { translation: en },
            es: { translation: es },
            de: { translation: de }
        },
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        }
    });

export default i18n;

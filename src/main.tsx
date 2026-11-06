import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { resolveLocalePath } from './i18n/locale';
import './index.css';

const container = document.getElementById('root')!;
const requestedLocale = resolveLocalePath(window.location.pathname).locale;
const renderedLocale = document.documentElement.lang;

// Quando o HTML já vem pré-renderizado pelo plugin staticSeoPages (SSR),
// hidrata o markup existente apenas se ele corresponder ao idioma da rota.
if (container.hasChildNodes() && renderedLocale === requestedLocale) {
	hydrateRoot(container, <App />);
} else {
	createRoot(container).render(<App />);
}

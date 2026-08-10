import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root')!;

// Quando o HTML já vem pré-renderizado pelo plugin staticSeoPages (SSR),
// hidrata o markup existente; caso contrário, renderiza do zero.
if (container.hasChildNodes()) {
	hydrateRoot(container, <App />);
} else {
	createRoot(container).render(<App />);
}

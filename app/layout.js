import { DM_Mono, Inter_Tight } from 'next/font/google';
import './globals.css';

const mono = DM_Mono({ subsets: ['latin', 'latin-ext'], weight: ['300', '400', '500'], variable: '--fuente-mono' });
const grotesk = Inter_Tight({ subsets: ['latin', 'latin-ext'], weight: ['400', '500'], variable: '--fuente-grotesk' });

export const metadata = {
  title: 'Estefanía Viyella',
  description: 'Estefanía Viyella, artista visual. Pintura figurativa. Pontevedra, Galicia.',
  openGraph: {
    title: 'Estefanía Viyella',
    description: 'Artista visual. Pintura figurativa.',
    images: ['/img/figura-gris.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${mono.variable} ${grotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}

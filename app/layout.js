import { Chivo_Mono, Familjen_Grotesk } from 'next/font/google';
import './globals.css';

const mono = Chivo_Mono({ subsets: ['latin', 'latin-ext'], weight: ['300', '400', '700'], variable: '--fuente-mono' });
const grotesk = Familjen_Grotesk({ subsets: ['latin'], weight: ['400', '500'], variable: '--fuente-grotesk' });

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

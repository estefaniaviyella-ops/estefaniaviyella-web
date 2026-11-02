# Estefanía Viyella — web

Web de artista hecha con Next.js y publicada en Vercel.
Cada cambio que se sube a la rama `main` se publica solo.

## Dónde está cada cosa

- `lib/contenido.js`: obras, texto de Acerca, CV y redes. Es el único archivo que hay que tocar para cambiar contenido.
- `public/img/`: imágenes de las obras.
- `components/Sitio.jsx`: la página (índice lateral, visor, versión móvil e imagen ampliada).
- `app/globals.css`: colores, tipografías y maquetación.

## Añadir una obra

1. Sube la imagen a `public/img/` (JPG, unos 1800 px por el lado largo).
2. En `lib/contenido.js`, copia un bloque de `OBRAS` y cambia título, año, ficha e imágenes (`[archivo, ancho, alto]`).
   El orden de `OBRAS` es el orden del menú; la primera obra es la portada.

## Probar en local

```bash
npm install
npm run dev
```

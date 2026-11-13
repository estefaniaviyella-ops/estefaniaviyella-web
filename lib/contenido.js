// Contenido de la web. Para añadir una obra, copia un bloque de OBRAS,
// pon sus imágenes en /public/img y ajusta título, año y ficha.
// Cada imagen es [archivo, ancho, alto]. Una obra sin imágenes usa

export const OBRAS = [
  { id: 'figura-gris-tumbada', titulo: 'Figura gris tumbada', año: '2026', ficha: 'Óleo sobre lienzo, — × — cm.',
    imagenes: [['figura-gris.jpg', 1254, 1254]] },
  { id: 'luna-artificial', titulo: 'Luna artificial', año: '2025', ficha: 'Óleo sobre tela, 120 × 80 cm.',
    imagenes: [['luna-1.jpg', 1086, 1448], ['luna-2.jpg', 1080, 1662], ['luna-3.jpg', 1440, 1800]] },
  { id: 'sin-titulo-2025', titulo: 'Sin título', año: '2025', ficha: '— × — cm.',
    imagenes: [['sin-titulo-2025-1.jpg', 1080, 1350], ['sin-titulo-2025-2.jpg', 1080, 1350]] },
  { id: 'figura-azul-y-rosa', titulo: 'Figura azul y rosa', año: '2024', ficha: 'Óleo sobre lienzo, — × — cm.',
    imagenes: [['figura-azul-y-rosa.jpg', 828, 1015]] },
  { id: 'azul-de-la-distancia', titulo: 'Azul de la distancia', año: '2024', ficha: 'Cianotipia sobre tela, 185 × 95 cm.',
    imagenes: [['azul-1.jpg', 1800, 1200], ['azul-2.jpg', 1800, 1200]] },
  { id: 'flores', titulo: 'Flores', año: '2021', ficha: 'Tinta sobre papel, 11 dibujos.',
    imagenes: [['flores-1.jpg', 1208, 1800], ['flores-2.jpg', 1193, 1800], ['flores-3.jpg', 1175, 1800],
      ['flores-4.jpg', 1215, 1800], ['flores-5.jpg', 1199, 1800], ['flores-6.jpg', 1232, 1800],
      ['flores-7.jpg', 1202, 1800], ['flores-8.jpg', 1206, 1800], ['flores-9.jpg', 1199, 1800],
      ['flores-10.jpg', 1210, 1800], ['flores-11.jpg', 1199, 1800]] },
];

export const ACERCA = {
  foto: 'retrato-bn.jpg',
  texto: `Estefanía Viyella es artista visual y diseñadora. Nació en Veracruz, México, y actualmente vive y trabaja en Pontevedra, Galicia.

Estefanía encuentra en la pintura y el dibujo una herramienta para deconstruir el entorno y comprender su relación con él. Su obra no busca reflejar el mundo tal como es: al reconstruirlo, lo convierte en una metáfora para explicarse a sí misma y definir su postura ante la realidad.

Sus intereses giran en torno a lo natural, los elementos habituales y el ser humano en relación con ellos. Bodegones, flora, fauna y escenas cotidianas comparten una mirada experimental que busca otras formas de entender lo cotidiano.`,
};

// Cada entrada: [título, lugar, año]
export const CV = {
  'Exposiciones individuales': [
    ['Sustancia en las sombras', 'Trastienda Machete, Ciudad de México', '2025'],
    ['Entropías', 'BUAP, Puebla', '2018'],
    ['Punto de encuentro', 'Luz de la Nevera, UDLAP, Puebla', '2018'],
  ],
  'Exposiciones colectivas': [
    ['Physical Landscapes: Next-Gen Voices in Mexican Painting', 'Alday Hunken Gallery, Atlanta', '2025'],
    ['Agentes líquidos', 'CAL-COOP, Guadalajara', '2024'],
    ['Correspondencias', 'Facultad de Artes y Diseño FAD, UNAM, Ciudad de México', '2022'],
    ['Platitudes', 'Estudio Aldo Chaparro, Monterrey', '2021'],
    ['Otro trabajo otro trabaja', 'Espacio Cabeza, Guadalajara', '2020'],
    ['Un nido en el huracán', 'Otro Espacio, Guadalajara', '2020'],
    ['OFF-SITE MX', 'Ciudad de México', '2020'],
    ['“I am the sun, you are the moon” UN-M2', 'Hotel Demetria, Guadalajara', '2019'],
    ['Jóvenes Creadores', 'Foto Museo Cuatro Caminos, Ciudad de México', '2019'],
    ['Plantas, desnudos y recortes', 'Aurelia, Guadalajara', '2019'],
    ['Proyecto rotatoria', 'Centro Cultural Caba, CABA, Argentina', '2019'],
    ['Nueva piel para una vieja ceremonia', 'Galería Karen Huber, Ciudad de México', '2019'],
    ['[DE]limitaciones inciertas', 'Puebla', '2018'],
    ['Intervención Edgar Ortega en Entropías', 'BUAP, Puebla', '2018'],
    ['El tiempo habitado', 'Espacio Catorce, Puebla', '2018'],
    ['Intervención con mural', 'Mercado San Juan, Puebla', '2017'],
    ['Aracne', 'Museo de Erasto Cortés, Puebla', '2017'],
    ['A time for everything and for everything a time', 'Container City, Puebla', '2017'],
    ['De-construyendo', 'Terminal 205, Puebla', '2016'],
  ],
  'Ferias': [
    ['SWAB Barcelona', 'Con Trastienda Machete, Barcelona', '2026'],
    ['F-A-M-A', 'Monterrey', '2019'],
  ],
  'Educación': [
    ['Máster en Diseño Gráfico Avanzado', 'LABASAD, Barcelona', '2023'],
    ['Licenciatura en Artes Plásticas', 'Universidad de las Américas, Puebla', '2017'],
  ],
  'Reconocimientos': [
    ['Beca Jóvenes Creadores en pintura', 'FONCA / CONACULTA', '2018–2019'],
  ],
};

export const REDES = [
  ['Instagram', 'https://www.instagram.com/efifania'],
  ['Email', 'mailto:estefania.viyellaoa@gmail.com'],
];

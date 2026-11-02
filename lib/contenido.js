// Contenido de la web. Para añadir una obra, copia un bloque de OBRAS,
// pon sus imágenes en /public/img y ajusta título, año y ficha.
// Cada imagen es [archivo, ancho, alto]. Una obra sin imágenes usa
// hueco: [ancho, alto] y se muestra como un recuadro gris.

export const OBRAS = [
  { id: 'figura-gris-tumbada', titulo: 'Figura gris tumbada', año: '2026', ficha: 'Óleo sobre lienzo, — × — cm.',
    imagenes: [['figura-gris.jpg', 1254, 1254]] },
  { id: 'luna-artificial', titulo: 'Luna artificial', año: '2025', ficha: 'Óleo sobre tela, 120 × 80 cm.',
    imagenes: [['luna-1.jpg', 1086, 1448], ['luna-2.jpg', 1080, 1662], ['luna-3.jpg', 1440, 1800]] },
  { id: 'cara-azul-con-mano', titulo: 'Cara azul con mano', año: '2025', ficha: 'Acrílico sobre lienzo, — × — cm.', hueco: [437, 544] },
  { id: 'oreja', titulo: 'Oreja', año: '2025', ficha: 'Acrílico sobre lienzo, — × — cm.', hueco: [480, 544] },
  { id: 'sin-titulo-2025', titulo: 'Sin título', año: '2025', ficha: '— × — cm.',
    imagenes: [['sin-titulo-2025-1.jpg', 1080, 1350], ['sin-titulo-2025-2.jpg', 1080, 1350]] },
  { id: 'mano-naranja', titulo: 'Mano naranja', año: '2024', ficha: 'Acrílico sobre lienzo, — × — cm.', hueco: [472, 544] },
  { id: 'manos-y-tallos', titulo: 'Manos y tallos', año: '2024', ficha: 'Óleo sobre lienzo, — × — cm.', hueco: [366, 544] },
  { id: 'figura-azul-y-rosa', titulo: 'Figura azul y rosa', año: '2024', ficha: 'Óleo sobre lienzo, — × — cm.', hueco: [336, 544] },
  { id: 'cara-mano-en-la-boca', titulo: 'Cara, mano en la boca', año: '2024', ficha: '', hueco: [408, 544] },
  { id: 'azul-de-la-distancia', titulo: 'Azul de la distancia', año: '2024', ficha: 'Cianotipia sobre tela, 185 × 95 cm.',
    imagenes: [['azul-1.jpg', 1800, 1200], ['azul-2.jpg', 1800, 1200]] },
  { id: 'perfil', titulo: 'Perfil', año: '2023', ficha: 'Acrílico sobre lienzo, — × — cm.', hueco: [435, 544] },
  { id: 'flores', titulo: 'Flores', año: '2021', ficha: 'Tinta sobre papel, 2 dibujos.',
    imagenes: [['flores-1.jpg', 1208, 1800], ['flores-2.jpg', 1193, 1800]] },
];

export const ACERCA = {
  foto: 'acerca.jpg',
  texto: `Soy artista visual y diseñadora. Nací en Veracruz, México, y actualmente vivo y trabajo en Pontevedra, Galicia.

Mi práctica pictórica explora la figura humana y su relación con el espacio. Me interesan los gestos cotidianos: apoyar la cabeza sobre una mano, permanecer sentado, recostarse o tocar algo. A través de estas acciones, construyo escenas donde la postura y el peso del cuerpo sugieren una experiencia interior.

Trabajo desde la figuración, simplificando la anatomía y alterando sus proporciones mediante contornos marcados y planos de color. Me interesa la tensión entre la superficie plana de la pintura y la presencia casi escultórica de los cuerpos. Las manos, los rostros y las extremidades adquieren volumen y peso, mientras ciertas zonas se aplanan o se confunden con el fondo.

El espacio participa de esa construcción. Los planos que forman una habitación, una ventana o una sombra dialogan con los que componen la figura. Cuerpo y entorno se definen mutuamente: sus formas se prolongan, se interrumpen o se unen a través del color. La profundidad convive con la planitud, generando espacios reconocibles cuya perspectiva resulta inestable.

La luz y la sombra articulan estas relaciones. Modelan los cuerpos y, al mismo tiempo, los dividen en superficies de color. En ese tránsito entre lo plano y lo volumétrico, busco dar a los gestos cotidianos una presencia extraña y suspendida, capaz de sugerir algo que todavía no encuentra palabras.`,
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

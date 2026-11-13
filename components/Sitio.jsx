'use client';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { OBRAS, ACERCA, CV, REDES } from '../lib/contenido';

const INICIO = OBRAS[0].id;
const SECCIONES = [['obras', 'Obras seleccionadas'], ['acerca', 'Acerca'], ['cv', 'CV']];
// Ancho de cada panel lateral en escritorio
const ANCHO_PANEL = { obras: '620px', acerca: '740px', cv: 'min(1040px, 66vw)' };
const fichaDe = o => `(${o.titulo}). ${o.año}.${o.ficha ? ' ' + o.ficha : ''}`;
const obra = id => OBRAS.find(o => o.id === id);
const enlace = ([texto, url]) => (
  <a key={texto} href={url} target={url.startsWith('http') ? '_blank' : undefined} rel="noopener">{texto}</a>
);
const EntradaCV = ({ e: [t, l, a] }) => <p>{`${t}\n${l}\n${a}`}</p>;

// Imagen de una obra a la medida del hueco libre (el CSS fija el alto con --alto-img y --ancho-img)
function Obra({ src, w, h, alt, onClick }) {
  return (
    <Image src={'/img/' + src} alt={alt} width={w} height={h} sizes="(min-width: 900px) 60vw, 100vw" priority
      onClick={onClick} className="obra-img" style={{ '--r': h / w }} />
  );
}

function ListaObras({ seleccion, onElegir, onPasar }) {
  return (
    <div className="lista">
      <ul className="filas" onMouseLeave={onPasar && (() => onPasar(null))}>
        {OBRAS.map(ob => (
          <li key={ob.id} className={ob.id === seleccion ? 'sel' : undefined} onMouseEnter={onPasar && (() => onPasar(ob.id))}>
            <a href={'#' + ob.id} onClick={e => { e.preventDefault(); onElegir(ob.id); }}>
              <span className="titulo">({ob.titulo})</span><span>{ob.año}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Acerca({ onAmpliar }) {
  return (
    <div className="acerca">
      <p>{ACERCA.texto}</p>
      <Image className="foto" src={'/img/' + ACERCA.foto} alt="Estefanía Viyella" width={1171} height={1500} sizes="170px" onClick={onAmpliar} />
      <nav className="redes">{REDES.map(enlace)}</nav>
    </div>
  );
}

function CVColumnas() {
  const bloque = ([titulo, items]) => (
    <div key={titulo} className="cv-bloque">
      <h3>{titulo}</h3>
      {items.map(e => <EntradaCV key={e[0]} e={e} />)}
    </div>
  );
  return (
    <div className="cv-panel">
    <div className="cv">
      <div className="cv-col">
        {bloque(['Exposiciones individuales', CV['Exposiciones individuales']])}
        {bloque(['Ferias', CV['Ferias']])}
        {bloque(['Educación', CV['Educación']])}
        {bloque(['Reconocimientos', CV['Reconocimientos']])}
      </div>
      <div className="cv-col">{bloque(['Exposiciones colectivas', CV['Exposiciones colectivas']])}</div>
    </div>
    <nav className="redes">{REDES.map(enlace)}</nav>
    </div>
  );
}

export default function Sitio() {
  const [seleccion, setSeleccion] = useState(INICIO);
  const [vista, setVista] = useState(null);       // obra bajo el ratón en el listado (escritorio)
  const [imagen, setImagen] = useState(0);
  const [abierta, setAbierta] = useState(null);   // sección abierta: 'obras' | 'acerca' | 'cv' | null
  const [zoom, setZoom] = useState(null);         // { lista, i, alt }
  const [movil, setMovil] = useState(false);
  const [ultima, setUltima] = useState('obras');  // sección que se ve mientras el desplegable móvil baja al cerrarse
  const toque = useRef(null);                      // x donde empezó el dedo, para el swipe entre fotos
  const deslizo = useRef(false);                   // el último toque en la ampliación fue un swipe, no un tap

  const mostrada = vista ?? seleccion;
  const o = obra(mostrada);
  const idx = mostrada === seleccion ? imagen : 0;
  const n = o.imagenes?.length ?? 0;

  const elegir = useCallback(id => {
    setSeleccion(id); setVista(null); setImagen(0); setAbierta(null);
    try { history.replaceState(null, '', id === INICIO ? location.pathname : '#' + id); } catch {}
  }, []);

  useEffect(() => {
    const mq = matchMedia('(max-width: 899px)');
    const ver = () => setMovil(mq.matches);
    ver(); mq.addEventListener('change', ver);
    const h = location.hash.slice(1);
    if (obra(h)) setSeleccion(h);
    else if (h === 'acerca' || h === 'cv') setAbierta(h);
    return () => mq.removeEventListener('change', ver);
  }, []);

  useEffect(() => { if (abierta) setUltima(abierta); }, [abierta]);

  // En móvil el desplegable ocupa la pantalla: la página de detrás no se mueve
  useEffect(() => {
    document.body.style.overflow = abierta && movil ? 'hidden' : '';
  }, [abierta, movil]);

  useEffect(() => {
    const tecla = e => {
      if (zoom) {
        const m = zoom.lista.length;
        if (e.key === 'Escape') setZoom(null);
        if (m > 1 && e.key === 'ArrowLeft') setZoom(z => ({ ...z, i: (z.i - 1 + m) % m }));
        if (m > 1 && e.key === 'ArrowRight') setZoom(z => ({ ...z, i: (z.i + 1) % m }));
      } else if (e.key === 'Escape') setAbierta(null);
    };
    addEventListener('keydown', tecla);
    return () => removeEventListener('keydown', tecla);
  }, [zoom]);

  const ampliarAcerca = () => setZoom({ lista: [ACERCA.foto], i: 0, alt: 'Estefanía Viyella' });
  const alternar = id => { setVista(null); setAbierta(a => (a === id ? null : id)); };
  const contenido = id => (
    <>
      {id === 'obras' && <ListaObras seleccion={seleccion} onElegir={elegir} />}
      {id === 'acerca' && <Acerca onAmpliar={ampliarAcerca} />}
      {id === 'cv' && <CVColumnas />}
    </>
  );

  return (
    <div className="sitio" data-panel={abierta && !movil ? '' : undefined} style={{ '--panel': abierta && !movil ? ANCHO_PANEL[abierta] : '0px' }}>
      <a className="nombre" href="/" onClick={e => { e.preventDefault(); elegir(INICIO); }}>Estefanía Viyella</a>

      {/* ───────── Obra ───────── */}
      <main className="escena" aria-live="polite">
        {/* deslizar el dedo a izquierda o derecha pasa a la foto siguiente o anterior */}
        <figure className="visor"
          onTouchStart={e => { toque.current = e.touches[0].clientX; }}
          onTouchEnd={e => {
            const x0 = toque.current; toque.current = null;
            if (x0 == null || n < 2) return;
            const dx = e.changedTouches[0].clientX - x0;
            if (Math.abs(dx) > 40) setImagen(i => (i + (dx < 0 ? 1 : -1) + n) % n);
          }}>
          {o.imagenes ? (
            <Obra key={o.id + idx} src={o.imagenes[idx][0]} w={o.imagenes[idx][1]} h={o.imagenes[idx][2]} alt={o.titulo}
              onClick={() => setZoom({ lista: o.imagenes.map(([s]) => s), i: idx, alt: o.titulo })} />
          ) : (
            <div className="hueco obra-img" style={{ '--r': o.hueco[1] / o.hueco[0], aspectRatio: `${o.hueco[0]} / ${o.hueco[1]}` }} />
          )}
          <div className="flechas" style={{ visibility: n > 1 && !vista ? 'visible' : 'hidden' }}>
            <button type="button" aria-label="Imagen anterior" onClick={() => setImagen((imagen - 1 + n) % n)}>←</button>
            <button type="button" aria-label="Imagen siguiente" onClick={() => setImagen((imagen + 1) % n)}>→</button>
          </div>
        </figure>
        <p className="ficha">{fichaDe(o)}</p>
      </main>

      {/* ───────── Escritorio: pestañas verticales a la derecha ───────── */}
      <aside className="lateral" aria-label="Menú">
        {SECCIONES.map(([id, titulo]) => (
          <Fragment key={id}>
            <button type="button" className={'pestana' + (abierta === id ? ' abierta' : '')} aria-expanded={abierta === id} onClick={() => alternar(id)}>
              <span className="pestana-texto">{titulo}</span><span aria-hidden="true">{abierta === id ? '−' : '+'}</span>
            </button>
            {/* siempre montado: abrir y cerrar es animar su ancho */}
            <div className={'panel panel-' + id + (abierta === id && !movil ? ' abierto' : '')} inert={abierta !== id || movil}>
              <div className="panel-interior">{contenido(id)}</div>
            </div>
          </Fragment>
        ))}
      </aside>

      {/* ───────── Móvil: franjas abajo que se despliegan a pantalla completa ───────── */}
      <nav className="menu" aria-label="Menú">
        {SECCIONES.map(([id, titulo]) => (
          <button key={id} type="button" className="franja" onClick={() => setAbierta(id)}>
            <span>{titulo}</span><span aria-hidden="true">+</span>
          </button>
        ))}
        <div className="pie-movil">{REDES.map(enlace)}</div>
      </nav>
      {/* velo sobre la página: al hacer clic o tocar fuera del menú, se cierra (en móvil además oscurece un poco) */}
      <div className={'velo' + (abierta ? ' abierto' : '')} aria-hidden="true" onClick={() => setAbierta(null)} />
      {movil && (
        <div className={'desplegable' + (abierta ? ' abierto' : '')} role="dialog" aria-modal="true" inert={!abierta}
          aria-label={SECCIONES.find(s => s[0] === (abierta ?? ultima))[1]}>
          {SECCIONES.map(([id, titulo]) => (
            <section key={id} className={'seccion' + ((abierta ?? ultima) === id ? ' abierta' : '')}>
              <button type="button" className="franja" aria-expanded={abierta === id} onClick={() => alternar(id)}>
                <span>{titulo}</span><span aria-hidden="true">{(abierta ?? ultima) === id ? '−' : '+'}</span>
              </button>
              {/* todas montadas: abrir una sección es animar su alto */}
              <div className="contenido" inert={(abierta ?? ultima) !== id}>{contenido(id)}</div>
            </section>
          ))}
        </div>
      )}

      {/* ───────── Imagen ampliada ───────── */}
      {zoom && (
        <div className="zoom" role="dialog" aria-modal="true" aria-label="Imagen ampliada"
          onClick={() => { if (deslizo.current) { deslizo.current = false; return; } setZoom(null); }}
          onTouchStart={e => { toque.current = e.touches[0].clientX; }}
          onTouchEnd={e => {
            // deslizar el dedo pasa a la foto siguiente o anterior (y no cierra la ampliación)
            const x0 = toque.current; toque.current = null;
            const m = zoom.lista.length;
            if (x0 == null || m < 2) return;
            const dx = e.changedTouches[0].clientX - x0;
            if (Math.abs(dx) > 40) { deslizo.current = true; setZoom(z => ({ ...z, i: (z.i + (dx < 0 ? 1 : -1) + m) % m })); }
          }}>
          <div className="zoom-imagen">
            <Image src={'/img/' + zoom.lista[zoom.i]} alt={zoom.alt} fill sizes="100vw" quality={90} style={{ objectFit: 'contain' }}
              className={zoom.lista[zoom.i] === ACERCA.foto ? 'foto-suave' : undefined} />
          </div>
          <button type="button" className="zoom-cerrar" aria-label="Cerrar" autoFocus>Cerrar</button>
          {zoom.lista.length > 1 && (
            <div className="zoom-flechas" onClick={e => e.stopPropagation()}>
              <button type="button" aria-label="Imagen anterior" onClick={() => setZoom(z => ({ ...z, i: (z.i - 1 + z.lista.length) % z.lista.length }))}>←</button>
              <button type="button" aria-label="Imagen siguiente" onClick={() => setZoom(z => ({ ...z, i: (z.i + 1) % z.lista.length }))}>→</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

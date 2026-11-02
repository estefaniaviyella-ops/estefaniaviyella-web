'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { OBRAS, ACERCA, CV, REDES } from '../lib/contenido';

const INICIO = OBRAS[0].id;
const EXTRA = [['acerca', 'Acerca'], ['cv', 'CV']];
const fichaDe = o => `(${o.titulo}). ${o.año}.${o.ficha ? ' ' + o.ficha : ''}`;
const obra = id => OBRAS.find(o => o.id === id);
const enlace = ([texto, url]) => (
  <a key={texto} href={url} target={url.startsWith('http') ? '_blank' : undefined} rel="noopener">{texto}</a>
);
const EntradaCV = ({ e: [t, l, a] }) => <p>{`${t}\n${l}\n${a}`}</p>;

// Filas del índice, compartidas por escritorio y móvil
function Filas({ seleccion, onElegir, onPasar }) {
  const fila = (id, titulo, dato) => (
    <li key={id} className={id === seleccion ? 'sel' : undefined} onMouseOver={onPasar && (() => onPasar(id))}>
      <a href={'#' + id} onClick={e => { e.preventDefault(); onElegir(id); }}>
        <span className="titulo">{titulo}</span><span>{dato}</span>
      </a>
    </li>
  );
  return (
    <>
      <div className="cabecera"><span>Título</span><span>Año</span></div>
      <ul className="filas">{OBRAS.map(o => fila(o.id, `(${o.titulo})`, o.año))}</ul>
      <ul className="filas extra">{EXTRA.map(([id, t]) => fila(id, t, '→'))}</ul>
    </>
  );
}

function CVColumnas() {
  const col = (...bloques) => (
    <div className="cv-col">
      {bloques.map(([titulo, items], i) => (
        <div key={titulo + i} className="cv-bloque">
          <h3>{titulo}</h3>
          {items.map(e => <EntradaCV key={e[0]} e={e} />)}
        </div>
      ))}
    </div>
  );
  const col2 = CV['Exposiciones colectivas'], mitad = Math.ceil(col2.length / 2);
  return (
    <section className="cv-escritorio">
      {col(['Exposiciones individuales', CV['Exposiciones individuales']], ['Ferias', CV['Ferias']])}
      {col(['Exposiciones colectivas', col2.slice(0, mitad)])}
      {col([' ', col2.slice(mitad)])}
      {col(['Educación', CV['Educación']], ['Reconocimientos', CV['Reconocimientos']])}
    </section>
  );
}

// Imágenes de una obra en móvil: caja fija y flechas
function Carrusel({ o, onAmpliar, arriba }) {
  const [i, setI] = useState(0);
  const n = o.imagenes.length;
  const alto = Math.max(...o.imagenes.map(([, w, h]) => h / w));
  return (
    <>
      <div className="caja" style={{ aspectRatio: `1 / ${alto}` }}>
        {o.imagenes.map(([src], k) => (
          <div key={src} className={'capa' + (k === i ? ' activa' : '')} onClick={() => onAmpliar(o, k)}>
            {/* las obras del principio se piden al momento; el resto, al acercarse */}
            <Image src={'/img/' + src} alt={o.titulo} fill sizes="100vw" style={{ objectFit: 'contain' }}
              loading={arriba && k === 0 ? 'eager' : 'lazy'} fetchPriority={arriba && k === 0 ? 'high' : 'auto'} />
          </div>
        ))}
      </div>
      {n > 1 && (
        <div className="flechas">
          <button type="button" aria-label="Imagen anterior" onClick={() => setI((i - 1 + n) % n)}>←</button>
          <button type="button" aria-label="Imagen siguiente" onClick={() => setI((i + 1) % n)}>→</button>
        </div>
      )}
    </>
  );
}

export default function Sitio() {
  const [seleccion, setSeleccion] = useState(INICIO);
  const [vista, setVista] = useState(null);        // obra bajo el ratón en el índice
  const [imagen, setImagen] = useState(0);
  const [indiceAbierto, setIndiceAbierto] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [zoom, setZoom] = useState(null);          // { lista, i, alt }
  const [conRaton, setConRaton] = useState(false);

  const mostrada = vista ?? seleccion;
  const o = obra(mostrada);

  const elegir = useCallback(id => {
    setSeleccion(id); setVista(null); setImagen(0); setIndiceAbierto(false);
    window.scrollTo(0, 0);
    try { history.replaceState(null, '', id === INICIO ? location.pathname : '#' + id); } catch {}
  }, []);

  useEffect(() => {
    setConRaton(matchMedia('(hover: hover)').matches);
    const h = location.hash.slice(1);
    if (obra(h) || h === 'acerca' || h === 'cv') { setSeleccion(h); }
  }, []);

  useEffect(() => {
    if (!zoom) return;
    const tecla = e => {
      if (e.key === 'Escape') setZoom(null);
      const n = zoom.lista.length;
      if (n > 1 && e.key === 'ArrowLeft') setZoom(z => ({ ...z, i: (z.i - 1 + n) % n }));
      if (n > 1 && e.key === 'ArrowRight') setZoom(z => ({ ...z, i: (z.i + 1) % n }));
    };
    addEventListener('keydown', tecla);
    return () => removeEventListener('keydown', tecla);
  }, [zoom]);

  const ampliarObra = (ob, i) => setZoom({ lista: ob.imagenes.map(([s]) => s), i, alt: ob.titulo });
  const ampliarAcerca = () => setZoom({ lista: [ACERCA.foto], i: 0, alt: 'Estefanía Viyella' });
  const pasar = id => { if (indiceAbierto) { setVista(id); setImagen(0); } };
  const irA = id => { setMenuAbierto(false); document.getElementById('m-' + id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const alInicio = e => {
    e.preventDefault();
    if (matchMedia('(max-width: 899px)').matches) { setMenuAbierto(false); scrollTo({ top: 0, behavior: 'smooth' }); }
    else elegir(INICIO);
  };

  return (
    <>
      <a className="nombre" href="/" onClick={alInicio}>Estefanía Viyella</a>

      {/* ───────── Escritorio ───────── */}
      <main className="escritorio" aria-live="polite">
        {mostrada === 'cv' ? <CVColumnas /> : (
          <>
            <figure className="visor">
              <div className="visor-imagen">
                {mostrada === 'acerca' ? (
                  <Image key="acerca" className="acerca" src={'/img/' + ACERCA.foto} alt="Estefanía Viyella"
                    width={439} height={659} sizes="25vw" onClick={ampliarAcerca} style={{ height: '40vh', width: 'auto' }} />
                ) : o.imagenes ? (
                  <Image key={o.id + imagen} src={'/img/' + o.imagenes[imagen][0]} alt={o.titulo}
                    width={o.imagenes[imagen][1]} height={o.imagenes[imagen][2]} sizes="(min-width: 900px) 60vw, 100vw"
                    priority={o.id === INICIO} onClick={() => ampliarObra(o, imagen)}
                    style={{ height: `min(72vh, calc((73vw - 322px) * ${o.imagenes[imagen][2] / o.imagenes[imagen][1]}))`, width: 'auto' }} />
                ) : (
                  <div className="hueco" style={{ aspectRatio: `${o.hueco[0]} / ${o.hueco[1]}` }} />
                )}
                <div className="flechas" style={{ visibility: o?.imagenes?.length > 1 ? 'visible' : 'hidden' }}>
                  {o?.imagenes?.length > 1 && (
                    <>
                      <button type="button" aria-label="Imagen anterior" onClick={() => setImagen((imagen - 1 + o.imagenes.length) % o.imagenes.length)}>←</button>
                      <button type="button" aria-label="Imagen siguiente" onClick={() => setImagen((imagen + 1) % o.imagenes.length)}>→</button>
                    </>
                  )}
                </div>
              </div>
            </figure>
            {mostrada === 'acerca'
              ? <div className="largo"><p className="texto-largo">{ACERCA.texto}</p></div>
              : <p className="ficha">{fichaDe(o)}</p>}
          </>
        )}
      </main>

      <aside
        className={'indice' + (indiceAbierto ? ' abierto' : '')}
        aria-label="Obras seleccionadas"
        onClick={() => { if (!indiceAbierto) setIndiceAbierto(true); }}
        onMouseEnter={conRaton ? () => setIndiceAbierto(true) : undefined}
        onMouseLeave={conRaton ? () => { setIndiceAbierto(false); setVista(null); } : undefined}
      >
        <button type="button" className="indice-flecha" aria-label={indiceAbierto ? 'Cerrar índice' : 'Abrir índice'}
          onClick={e => { e.stopPropagation(); setIndiceAbierto(!indiceAbierto); }}>
          {indiceAbierto ? '→' : '←'}
        </button>
        <p className="indice-titulo">Obras seleccionadas</p>
        <div className="indice-lista" onMouseLeave={() => setVista(null)}>
          <Filas seleccion={seleccion} onElegir={id => indiceAbierto && elegir(id)} onPasar={pasar} />
        </div>
        <nav className="redes" onClick={e => e.stopPropagation()}>{REDES.map(enlace)}</nav>
      </aside>

      {/* ───────── Móvil ───────── */}
      <div className="movil">
        <div className="feed">
          {OBRAS.map((ob, n) => (
            <section key={ob.id} className="entrada" id={'m-' + ob.id}>
              {ob.imagenes ? <Carrusel o={ob} onAmpliar={ampliarObra} arriba={n < 2} /> : (
                <div className="caja"><div className="hueco" style={{ aspectRatio: `${ob.hueco[0]} / ${ob.hueco[1]}` }} /></div>
              )}
              <p>{fichaDe(ob)}</p>
            </section>
          ))}
          <section className="entrada" id="m-acerca">
            <Image className="foto" src={'/img/' + ACERCA.foto} alt="Estefanía Viyella" width={439} height={659} sizes="167px" onClick={ampliarAcerca} />
            <p>{ACERCA.texto}</p>
          </section>
          <section className="entrada" id="m-cv">
            {Object.entries(CV).map(([t, items], i) => (
              <div key={t} className="cv-bloque">
                {i > 0 && <div className="espacio" />}
                <h3>{t}</h3>
                {items.map(e => <EntradaCV key={e[0]} e={e} />)}
              </div>
            ))}
          </section>
          <nav className="pie">
            {REDES.map(enlace)}
            <a href="#cv" onClick={e => { e.preventDefault(); irA('cv'); }}>CV</a>
          </nav>
        </div>

        <div className={'menu-movil' + (menuAbierto ? ' abierto' : '')} aria-label="Obras seleccionadas">
          <button type="button" className="menu-cabecera" onClick={() => setMenuAbierto(!menuAbierto)}>
            <span>Obras seleccionadas</span><span className="menu-flecha">{menuAbierto ? '↓' : '↑'}</span>
          </button>
          <div className="menu-lista">
            <Filas seleccion={null} onElegir={irA} />
            <nav className="redes">
              {REDES.map(enlace)}
              <a href="#cv" onClick={e => { e.preventDefault(); irA('cv'); }}>CV</a>
            </nav>
          </div>
        </div>
        {menuAbierto && <div className="menu-fuera" onClick={() => setMenuAbierto(false)} />}
      </div>

      {/* ───────── Imagen ampliada ───────── */}
      {zoom && (
        <div className="zoom" role="dialog" aria-modal="true" aria-label="Imagen ampliada" onClick={() => setZoom(null)}>
          <div className="zoom-imagen">
            <Image src={'/img/' + zoom.lista[zoom.i]} alt={zoom.alt} fill sizes="100vw" quality={90} style={{ objectFit: 'contain' }} />
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
    </>
  );
}

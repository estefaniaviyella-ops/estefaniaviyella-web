'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { OBRAS, ACERCA, CV, REDES } from '../lib/contenido';

const INICIO = OBRAS[0].id;
const SECCIONES = [['obras', 'Obras seleccionadas'], ['acerca', 'Acerca'], ['cv', 'CV']];
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

function ListaObras({ seleccion, onElegir }) {
  const [vista, setVista] = useState(seleccion);
  const o = obra(vista);
  return (
    <div className="obras">
      <div className="lista">
        <div className="cabecera"><span>Título</span><span>Año</span></div>
        <ul className="filas" onMouseLeave={() => setVista(seleccion)}>
          {OBRAS.map(ob => (
            <li key={ob.id} className={ob.id === seleccion ? 'sel' : undefined} onMouseEnter={() => setVista(ob.id)}>
              <a href={'#' + ob.id} onClick={e => { e.preventDefault(); onElegir(ob.id); }}>
                <span className="titulo">({ob.titulo})</span><span>{ob.año}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="vista-previa" aria-hidden="true">
        {o.imagenes
          ? <Image key={o.id} src={'/img/' + o.imagenes[0][0]} alt="" width={o.imagenes[0][1]} height={o.imagenes[0][2]} sizes="30vw" />
          : <div className="hueco" style={{ aspectRatio: `${o.hueco[0]} / ${o.hueco[1]}` }} />}
        <p>{fichaDe(o)}</p>
      </div>
    </div>
  );
}

function Acerca({ onAmpliar }) {
  return (
    <div className="acerca">
      <Image className="foto" src={'/img/' + ACERCA.foto} alt="Estefanía Viyella" width={439} height={659} sizes="220px" onClick={onAmpliar} />
      <p>{ACERCA.texto}</p>
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
  const col2 = CV['Exposiciones colectivas'], mitad = Math.ceil(col2.length / 2);
  return (
    <div className="cv">
      <div className="cv-col">{bloque(['Exposiciones individuales', CV['Exposiciones individuales']])}{bloque(['Ferias', CV['Ferias']])}</div>
      <div className="cv-col">{bloque(['Exposiciones colectivas', col2.slice(0, mitad)])}</div>
      <div className="cv-col cv-sigue">{bloque([' ', col2.slice(mitad)])}</div>
      <div className="cv-col">{bloque(['Educación', CV['Educación']])}{bloque(['Reconocimientos', CV['Reconocimientos']])}</div>
    </div>
  );
}

export default function Sitio() {
  const [seleccion, setSeleccion] = useState(INICIO);
  const [imagen, setImagen] = useState(0);
  const [abierta, setAbierta] = useState(null);   // sección desplegada: 'obras' | 'acerca' | 'cv' | null
  const [zoom, setZoom] = useState(null);         // { lista, i, alt }

  const o = obra(seleccion);
  const n = o.imagenes?.length ?? 0;

  const elegir = useCallback(id => {
    setSeleccion(id); setImagen(0); setAbierta(null);
    try { history.replaceState(null, '', id === INICIO ? location.pathname : '#' + id); } catch {}
  }, []);

  useEffect(() => {
    const h = location.hash.slice(1);
    if (obra(h)) setSeleccion(h);
    else if (h === 'acerca' || h === 'cv') setAbierta(h);
  }, []);

  // Con un desplegable abierto, la página de detrás no se mueve
  useEffect(() => {
    document.body.style.overflow = abierta ? 'hidden' : '';
  }, [abierta]);

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
  const alternar = id => setAbierta(a => (a === id ? null : id));

  return (
    <>
      <a className="nombre" href="/" onClick={e => { e.preventDefault(); elegir(INICIO); }}>Estefanía Viyella</a>

      {/* ───────── Obra seleccionada ───────── */}
      <main className="escena" aria-live="polite">
        <figure className="visor">
          {o.imagenes ? (
            <Obra key={o.id + imagen} src={o.imagenes[imagen][0]} w={o.imagenes[imagen][1]} h={o.imagenes[imagen][2]} alt={o.titulo}
              onClick={() => setZoom({ lista: o.imagenes.map(([s]) => s), i: imagen, alt: o.titulo })} />
          ) : (
            <div className="hueco obra-img" style={{ '--r': o.hueco[1] / o.hueco[0], aspectRatio: `${o.hueco[0]} / ${o.hueco[1]}` }} />
          )}
          <div className="flechas" style={{ visibility: n > 1 ? 'visible' : 'hidden' }}>
            <button type="button" aria-label="Imagen anterior" onClick={() => setImagen((imagen - 1 + n) % n)}>←</button>
            <button type="button" aria-label="Imagen siguiente" onClick={() => setImagen((imagen + 1) % n)}>→</button>
          </div>
        </figure>
        <p className="ficha">{fichaDe(o)}</p>
      </main>

      {/* ───────── Menú de franjas, pegado abajo ───────── */}
      <nav className="menu" aria-label="Menú">
        <div className="contacto">
          <span className="etiqueta">Contacto</span>
          {REDES.map(enlace)}
        </div>
        {SECCIONES.map(([id, titulo]) => (
          <button key={id} type="button" className="franja" onClick={() => setAbierta(id)}>
            <span>{titulo}</span><span aria-hidden="true">+</span>
          </button>
        ))}
      </nav>

      {/* ───────── Desplegable a pantalla completa ───────── */}
      {abierta && (
        <div className="desplegable" role="dialog" aria-modal="true" aria-label={SECCIONES.find(s => s[0] === abierta)[1]}>
          <button type="button" className="cerrar" onClick={() => setAbierta(null)}>Cerrar <span aria-hidden="true">×</span></button>
          {SECCIONES.map(([id, titulo]) => (
            <section key={id} className={'seccion' + (abierta === id ? ' abierta' : '')}>
              <button type="button" className="franja" aria-expanded={abierta === id} onClick={() => alternar(id)}>
                <span>{titulo}</span><span aria-hidden="true">{abierta === id ? '−' : '+'}</span>
              </button>
              {abierta === id && (
                <div className="contenido">
                  {id === 'obras' && <ListaObras seleccion={seleccion} onElegir={elegir} />}
                  {id === 'acerca' && <Acerca onAmpliar={ampliarAcerca} />}
                  {id === 'cv' && <CVColumnas />}
                </div>
              )}
            </section>
          ))}
        </div>
      )}

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

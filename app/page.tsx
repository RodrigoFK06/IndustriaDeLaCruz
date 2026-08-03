import Image from 'next/image'
import {
  empresa,
  hero,
  puertas,
  capacidades,
  sectores,
  prueba,
  solicitud,
  contacto,
  descripcionPropia,
} from '@/lib/site-content'
import Nav from '@/components/nav'
import Revelar from '@/components/revelar'
import Solicitud from '@/components/solicitud'
import BarraAccion from '@/components/barra-accion'
import Verificar from '@/components/verificar'

/* ============================================================================
   RITMO
   Cada sección tiene una forma distinta a propósito. Repetir
   "antetítulo + H2 gigante + párrafo + botón" siete veces es lo que hace que
   una web se sienta plantilla aunque esté bien hecha.

   1 · hero a sangre           foto, sin antetítulo
   2 · declaración             solo tipografía, centrada, sin foto ni botón
   3 · capacidad               cifras, oscuro, asimétrico
   4 · foto ancha              imagen sola, respiro
   5 · servicios               índice denso a dos columnas
   6 · referencias             una cita grande + dos chicas
   7 · cotizador               el momento de firma
   8 · contacto                datos planos, útiles
   ============================================================================ */

export default function Page() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-amarillo focus:px-5 focus:py-2.5 focus:font-semibold focus:text-noche"
      >
        Saltar al contenido
      </a>

      {/* ── 1 · HERO ─────────────────────────────────────────────────── */}
      <header className="relative isolate bg-noche">
        <Nav />

        <div className="relative min-h-[88svh] w-full sm:min-h-[86svh]">
          {/* Imagen de referencia con licencia, NO su planta: un plato de torno
              de gran diámetro con un eje montado. Muestra la escala del oficio
              sin afirmar instalaciones que no se pudieron verificar. Las fotos
              suyas van rotuladas más abajo, en «Trabajos en planta». */}
          <Image
            src="/img/hero-torno.jpg"
            alt="Plato de torno de gran diámetro con un eje de acero montado entre puntos en un taller de mecanizado pesado"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[58%_center] sm:object-center"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-noche via-noche/78 to-noche/25"
          />

          <div className="env relative flex min-h-[88svh] flex-col justify-end pb-14 sm:min-h-[86svh] sm:pb-20">
            <h1 className="max-w-[15ch] text-[3.1rem] leading-[0.92] text-white sm:text-[4.6rem] lg:text-[6.2rem]">
              {hero.titulo}
            </h1>

            <p className="cuerpo mt-6 max-w-[46ch] text-[17px] text-sobre-noche sm:text-[21px]">
              {hero.subtitulo}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#cotizar"
                className="inline-flex h-14 items-center bg-amarillo px-8 text-[16px] font-semibold text-noche transition-opacity hover:opacity-90"
              >
                Pedir cotización
              </a>
              <a
                href="#capacidad"
                className="inline-flex h-14 items-center border border-white/35 px-8 text-[16px] font-medium text-white transition-colors hover:border-amarillo hover:text-amarillo"
              >
                Qué entra en el torno
              </a>
            </div>
          </div>
        </div>
      </header>

      <main id="contenido">
        {/* ── 2 · DECLARACIÓN ──────────────────────────────────────────
            Solo tipografía. Sin foto, sin botón, sin antetítulo. Es su propia
            descripción, textual, y funciona como respiro después del hero. */}
        <section className="env py-24 sm:py-36">
          <p className="mx-auto max-w-[24ch] text-center font-[family-name:var(--font-titulo)] text-[2rem] leading-[1.08] font-bold text-tinta sm:text-[3.2rem] lg:text-[3.8rem]">
            «{descripcionPropia}»
          </p>
          <p className="mt-8 text-center text-[14.5px] text-tinta-2">
            Industria de la Cruz del Perú · RUC {empresa.ruc} · Villa El Salvador, Lima ·{' '}
            {empresa.resena.puntaje} ★ en Google ({empresa.resena.total} opiniones)
          </p>
        </section>

        {/* ── 3 · CAPACIDAD ───────────────────────────────────────────
            Oscuro, cifras grandes, asimétrico: el título ocupa una columna
            angosta y los números respiran al lado. */}
        <section id="capacidad" className="bg-noche py-20 text-white sm:py-28">
          <div className="env grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <h2 className="text-[2.3rem] sm:text-[3rem]">{capacidades.titulo}</h2>
              <p className="cuerpo mt-5 max-w-[38ch] text-[16.5px] text-sobre-noche sm:text-[18px]">
                {capacidades.entradilla}
              </p>
            </div>

            <dl className="grid gap-10 sm:grid-cols-3 sm:gap-8">
              <div className="border-t-2 border-amarillo pt-5">
                <dd className="font-[family-name:var(--font-titulo)] text-[2.6rem] leading-none font-extrabold text-white sm:text-[3.2rem]">
                  1,5–6 m
                </dd>
                <dt className="cuerpo mt-3 text-[15px] text-sobre-noche">
                  Entre puntos. Es el largo máximo de pieza que entra al torno.
                </dt>
              </div>
              <div className="border-t-2 border-white/25 pt-5">
                <dd className="font-[family-name:var(--font-titulo)] text-[2.6rem] leading-none font-extrabold text-white sm:text-[3.2rem]">
                  1 500
                  <Verificar nota="unidad del volteo — su web decía 1,500 sin unidad" />
                </dd>
                <dt className="cuerpo mt-3 text-[15px] text-sobre-noche">Volteo máximo.</dt>
              </div>
              <div className="border-t-2 border-white/25 pt-5">
                <dd className="font-[family-name:var(--font-titulo)] text-[2.6rem] leading-none font-extrabold text-white sm:text-[3.2rem]">
                  CNC
                </dd>
                <dt className="cuerpo mt-3 text-[15px] text-sobre-noche">
                  Centro de mecanizado, además del torno paralelo.
                </dt>
              </div>
            </dl>
          </div>

          <div className="env mt-14">
            <p className="max-w-[52ch] font-[family-name:var(--font-titulo)] text-[1.5rem] leading-[1.15] font-bold text-amarillo sm:text-[2rem]">
              {capacidades.pie}
            </p>
          </div>
        </section>

        {/* ── 4 · FOTO ANCHA ──────────────────────────────────────────
            Imagen sola, a sangre, sin texto encima. Puro respiro entre la
            sección de cifras y la de trabajos. Referencia con licencia. */}
        <section aria-label="Mecanizado de piezas grandes" className="bg-noche">
          <Revelar>
            <figure className="relative aspect-16/10 w-full sm:aspect-21/9">
              <Image
                src="/img/eje-grande.jpg"
                alt="Eje de acero de gran diámetro con dos discos mecanizados, apoyado en el piso de un taller de mecanizado"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
            </figure>
          </Revelar>
        </section>

        {/* ── 4b · TRABAJOS EN PLANTA ─────────────────────────────────
            El bloque de prueba. Estas tres SÍ son suyas y van rotuladas una
            por una. Separarlas del stock no es solo honestidad: le muestra al
            dueño exactamente qué fotos tiene que mandarnos para reemplazar
            las de referencia. */}
        <section aria-labelledby="tit-trabajos" className="py-20 sm:py-28">
          <div className="env">
            <h2 id="tit-trabajos" className="max-w-[20ch] text-[2.1rem] sm:text-[2.8rem]">
              Trabajos hechos en planta
            </h2>
            <p className="cuerpo mt-4 max-w-[48ch] text-[16.5px] text-tinta-2">
              Estas tres fotos son de la empresa, no de banco de imágenes.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-3 sm:gap-5">
              {[
                {
                  src: '/img/mezcladora.jpg',
                  alt: 'Mezcladora de concreto fabricada en el taller, con tolva amarilla y carenado azul, lista para entrega',
                  pie: 'Mezcladora de concreto fabricada completa en planta',
                },
                {
                  src: '/img/torno-plato.jpg',
                  alt: 'Plato de cuatro mordazas de torno sujetando una pieza recién mecanizada, con viruta de acero sobre la bancada',
                  pie: 'Montaje en plato de cuatro mordazas',
                },
                {
                  src: '/img/pieza-torneada.jpg',
                  alt: 'Pieza cilíndrica de acero recién torneada, con canal perimetral y agujero pasante',
                  pie: 'Pieza torneada a medida, acabado directo de máquina',
                },
              ].map((f, i) => (
                <Revelar key={f.src} retraso={i * 110}>
                  <figure>
                    <Image
                      src={f.src}
                      alt={f.alt}
                      width={1200}
                      height={1500}
                      sizes="(min-width: 640px) 31vw, 100vw"
                      className="aspect-4/5 w-full object-cover"
                    />
                    <figcaption className="cuerpo mt-3 text-[14.5px] text-tinta-2">
                      {f.pie}
                      <span className="mt-0.5 block font-semibold text-tinta">
                        Foto de la empresa
                      </span>
                    </figcaption>
                  </figure>
                </Revelar>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5 · SERVICIOS ───────────────────────────────────────────
            Índice denso a dos columnas. Sin antetítulo ni botón: la lista
            misma es el contenido. */}
        <section id="servicios" className="py-20 sm:py-28">
          <div className="env">
            <h2 className="max-w-[18ch] text-[2.3rem] sm:text-[3.2rem]">
              La pieza que ya no consigues, la hacemos.
            </h2>

            <div className="mt-14 grid gap-x-16 gap-y-12 lg:grid-cols-2">
              {puertas.map((p) => (
                <div key={p.id} id={p.id}>
                  <h3 className="font-[family-name:var(--font-titulo)] text-[1.4rem] font-bold text-tinta sm:text-[1.65rem]">
                    {p.titulo}
                  </h3>
                  <p className="cuerpo mt-3 max-w-[46ch] text-[16px] text-tinta-2">
                    {p.detalle}
                  </p>
                  <ul className="mt-6 divide-y divide-tinta/12 border-t border-tinta/12">
                    {p.items.map((it) => (
                      <li key={it} className="py-3 text-[16px] leading-snug text-tinta">
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Sectores como fila compacta, no como otra tanda de tarjetas. */}
            <div className="mt-16 border-t border-tinta/12 pt-10">
              <p className="cuerpo max-w-[52ch] text-[16.5px] text-tinta-2">
                {sectores.entradilla}
              </p>
              <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                {sectores.lista.map((s) => (
                  <div key={s.nombre}>
                    <dt className="text-[16px] font-semibold text-tinta">{s.nombre}</dt>
                    <dd className="cuerpo mt-1.5 text-[15px] text-tinta-2">{s.detalle}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── 6 · REFERENCIAS ─────────────────────────────────────────
            Una cita grande arriba y dos chicas debajo, con la foto de la pieza
            al costado. Distinto de la fila de tres tarjetas iguales. */}
        <section id="referencias" className="bg-dia-2 py-20 sm:py-28">
          <div className="env grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-20">
            <div>
              <blockquote className="font-[family-name:var(--font-titulo)] text-[1.7rem] leading-[1.12] font-bold text-tinta sm:text-[2.3rem]">
                «{prueba.citas[0].texto}»
              </blockquote>
              <cite className="mt-4 block text-[15px] text-tinta-2 not-italic">
                {prueba.citas[0].autor}
              </cite>

              <div className="mt-12 grid gap-8 border-t border-tinta/12 pt-10 sm:grid-cols-2">
                {prueba.citas.slice(1).map((c) => (
                  <div key={c.autor}>
                    <blockquote className="cuerpo text-[16px] text-tinta">
                      «{c.texto}»
                    </blockquote>
                    <cite className="mt-2.5 block text-[14px] text-tinta-2 not-italic">
                      {c.autor}
                    </cite>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-[13.5px] text-tinta-2">
                {prueba.entradilla} {prueba.nota}
              </p>
            </div>

            {/* La calificación como dato duro, no como estrellitas decorativas.
                Es el activo más fuerte que tienen y merece leerse como cifra. */}
            <div className="border-t-2 border-amarillo pt-6 lg:border-t-0 lg:border-l-2 lg:pt-0 lg:pl-10">
              <p className="font-[family-name:var(--font-titulo)] text-[4.5rem] leading-none font-extrabold text-tinta sm:text-[6rem]">
                {empresa.resena.puntaje}
              </p>
              <p className="cuerpo mt-3 max-w-[26ch] text-[16px] text-tinta-2">
                de calificación en Google, sobre {empresa.resena.total} opiniones. Ni una
                sola por debajo de cinco estrellas.
              </p>
            </div>
          </div>
        </section>

        {/* ── 7 · COTIZADOR ───────────────────────────────────────────
            El momento de firma del sitio. No hay scroll coreografiado en
            ningún lado justamente para que la atención caiga acá. */}
        <section id="cotizar" className="bg-noche py-20 text-white sm:py-28">
          <div className="env">
            <h2 className="max-w-[16ch] text-[2.3rem] sm:text-[3.2rem]">{solicitud.titulo}</h2>
            <p className="cuerpo mt-5 max-w-[54ch] text-[17px] text-sobre-noche sm:text-[19px]">
              {solicitud.entradilla}
            </p>

            <div className="mt-12">
              <Solicitud />
            </div>
          </div>
        </section>

        {/* ── 8 · CONTACTO ────────────────────────────────────────────
            Datos planos y densos. Sin titular gigante: acá el visitante viene
            a buscar un dato concreto, no a que lo convenzan. */}
        <section id="contacto" className="py-20 sm:py-24">
          <div className="env">
            <h2 className="text-[1.8rem] sm:text-[2.2rem]">{contacto.titulo}</h2>
            <p className="cuerpo mt-4 max-w-[52ch] text-[16.5px] text-tinta-2">
              {contacto.entradilla}
            </p>

            <dl className="mt-10 grid gap-x-10 gap-y-8 border-t border-tinta/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <dt className="text-[13.5px] text-tinta-2">Dirección</dt>
                <dd className="cuerpo mt-1.5 text-[16px] text-tinta">
                  {empresa.direccion}
                  <br />
                  {empresa.direccionRef}
                  <br />
                  {empresa.distrito}, {empresa.ciudad}
                </dd>
              </div>
              <div>
                <dt className="text-[13.5px] text-tinta-2">Teléfono</dt>
                <dd className="mt-1.5 text-[16px]">
                  <a
                    href={`tel:+${empresa.telefonoE164}`}
                    className="font-semibold text-tinta underline decoration-amarillo decoration-2 underline-offset-4"
                  >
                    {empresa.telefono}
                  </a>
                </dd>
                <dd className="mt-3 text-[16px]">
                  <a
                    href={empresa.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-tinta-2 underline underline-offset-4 hover:text-tinta"
                  >
                    {contacto.llegar} →
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[13.5px] text-tinta-2">Horario</dt>
                <dd className="cuerpo mt-1.5 text-[16px] text-tinta">
                  {empresa.horario.map((h) => (
                    <span key={h.dias} className="block">
                      {h.dias} {h.horas}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-[13.5px] text-tinta-2">Razón social</dt>
                <dd className="cuerpo mt-1.5 text-[16px] text-tinta">
                  {empresa.razonSocial}
                  <br />
                  RUC {empresa.ruc}
                  <br />
                  En actividad desde 2016
                </dd>
              </div>
            </dl>

            {/* Divulgación de fotografía. Va en el sitio, no escondida en un
                documento aparte: el dueño tiene que poder distinguir de un
                vistazo qué es suyo y qué es imagen de referencia. */}
            <p className="cuerpo mt-12 max-w-[62ch] border-t border-tinta/15 pt-6 text-[14px] text-tinta-2">
              Sobre las fotos: las tres rotuladas «foto de la empresa» son suyas, tomadas
              de su ficha de Google. Las demás son imágenes de referencia con licencia
              comercial, puestas para mostrar el tipo de trabajo — no son su planta ni sus
              máquinas, y se reemplazan por fotos propias cuando nos las envíe.
            </p>
          </div>
        </section>
      </main>

      <BarraAccion />
    </>
  )
}

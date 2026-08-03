'use client'

import { useMemo, useState } from 'react'
import { empresa, solicitud } from '@/lib/site-content'

/**
 * Solicitud guiada. NO calcula precios.
 *
 * El objetivo es que el mensaje que llega al taller ya traiga lo mínimo para
 * cotizar (qué, cuántos, material, si hay plano, plazo) y se ahorre la ronda
 * de "mándame más datos". Un estimador de costos exigiría inventar tarifas,
 * y este sitio no inventa cifras.
 */

const campos = solicitud.campos

function Campo({
  id,
  etiqueta,
  children,
}: {
  id: string
  etiqueta: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[14px] font-medium text-sobre-noche">
        {etiqueta}
      </label>
      {children}
    </div>
  )
}

const claseControl =
  'h-13 w-full border border-white/25 bg-white/5 px-4 text-[16px] text-white ' +
  'transition-colors hover:border-tinta/45 focus:border-aviso focus:outline-none'

export default function Solicitud() {
  // `as const` en site-content vuelve literales los tipos de las opciones;
  // el estado tiene que aceptar cualquiera de ellas, no solo la primera.
  const [tipo, setTipo] = useState<string>(campos.tipo.opciones[0])
  const [cantidad, setCantidad] = useState('1')
  const [material, setMaterial] = useState<string>(campos.material.opciones[0])
  const [plano, setPlano] = useState<string>(campos.plano.opciones[0])
  const [plazo, setPlazo] = useState<string>(campos.plazo.opciones[0])

  const mensaje = useMemo(() => {
    const n = Number(cantidad)
    const cant = Number.isFinite(n) && n > 0 ? n : 1
    const unidad = cant === 1 ? 'pieza' : 'piezas'

    const partes = [
      `Buenas, quiero cotizar: ${tipo.toLowerCase()}.`,
      `Cantidad: ${cant} ${unidad}.`,
      material === campos.material.opciones[0]
        ? 'Material: no estoy seguro, agradezco su recomendación.'
        : `Material: ${material.toLowerCase()}.`,
      plano === 'No tengo ninguno'
        ? 'No tengo plano ni muestra.'
        : `${plano}.`,
      plazo === 'Es urgente' ? 'El plazo es urgente.' : 'Plazo normal.',
    ]

    return partes.join(' ')
  }, [tipo, cantidad, material, plano, plazo])

  const enlace = `https://wa.me/${empresa.telefonoE164}?text=${encodeURIComponent(mensaje)}`

  return (
    <div className="grid border border-white/15 lg:grid-cols-[1fr_1fr]">
      {/* --- controles --- */}
      <div className="p-6 sm:p-9">
        <div className="flex flex-col gap-4">
          <Campo id="tipo" etiqueta={campos.tipo.etiqueta}>
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className={claseControl}
            >
              {campos.tipo.opciones.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Campo>

          <div className="grid grid-cols-2 gap-4">
            <Campo id="cantidad" etiqueta={campos.cantidad.etiqueta}>
              <input
                id="cantidad"
                type="number"
                inputMode="numeric"
                min={1}
                step={1}
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                placeholder={campos.cantidad.placeholder}
                className={claseControl}
              />
            </Campo>

            <Campo id="plazo" etiqueta={campos.plazo.etiqueta}>
              <select
                id="plazo"
                value={plazo}
                onChange={(e) => setPlazo(e.target.value)}
                className={claseControl}
              >
                {campos.plazo.opciones.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </Campo>
          </div>

          <Campo id="material" etiqueta={campos.material.etiqueta}>
            <select
              id="material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className={claseControl}
            >
              {campos.material.opciones.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Campo>

          <Campo id="plano" etiqueta={campos.plano.etiqueta}>
            <select
              id="plano"
              value={plano}
              onChange={(e) => setPlano(e.target.value)}
              className={claseControl}
            >
              {campos.plano.opciones.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Campo>
        </div>
      </div>

      {/* --- vista previa + envío --- */}
      <div className="flex flex-col justify-between gap-6 border-t border-white/15 p-6 sm:p-9 lg:border-t-0 lg:border-l">
        <div>
          <p className="mb-3 text-[13px] font-semibold text-white/55">
            {solicitud.vistaPrevia}
          </p>

          {/* aria-live: quien usa lector de pantalla tiene que oír el cambio */}
          <p
            aria-live="polite"
            className="cuerpo border-l-2 border-amarillo bg-white/8 p-5 text-[16px] text-white"
          >
            {mensaje}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href={enlace}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 items-center justify-center gap-2.5 bg-whatsapp px-6 text-[16px] font-medium text-white transition-opacity hover:opacity-90"
          >
            <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 fill-current">
              <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.8 15.71a8.2 8.2 0 0 1-5.8 2.4h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.25-4.35c0-4.53 3.7-8.22 8.23-8.22a8.18 8.18 0 0 1 5.82 2.42 8.16 8.16 0 0 1 2.4 5.81c0 4.53-3.69 8.22-8.22 8.22z" />
            </svg>
            {solicitud.cta}
          </a>

          <p className="cuerpo text-[14px] text-sobre-noche">{solicitud.nota}</p>
        </div>
      </div>
    </div>
  )
}

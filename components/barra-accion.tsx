import { empresa } from '@/lib/site-content'

/**
 * Barra de acción pegada abajo, solo en móvil.
 *
 * El visitante llega por WhatsApp, en planta, y muchas veces solo quiere
 * llamar. Que tenga que buscar el número scrolleando es perder la llamada.
 * Abajo y no arriba porque ahí llega el pulgar sin recolocar la mano.
 * `pb-[env(safe-area-inset-bottom)]` evita que la barra de gestos del teléfono
 * se coma los botones.
 */
export default function BarraAccion() {
  const mensaje = 'Buenas, los encontré por su página. Quisiera consultar por un trabajo.'

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-noche/95 px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-sm lg:hidden">
      <div className="flex gap-3">
        <a
          href={`tel:+${empresa.telefonoE164}`}
          className="flex h-13 flex-1 items-center justify-center gap-2 bg-white text-[15.5px] font-medium text-noche"
        >
          <svg viewBox="0 0 24 24" aria-hidden className="h-[18px] w-[18px] fill-current">
            <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          Llamar
        </a>
        <a
          href={`https://wa.me/${empresa.telefonoE164}?text=${encodeURIComponent(mensaje)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-13 flex-1 items-center justify-center gap-2 bg-whatsapp text-[15.5px] font-medium text-white"
        >
          <svg viewBox="0 0 24 24" aria-hidden className="h-[18px] w-[18px] fill-current">
            <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </div>
  )
}

import { empresa, navegacion } from '@/lib/site-content'

/**
 * Navegación flotando sobre la foto del hero, sin fondo propio.
 * La foto habla primero. Nada de barra pegada con blur.
 */
export default function Nav() {
  return (
    <nav className="absolute inset-x-0 top-0 z-30" aria-label="Principal">
      <div className="env flex items-center justify-between gap-4 py-5 sm:py-7">
        <span className="font-[family-name:var(--font-titulo)] text-[17px] leading-none font-bold tracking-[-0.02em] text-white sm:text-[20px]">
          Industria de la Cruz
          <span className="hidden sm:inline"> del Perú</span>
        </span>

        <div className="flex items-center gap-7">
          <div className="hidden items-center gap-7 lg:flex">
            {navegacion.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-[15px] text-white/80 transition-colors hover:text-amarillo"
              >
                {n.label}
              </a>
            ))}
          </div>

          <a
            href={`tel:+${empresa.telefonoE164}`}
            className="bg-amarillo px-4 py-2.5 text-[15px] font-600 text-noche transition-opacity hover:opacity-90 sm:px-5"
          >
            {empresa.telefono}
          </a>
        </div>
      </div>
    </nav>
  )
}

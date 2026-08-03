import { propuesta, empresa } from '@/lib/site-content'

/**
 * Aviso fijo de autoría.
 *
 * Se queda arriba y no se puede cerrar: nadie debe poder confundir esta página
 * con el sitio oficial de la empresa, ni al abrirla, ni al hacer scroll, ni al
 * capturarla para reenviarla por WhatsApp. El ladrillo lo saca del sistema de
 * color del resto para que se lea como una nota pegada encima, no como parte
 * del diseño.
 */
export default function BannerPropuesta() {
  return (
    <div className="sticky top-0 z-50 bg-aviso-tinte">
      <p className="env py-2 text-center text-[12.5px] leading-snug text-aviso sm:text-[13.5px]">
        {propuesta.aviso}
        <span className="hidden sm:inline">
          {' · '}
          <a
            href={`mailto:${propuesta.contactoAutor}?subject=${encodeURIComponent(
              `Propuesta web — ${empresa.razonSocial}`,
            )}`}
            className="font-medium underline underline-offset-2 hover:no-underline"
          >
            Escríbenos
          </a>
        </span>
      </p>
    </div>
  )
}

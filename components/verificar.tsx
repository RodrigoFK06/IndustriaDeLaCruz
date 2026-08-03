/**
 * Marca un dato que NO se pudo verificar contra una fuente.
 *
 * Hace dos cosas a propósito:
 *  1. Deja un comentario real en el HTML servido (`<!-- VERIFICAR: ... -->`),
 *     visible con "ver código fuente". Un comentario JSX no llega al navegador,
 *     así que no sirve para esto.
 *  2. Pinta una marca visible, porque el que revisa la propuesta lee la página,
 *     no el código.
 *
 * Preferimos mandarle una web con tres huecos honestos que una llena de datos
 * inventados sobre su propia empresa.
 */
export default function Verificar({ nota }: { nota: string }) {
  return (
    <>
      <span dangerouslySetInnerHTML={{ __html: `<!-- VERIFICAR: ${nota} -->` }} />
      <sup
        title={`Por verificar: ${nota}`}
        className="ml-1.5 cursor-help align-super text-[11px] font-medium tracking-normal text-white/70 underline decoration-dotted underline-offset-2"
      >
        por confirmar
      </sup>
    </>
  )
}

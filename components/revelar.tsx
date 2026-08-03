'use client'

import { useEffect, useRef } from 'react'

/**
 * Revelado de imagen tipo persiana al entrar en pantalla.
 *
 * Deliberadamente NO es scroll coreografiado con GSAP: la galería pineada que
 * usan las webs grandes del rubro pesa cientos de KB, no funciona bien con el
 * pulgar y se ve igual en todas.
 *
 * REGLA: esto falla en ABIERTO. Una animación decorativa nunca puede dejar una
 * foto invisible. Por eso hay tres redes:
 *   1. si al montar ya está en pantalla, se muestra sin esperar al observer
 *   2. el observer normal para lo que entra al hacer scroll
 *   3. un plazo máximo: pase lo que pase, a los 1.2 s se muestra
 * Y si `prefers-reduced-motion` está activo, el CSS lo deja visible de una.
 */
export default function Revelar({
  children,
  className = '',
  retraso = 0,
}: {
  children: React.ReactNode
  className?: string
  retraso?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const temporizadores: ReturnType<typeof setTimeout>[] = []
    const mostrar = (espera = 0) => {
      temporizadores.push(setTimeout(() => el.classList.add('visible'), espera))
    }

    // 1 · ya visible al cargar
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) mostrar(retraso)

    // 2 · al entrar por scroll
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        mostrar(retraso)
        obs.disconnect()
      },
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' },
    )
    obs.observe(el)

    // 3 · red de seguridad
    mostrar(1200 + retraso)

    return () => {
      obs.disconnect()
      temporizadores.forEach(clearTimeout)
    }
  }, [retraso])

  return (
    <div ref={ref} className={`revelar ${className}`}>
      {children}
    </div>
  )
}

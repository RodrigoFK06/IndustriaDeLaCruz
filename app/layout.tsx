import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { meta } from '@/lib/site-content'
import BannerPropuesta from '@/components/banner-propuesta'

/* Tipografía autohospedada, no Google Fonts.
   Cabinet Grotesk (títulos) tiene detalles propios que se notan a 80 px y
   aguanta el peso sin volverse decorativa. General Sans (cuerpo) es una
   geométrica-humanista muy legible en pantalla chica.
   Ninguna de las dos es un default: ni Inter, ni Archivo, ni Geist, ni Plex.
   Van desde nuestro dominio, así que no hay salto a fonts.gstatic.com. */
const titulo = localFont({
  src: [
    { path: './fonts/Cabinet-700.woff2', weight: '700', style: 'normal' },
    { path: './fonts/Cabinet-800.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--fuente-titulo',
  display: 'swap',
})

const texto = localFont({
  src: [
    { path: './fonts/GeneralSans-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/GeneralSans-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/GeneralSans-600.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--fuente-texto',
  display: 'swap',
})

/**
 * Esto es una propuesta privada, no el sitio oficial de la empresa.
 * El noindex/nofollow no es cosmético: sin él Google puede indexar una web
 * con el nombre de un tercero que nunca la encargó.
 */
export const metadata: Metadata = {
  title: meta.titulo,
  description: meta.descripcion,
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
}

export const viewport: Viewport = {
  themeColor: '#14130f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-PE"
      data-scroll-behavior="smooth"
      className={`${titulo.variable} ${texto.variable} antialiased`}
    >
      <body>
        <BannerPropuesta />
        {children}
      </body>
    </html>
  )
}

import type { MetadataRoute } from 'next'

/**
 * Segunda barrera, además del `<meta name="robots">` del layout.
 *
 * El meta lo respeta el crawler que ya descargó la página; esto le dice que
 * ni la pida. Para una propuesta privada con el nombre de una empresa que no
 * la encargó, las dos capas valen la pena.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', disallow: '/' }],
  }
}

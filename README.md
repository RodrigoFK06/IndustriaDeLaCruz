# Propuesta web — Industria de la Cruz del Perú E.I.R.L.

Propuesta de diseño **no solicitada**, preparada por Árkos para Industria de la Cruz
del Perú E.I.R.L. (Villa El Salvador, Lima).

**No es el sitio oficial de la empresa.** Lleva banner fijo de autoría,
`noindex, nofollow`, un `robots.txt` que bloquea todo, y se sirve desde una URL no
obvia. No debe publicarse como si fuera su web.

🔗 https://propuesta-idcp-a7f3.vercel.app

## Medido en producción

Viewport de 390 px, 4G simulado (4 Mbps / 70 ms RTT), sin caché:

| | Medido | Objetivo |
|---|---|---|
| Peso total | **322 KB** · 16 peticiones | < 1.5 MB |
| Carga completa | **844 ms** | < 3 s |
| LCP | **620 ms** | — |
| Contraste | 11/11 pares pasan AA | — |
| Detector de anti-patrones | 0 hallazgos | — |

## Stack

Next.js 16 (Turbopack) · TypeScript · Tailwind 4 · tipografía autohospedada
(Cabinet Grotesk + General Sans, de Fontshare).

## Dónde se edita

Dos archivos concentran todo lo rebrandeable:

- **`lib/site-content.ts`** — textos, datos, servicios y opciones del cotizador
- **`app/globals.css`** — bloque `@theme` con la paleta y la tipografía

## Regla de contenido

Todo dato sobre la empresa sale de una fuente verificable, trazada en
[`INVESTIGACION.md`](INVESTIGACION.md). Lo que no se pudo verificar lleva marca
visible «por confirmar» y un comentario `<!-- VERIFICAR -->` en el HTML servido.

**No hay estimador de precios**: habría que inventar tarifas. En su lugar el sitio
arma una solicitud de cotización y la manda por WhatsApp con los datos mínimos para
poder responder (qué, cuántos, material, si hay plano, plazo).

## Fotografía

Las tres fotos rotuladas «foto de la empresa» son suyas, tomadas de su ficha pública
de Google. Las otras dos son stock con licencia comercial, puestas como referencia
del tipo de trabajo — **no** son su planta ni sus máquinas. El sitio lo declara en su
propio pie. Detalle en [`public/img/README.md`](public/img/README.md).

## Documentos

- [`ENTREGA.md`](ENTREGA.md) — qué no se pudo verificar, y por qué se cayó su web anterior
- [`INVESTIGACION.md`](INVESTIGACION.md) — cada dato del sitio con su fuente
- [`PRODUCT.md`](PRODUCT.md) — audiencia, objetivo y anti-referencias

## Desarrollo

```bash
npm install
npm run dev
```

Utilidades:

```bash
# capturas y métricas con viewport exacto vía CDP
node scripts/captura.mjs http://localhost:3000/ --w 390 --h 844 --dpr 2 --peso --4g

# bajar fotos de stock a tamaño web
node scripts/redimensionar.mjs entrada.jpg public/img/salida.jpg 2560 0.8
```

#!/usr/bin/env node
/**
 * Baja fotos de stock a tamaño web usando el canvas de Chrome headless.
 *
 * Los originales de Freepik vienen de 8 a 22 MB. Next/Image los optimiza al
 * servir, pero dejarlos así en el repo y en el deploy es peso muerto.
 *
 *   node scripts/redimensionar.mjs <entrada.jpg> <salida.jpg> [ancho] [calidad]
 */

import { spawn } from 'node:child_process'
import { writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find((p) => existsSync(p))

const [entrada, salida, anchoMax = '2400', calidad = '0.82'] = process.argv.slice(2)
if (!entrada || !salida) {
  console.error('Uso: node scripts/redimensionar.mjs <entrada> <salida> [ancho] [calidad]')
  process.exit(1)
}

const PUERTO = 9500 + Math.floor(Number(process.env.OFFSET ?? 0))
const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--allow-file-access-from-files',
    `--remote-debugging-port=${PUERTO}`,
    '--user-data-dir=' + resolve(process.env.TEMP ?? '.', `chrome-resize-${PUERTO}`),
    'about:blank',
  ],
  { stdio: 'ignore' },
)

const dormir = (ms) => new Promise((r) => setTimeout(r, ms))

async function main() {
  let ws
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PUERTO}/json/version`)
      if (r.ok) {
        ws = (await r.json()).webSocketDebuggerUrl
        break
      }
    } catch {}
    await dormir(250)
  }
  if (!ws) throw new Error('Chrome no abrió el puerto')

  const sock = new WebSocket(ws)
  let id = 0
  const pend = new Map()
  sock.addEventListener('message', (e) => {
    const m = JSON.parse(e.data)
    if (m.id && pend.has(m.id)) {
      const { ok, no } = pend.get(m.id)
      pend.delete(m.id)
      m.error ? no(new Error(m.error.message)) : ok(m.result)
    }
  })
  await new Promise((ok, no) => {
    sock.addEventListener('open', ok)
    sock.addEventListener('error', () => no(new Error('ws')))
  })
  const env = (method, params = {}, sessionId) =>
    new Promise((ok, no) => {
      const n = ++id
      pend.set(n, { ok, no })
      sock.send(JSON.stringify({ id: n, method, params, sessionId }))
    })

  const url = pathToFileURL(resolve(entrada)).href
  // La página tiene que vivir en la MISMA carpeta que la imagen: si se carga
  // un file:// desde about:blank, el canvas queda contaminado y toDataURL
  // lanza SecurityError.
  const paginaBase = url.slice(0, url.lastIndexOf('/') + 1)

  const { targetId } = await env('Target.createTarget', { url: paginaBase })
  const { sessionId } = await env('Target.attachToTarget', { targetId, flatten: true })
  const s = (m, p) => env(m, p, sessionId)
  await s('Runtime.enable')
  await dormir(500)
  const r = await s('Runtime.evaluate', {
    expression: `(async () => {
      const img = new Image();
      img.src = ${JSON.stringify(url)};
      await img.decode();
      const escala = Math.min(1, ${anchoMax} / img.naturalWidth);
      const c = document.createElement('canvas');
      c.width = Math.round(img.naturalWidth * escala);
      c.height = Math.round(img.naturalHeight * escala);
      const ctx = c.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, c.width, c.height);
      return JSON.stringify({ w: c.width, h: c.height, datos: c.toDataURL('image/jpeg', ${calidad}) });
    })()`,
    awaitPromise: true,
    returnByValue: true,
  })

  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text ?? 'fallo en canvas')

  const { w, h, datos } = JSON.parse(r.result.value)
  const buf = Buffer.from(datos.split(',')[1], 'base64')
  const ruta = resolve(salida)
  mkdirSync(dirname(ruta), { recursive: true })
  writeFileSync(ruta, buf)
  console.log(`✓ ${salida}  ${w}×${h}  ${Math.round(buf.length / 1024)} KB`)

  sock.close()
  chrome.kill()
}

main().catch((e) => {
  console.error('Error:', e.message)
  chrome.kill()
  process.exit(1)
})

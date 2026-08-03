#!/usr/bin/env node
/**
 * Capturas y diagnóstico con viewport exacto, vía Chrome DevTools Protocol.
 *
 * `--window-size` de Chrome headless no fija el viewport de forma fiable, y el
 * resize del navegador tampoco. `Emulation.setDeviceMetricsOverride` sí: es la
 * única manera de estar seguro de que lo que mides es un móvil de 390 px.
 *
 *   node scripts/captura.mjs <url> --out <archivo.png> [--w 390] [--h 844]
 *                                  [--dpr 2] [--full] [--diagnostico]
 */

import { spawn } from 'node:child_process'
import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find((p) => existsSync(p))

if (!CHROME) {
  console.error('No encontré chrome.exe en las rutas habituales.')
  process.exit(1)
}

// --- argumentos ---
const argv = process.argv.slice(2)
const url = argv.find((a) => !a.startsWith('--')) ?? 'http://localhost:3000/'
const flag = (n, d) => {
  const i = argv.indexOf(`--${n}`)
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : d
}
const tiene = (n) => argv.includes(`--${n}`)

const ancho = Number(flag('w', 390))
const alto = Number(flag('h', 844))
const dpr = Number(flag('dpr', 2))
const salida = flag('out', null)
const completa = tiene('full')
const diagnostico = tiene('diagnostico')
const medirPeso = tiene('peso')

const PUERTO = 9333 + (Number(flag('puerto-offset', 0)) || 0)

// --- lanzar chrome ---
const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    `--remote-debugging-port=${PUERTO}`,
    '--user-data-dir=' + resolve(process.env.TEMP ?? '.', `chrome-captura-${PUERTO}`),
    'about:blank',
  ],
  { stdio: 'ignore' },
)

const dormir = (ms) => new Promise((r) => setTimeout(r, ms))

async function esperarChrome() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PUERTO}/json/version`)
      if (r.ok) return (await r.json()).webSocketDebuggerUrl
    } catch {}
    await dormir(250)
  }
  throw new Error('Chrome no abrió el puerto de depuración.')
}

/** Cliente CDP mínimo sobre el WebSocket nativo de Node. */
function conectar(wsUrl) {
  const ws = new WebSocket(wsUrl)
  let id = 0
  const pendientes = new Map()
  const eventos = new Map()

  ws.addEventListener('message', (e) => {
    const m = JSON.parse(e.data)
    if (m.id && pendientes.has(m.id)) {
      const { ok, no } = pendientes.get(m.id)
      pendientes.delete(m.id)
      m.error ? no(new Error(m.error.message)) : ok(m.result)
    } else if (m.method && eventos.has(m.method)) {
      eventos.get(m.method).forEach((f) => f(m.params))
    }
  })

  const listo = new Promise((ok, no) => {
    ws.addEventListener('open', ok)
    ws.addEventListener('error', () => no(new Error('WebSocket falló')))
  })

  return {
    listo,
    enviar(method, params = {}, sessionId) {
      return new Promise((ok, no) => {
        const n = ++id
        pendientes.set(n, { ok, no })
        ws.send(JSON.stringify({ id: n, method, params, sessionId }))
      })
    },
    on(method, fn) {
      if (!eventos.has(method)) eventos.set(method, [])
      eventos.get(method).push(fn)
    },
    cerrar: () => ws.close(),
  }
}

/** Elementos que se salen del viewport. Lo que causa el scroll horizontal. */
const JS_DIAGNOSTICO = `(() => {
  const vw = document.documentElement.clientWidth;
  const fuera = [];
  document.querySelectorAll('*').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width === 0) return;
    if (r.right > vw + 1 || r.left < -1) {
      fuera.push({
        etiqueta: el.tagName.toLowerCase(),
        clase: (el.getAttribute('class') || '').slice(0, 90),
        izq: Math.round(r.left), der: Math.round(r.right), ancho: Math.round(r.width)
      });
    }
  });
  return JSON.stringify({
    viewport: vw,
    scrollWidth: document.documentElement.scrollWidth,
    desborda: document.documentElement.scrollWidth > vw,
    total: fuera.length,
    elementos: fuera.slice(0, 12)
  }, null, 1);
})()`

async function main() {
  const wsUrl = await esperarChrome()
  const cli = conectar(wsUrl)
  await cli.listo

  const { targetId } = await cli.enviar('Target.createTarget', { url: 'about:blank' })
  const { sessionId } = await cli.enviar('Target.attachToTarget', { targetId, flatten: true })
  const s = (m, p) => cli.enviar(m, p, sessionId)

  await s('Page.enable')
  await s('Runtime.enable')

  // Peso transferido real (comprimido), por recurso. Es lo que paga el 4G.
  const recursos = []
  if (medirPeso) {
    await s('Network.enable')
    // Sin esto los recursos vienen de caché y reportan 0 bytes: mediríamos
    // una segunda visita, no la primera que es la que duele en 4G.
    await s('Network.setCacheDisabled', { cacheDisabled: true })

    // 4G regular: los números que usa Lighthouse para "slow 4G" son más
    // duros; estos son de 4G normal, que es lo que hay en Lima urbana.
    if (tiene('4g')) {
      await s('Network.emulateNetworkConditions', {
        offline: false,
        latency: 70,
        downloadThroughput: (4 * 1024 * 1024) / 8,
        uploadThroughput: (3 * 1024 * 1024) / 8,
      })
    }
    const porPeticion = new Map()
    cli.on('Network.responseReceived', (p) => {
      porPeticion.set(p.requestId, { url: p.response.url, tipo: p.type })
    })
    cli.on('Network.loadingFinished', (p) => {
      const r = porPeticion.get(p.requestId)
      if (r) recursos.push({ ...r, bytes: p.encodedDataLength })
    })
  }

  // Viewport exacto. Esto es lo que --window-size no garantiza.
  await s('Emulation.setDeviceMetricsOverride', {
    width: ancho,
    height: alto,
    deviceScaleFactor: dpr,
    mobile: ancho < 700,
  })

  const t0 = Date.now()
  let tDom = null
  cli.on('Page.domContentEventFired', () => (tDom ??= Date.now() - t0))
  const cargada = new Promise((ok) => cli.on('Page.loadEventFired', ok))
  await s('Page.navigate', { url })
  await Promise.race([cargada, dormir(25000)])
  const tCarga = Date.now() - t0
  await dormir(1200) // fuentes e imágenes

  if (medirPeso) {
    const lcp = await s('Runtime.evaluate', {
      expression: `new Promise(r => {
        const e = performance.getEntriesByType('largest-contentful-paint');
        if (e.length) return r(Math.round(e[e.length-1].startTime));
        new PerformanceObserver(l => { const x = l.getEntries(); r(Math.round(x[x.length-1].startTime)); })
          .observe({ type: 'largest-contentful-paint', buffered: true });
        setTimeout(() => r(null), 3000);
      })`,
      awaitPromise: true,
      returnByValue: true,
    })
    console.log(`\nTiempos${tiene('4g') ? ' (4G: 4 Mbps, 70 ms RTT)' : ''}`)
    console.log('─'.repeat(52))
    console.log(`  DOMContentLoaded  ${String(tDom ?? '?').padStart(6)} ms`)
    console.log(`  load              ${String(tCarga).padStart(6)} ms`)
    console.log(`  LCP               ${String(lcp.result.value ?? '?').padStart(6)} ms`)
    console.log(`  objetivo          ${'<3000'.padStart(6)} ms   ${tCarga < 3000 ? '✓ dentro' : '✗ excedido'}`)
  }

  if (medirPeso) {
    await dormir(1500) // que terminen las imágenes diferidas del primer pliegue
    const total = recursos.reduce((a, r) => a + r.bytes, 0)
    const porTipo = {}
    for (const r of recursos) porTipo[r.tipo] = (porTipo[r.tipo] ?? 0) + r.bytes

    const kb = (n) => (n / 1024).toFixed(1) + ' KB'
    console.log(`\nPeso transferido (viewport ${ancho}px, sin caché)`)
    console.log('─'.repeat(52))
    for (const [t, n] of Object.entries(porTipo).sort((a, b) => b[1] - a[1])) {
      console.log(`  ${t.padEnd(12)} ${kb(n).padStart(11)}`)
    }
    console.log('─'.repeat(52))
    console.log(`  ${'TOTAL'.padEnd(12)} ${kb(total).padStart(11)}   (${recursos.length} peticiones)`)
    console.log(`  presupuesto  ${'1536.0 KB'.padStart(11)}   ${total < 1536 * 1024 ? '✓ dentro' : '✗ excedido'}`)

    console.log('\n  Recursos más pesados:')
    for (const r of [...recursos].sort((a, b) => b.bytes - a.bytes).slice(0, 6)) {
      console.log(`    ${kb(r.bytes).padStart(10)}  ${r.url.replace(/^https?:\/\/[^/]+/, '').slice(0, 62)}`)
    }
  }

  if (diagnostico) {
    const r = await s('Runtime.evaluate', { expression: JS_DIAGNOSTICO, returnByValue: true })
    console.log(r.result.value)
  }

  if (salida) {
    // Desplazamiento antes de capturar. Más fiable que --full en páginas con
    // alturas en svh: redimensionar el viewport a la altura total del
    // documento reflowea el hero y la captura no termina nunca.
    const y = Number(flag('y', 0))
    if (y > 0) {
      await s('Runtime.evaluate', { expression: `window.scrollTo(0, ${y})` })
      await dormir(900)
    }

    if (completa) {
      const { cssContentSize } = await s('Page.getLayoutMetrics')
      await s('Emulation.setDeviceMetricsOverride', {
        width: ancho,
        height: Math.ceil(cssContentSize.height),
        deviceScaleFactor: dpr,
        mobile: ancho < 700,
      })
      await dormir(400)
    }

    const { data } = await s('Page.captureScreenshot', { format: 'png', captureBeyondViewport: completa })
    const ruta = resolve(process.cwd(), salida)
    mkdirSync(dirname(ruta), { recursive: true })
    writeFileSync(ruta, Buffer.from(data, 'base64'))
    console.log(`✓ ${salida}  ${ancho}x${completa ? 'completa' : alto} @${dpr}x`)
  }

  cli.cerrar()
  chrome.kill()
}

main().catch((e) => {
  console.error('Error:', e.message)
  chrome.kill()
  process.exit(1)
})

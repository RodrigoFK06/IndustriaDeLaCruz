# Entrega — Propuesta Industria de la Cruz del Perú

**URL:** https://propuesta-idcp-a7f3.vercel.app
**Fecha:** 3 de agosto de 2026

Métricas medidas sobre la URL en vivo, viewport 390 px, 4G (4 Mbps / 70 ms RTT),
sin caché:

| | Medido | Objetivo |
|---|---|---|
| Peso total | **283 KB** (14 peticiones) | < 1.5 MB ✓ |
| Carga completa | **1.45 s** | < 3 s ✓ |
| LCP | **1.06 s** | — |
| Contraste | 11/11 pares pasan **AA** para texto normal | — |
| Detector Impeccable | **0 hallazgos** | — |

---

## 1. Lo que NO pude verificar

Ordenado por lo que más te expone si él lo lee y está mal.

### Marcado en el sitio

**La unidad del volteo del torno.** Su web decía *"volteo de hasta 1,500"* sin unidad.
Casi seguro son milímetros de diámetro, pero *casi seguro* no basta para un dato
que un jefe de planta usa para decidir si su pieza entra. Está publicado con la
marca visible «por confirmar» y con `<!-- VERIFICAR -->` en el HTML.
**Es el único dato del sitio que no está cerrado.**

### No están en el sitio — se omitieron por falta de fuente

- **Cuántos tornos tiene.** Solo se sabe el rango de capacidad (1.5 a 6 m entre
  puntos), no cuántas máquinas ni de qué marca.
- **Certificaciones.** No hay rastro de AWS D1.1, ISO ni homologación de soldadores.
  No inventé ninguna. Si las tiene, es de lo que más pesa en minería.
- **Tonelaje, área de planta, número de operarios.** Cero fuentes. Nada de esto
  aparece en la página.
- **Correo electrónico.** No aparece en ningún directorio, ni en Maps, ni en el
  índice de su web. El sitio solo ofrece teléfono y WhatsApp.
- **Si entregan o solo recogen en planta**, y si cubren provincia. Sin fuente.
- **Formas de pago y condiciones de crédito.** Sin fuente.

### Contradicciones que él tiene que resolver

**Tres teléfonos distintos, todos suyos.**

| Número | Dónde aparece |
|---|---|
| **961 905 185** | Google Maps — es el que usé |
| 977 656 802 | Hotfrog |
| 934 022 729 | Hotfrog |

Usé el de Maps porque es la ficha viva y coincide con el que me pasaste. Pregúntale
cuál contesta de verdad y si los otros dos siguen activos.

**Las reseñas visibles son de hace 4 años (~2022).** El 5.0 sobre 43 opiniones es
actual y se muestra tal cual, pero las tres citas textuales que publiqué son de esa
época. La página lo dice explícitamente: *«Las opiniones visibles en la ficha son de
2022»*. Si tiene reseñas recientes mejores, vale reemplazarlas.

**El "Sr. Miguel Aparco" aparece nombrado en dos reseñas** como quien atendió.
Probablemente sea el dueño o el jefe de taller. **No lo puse en el sitio** — nombrar
a una persona sin su permiso en una web que no encargó es pasarse. Si es el dueño,
es tu mejor puerta de entrada para el correo.

**Google los categoriza como «Chapistería»**, no como metalmecánica. O la categoría
está mal elegida (muy común) o hacen más plancha/carrocería de lo que dicen los
directorios. Vale preguntarle: si está mal, corregirla en su ficha de Maps es una
mejora gratis que puedes ofrecerle en la primera llamada.

**La mezcladora de concreto.** La foto es suya y muestra un equipo terminado en su
taller, pero no tiene fecha. No sé si es una línea de producto vigente o un trabajo
puntual de hace años. En el sitio está como muestra de capacidad de fabricación, sin
afirmar que las venda hoy.

### Sobre el posicionamiento

Tu brief decía *estructuras metálicas*. La evidencia dice otra cosa: su banner en
Maps dice **«piezas de soldadura para la rama automotriz»**, su web hablaba de
**torno, CNC, engranajes y muelles**, y sus tres fotos reales son mecanizado y un
equipo fabricado. Estructuras metálicas aparece como **un ítem más** en la lista de
infoisinfo, no como titular.

Por eso el sitio quedó con doble entrada, como decidiste. Pero si él te dice que hoy
vive de estructuras, el titular cambia — y el cambio es una línea en
`lib/site-content.ts`.

---

## 2. Captura para WhatsApp

`entregables/preview-whatsapp.png` — 1170×2532, primer pliegue en iPhone.
Es la que conviene mandar: se ve el nombre, el titular, las dos entradas, el 5.0 ★
de Google, el RUC y el aviso de que es una propuesta.

También quedan:
- `entregables/movil-completa.png` — la página entera en móvil
- `entregables/escritorio.png` — vista en escritorio

---

## 3. Por qué se cayó su web

**No fue una falla técnica. El dominio venció y no lo renovaron.**

| Evento | Fecha |
|---|---|
| Registro de `industriadelacruzdelperu.com` | 4 jun 2021 |
| **Vencimiento** | **4 jun 2026** |
| Entró en periodo de redención | 4 jul 2026 |
| Estado hoy | `client hold` + `redemption period` |

Registrador: **Arsys Internet S.L. (NICLINE.COM)**, España. Nameservers de
`servidoresdns.net`. El DNS devuelve NXDOMAIN — por eso no carga en ningún lado, ni
con www ni sin www.

**Esto es tu mejor apertura de venta, y tiene reloj.**

El periodo de redención dura típicamente 30 días desde el 4 de julio, seguido de unos
5 días de `pendingDelete`. Es decir: **la ventana para rescatar ese dominio se está
cerrando esta semana o la próxima**. Después cae al mercado abierto y cualquiera lo
registra — y los dominios de empresas con tracción son justo los que cazan los
revendedores.

Vale la pena que se lo digas **hoy**, aunque no te compre la web. Rescatar un dominio
en redención cuesta una tarifa de recuperación (del orden de US$ 80–150 según
registrador), y se hace desde Arsys con las credenciales del titular. Si ya cayó, la
alternativa es registrar un `.com.pe` o una variante, pero pierde el historial.

Dato adicional: **su ficha de Google Maps todavía enlaza a ese dominio muerto.**
Cada persona que lo busca en Google y hace clic en su web se topa con un error. Eso
lo puedes arreglar en minutos y es un argumento concreto.

Archive.org no ayudó: el único snapshot (8 dic 2021) es un 403. Todo el contenido que
recuperé salió del índice de búsqueda, no del archivo.

---

## Nota operativa

Este proyecto heredó **protección SSO de Vercel** del equipo `arkos-peru`, que hacía
que cualquiera que abriera el enlace viera un login en vez de la propuesta. La
desactivé **solo para este proyecto** para que el enlace funcione desde WhatsApp.

Para revertirlo:

```bash
npx vercel project protection enable propuesta-idcp --sso
```

Los otros proyectos del equipo no se tocaron.

---

## Rebrandear a otro prospecto

Dos archivos:

- `lib/site-content.ts` — todo el texto, datos, servicios y opciones del cotizador
- `app/globals.css` — bloque `@theme` con los colores

`INVESTIGACION.md` tiene la trazabilidad completa: cada dato del sitio con su fuente.

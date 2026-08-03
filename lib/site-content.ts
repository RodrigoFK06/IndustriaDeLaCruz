/**
 * Contenido del sitio. Punto único de edición para rebrandear a otro prospecto.
 *
 * REGLA: cada dato de aquí sale de una fuente verificable listada en INVESTIGACION.md.
 * Lo que no se pudo verificar lleva `verificar: true` y se pinta con marca visible.
 * No agregues cifras (tonelaje, m², empleados, certificaciones) sin fuente.
 */

export const propuesta = {
  autor: 'Árkos',
  aviso: 'Propuesta de diseño preparada por Árkos — no es el sitio oficial de la empresa',
  contactoAutor: 'rodrigoan.torresp@gmail.com',
} as const

export const empresa = {
  nombre: 'Industria de la Cruz del Perú',
  nombreCorto: 'Industria de la Cruz',
  razonSocial: 'INDUSTRIA DE LA CRUZ DEL PERU E.I.R.L.',
  ruc: '20601570611',
  desde: 2016,
  inicioActividades: '21 de octubre de 2016',

  telefono: '961 905 185',
  telefonoE164: '51961905185',

  direccion: 'Pasaje Fundo Buenos Aires Mz. E Lt. 1-2B',
  direccionRef: 'Antigua Panamericana Sur Km 18.5',
  distrito: 'Villa El Salvador',
  ciudad: 'Lima',
  plusCode: 'Q2PG+VX Villa El Salvador',
  mapsUrl:
    'https://www.google.com/maps/place/Industria+de+la+Cruz+del+Peru+E.I.R.L+-+Empresa+de+Metalmecanica+y+Soldadura/@-12.2127534,-76.9725004,17z',

  horario: [
    { dias: 'Lunes a viernes', horas: '08:00 – 17:00' },
    { dias: 'Sábados', horas: '08:00 – 13:00' },
    { dias: 'Domingos', horas: 'Cerrado' },
  ],

  resena: { puntaje: '5.0', total: 43, anio: 2022 },
} as const

/** Su propia descripción, textual desde su ficha de infoisinfo. */
export const descripcionPropia =
  'Somos una empresa dirigida al sector industrial, metalmecánica, minería, ' +
  'construcción y caldería. Ofrecemos maquinados industriales torneado, ' +
  'rectificado, pintura, soldadura.'

export const hero = {
  kicker: `Villa El Salvador · desde ${empresa.desde}`,
  titulo: 'Maquinados, muelles y fabricación',
  subtitulo:
    'Taller de metalmecánica en el parque industrial de Villa El Salvador. ' +
    'Torneamos la pieza que ya no consigues y reparamos lo que aguanta carga.',
  cta: 'Pedir cotización',
  ctaSecundario: 'Ver capacidades',
} as const

/** Las dos entradas. El visitante elige por lo que vino a resolver. */
export const puertas = [
  {
    id: 'mecanizado',
    numero: '01',
    titulo: 'Mecanizado y mantenimiento',
    entradilla: 'Cuando la pieza no se consigue o la máquina ya no aguanta.',
    detalle:
      'Fabricamos a plano o a muestra en torno y centro de mecanizado CNC, y ' +
      'recuperamos componentes de maquinaria pesada.',
    items: [
      'Piezas mecánicas en torno y centro de mecanizado CNC',
      'Ejes excéntricos y maquinado de interiores',
      'Engranajes: cónicos rectos, cilíndricos rectos y helicoidales',
      'Mandrinado de alojamientos',
      'Rectificado de platos y levas',
      'Mantenimiento de muelles multihoja, parabólicos y de elefante',
    ],
    foto: '/img/torno-plato.jpg',
    fotoAlt:
      'Plato de torno de cuatro mordazas sujetando una pieza recién torneada, con viruta sobre la bancada',
    fotoCredito: 'propia',
  },
  {
    id: 'fabricacion',
    numero: '02',
    titulo: 'Fabricación y soldadura',
    entradilla: 'Desde el anclaje suelto hasta el equipo completo.',
    detalle:
      'Habilitado, armado y soldadura de estructuras y elementos, con pintura ' +
      'y acabado en planta.',
    items: [
      'Estructuras metálicas',
      'Fabricación de anclajes',
      'Fabricación de abrazaderas',
      'Servicio de roscado',
      'Soldadura de todo tipo, incluida la rama automotriz',
      'Pines, bocinas y pernos',
    ],
    foto: '/img/mezcladora.jpg',
    fotoAlt:
      'Mezcladora de concreto fabricada en el taller, con tolva amarilla y carenado azul, lista para entrega',
    fotoCredito: 'propia',
  },
] as const

/** Capacidad de máquina. Único bloque con números — todos de su propia web. */
export const capacidades = {
  titulo: 'Lo que entra en el torno',
  entradilla:
    'Estas son las medidas que manejamos. Si tu pieza entra acá, la hacemos.',
  fila: [
    { dato: '1.5 – 6 m', etiqueta: 'Entre puntos', nota: 'Rango de nuestros tornos' },
    { dato: '1,500', etiqueta: 'Volteo', nota: 'Capacidad máxima', verificar: 'unidad' },
    { dato: 'CNC', etiqueta: 'Centro de mecanizado', nota: 'Además del torno paralelo' },
  ],
  /* VERIFICAR: su web decía "volteo de hasta 1,500" sin unidad. Casi seguro
     milímetros de diámetro, pero no lo afirmamos hasta que él lo confirme. */
  pie:
    'Trabajamos a plano o a muestra. Si no tienes plano, tráenos la pieza rota: ' +
    'de ahí sacamos la medida.',
} as const

export const sectores = {
  titulo: 'Con quién trabajamos',
  entradilla: descripcionPropia,
  lista: [
    {
      nombre: 'Transporte y maquinaria pesada',
      detalle:
        'Muelles y componentes de camiones mixer de concreto, camiones, ' +
        'tractocamiones y maquinaria pesada.',
    },
    {
      nombre: 'Minería',
      detalle: 'Piezas de reposición y recuperación de componentes.',
    },
    {
      nombre: 'Construcción',
      detalle: 'Anclajes, estructuras y equipos de obra.',
    },
    {
      nombre: 'Calderería e industria',
      detalle: 'Maquinados, roscado y soldadura para planta.',
    },
  ],
} as const

/* Las 3 fotos propias se usan en el hero y en las dos puertas. No hay galería
   aparte: repetirlas en un carrusel no agrega prueba, solo peso. */

export const prueba = {
  titulo: 'Lo que dicen los clientes',
  entradilla: `${empresa.resena.puntaje} en Google sobre ${empresa.resena.total} opiniones. Estas son textuales.`,
  nota: `Las opiniones visibles en la ficha son de ${empresa.resena.anio}.`,
  citas: [
    {
      texto:
        'Excelente servicio, muy buena atención, cumple con el tiempo establecido. Sin duda se los recomiendo.',
      autor: 'Cristian Cairo Medrano',
    },
    {
      texto: 'Un excelente servicio y muy buena atención, son muy amables los muchachos.',
      autor: 'Orlando Baldeon',
    },
    {
      texto: 'Excelente servicio. Los recomiendo y felicito.',
      autor: 'Oscar Rojo · Local Guide',
    },
  ],
} as const

/* ---------------------------------------------------------------------------
   SOLICITUD GUIADA
   No calcula precios. Arma el mensaje de WhatsApp con lo mínimo para cotizar.
   --------------------------------------------------------------------------- */

export const solicitud = {
  titulo: 'Pide tu cotización',
  entradilla:
    'Arma tu pedido acá y te llega el mensaje listo. Con estos datos podemos ' +
    'responderte sin pedirte nada más.',
  campos: {
    tipo: {
      etiqueta: '¿Qué necesitas?',
      opciones: [
        'Pieza a plano o a muestra',
        'Mantenimiento de muelles',
        'Engranaje',
        'Rectificado de platos o levas',
        'Estructura metálica',
        'Anclajes o abrazaderas',
        'Roscado',
        'Trabajo de soldadura',
        'Otro',
      ],
    },
    cantidad: { etiqueta: 'Cantidad', placeholder: '1' },
    material: {
      etiqueta: 'Material',
      opciones: [
        'No sé / que me recomienden',
        'Acero al carbono',
        'Acero inoxidable',
        'Fundición',
        'Bronce',
        'Aluminio',
        'Otro',
      ],
    },
    plano: {
      etiqueta: '¿Tienes plano o muestra?',
      opciones: ['Tengo plano', 'Tengo la pieza de muestra', 'No tengo ninguno'],
    },
    plazo: {
      etiqueta: 'Plazo',
      opciones: ['Plazo normal', 'Es urgente'],
    },
  },
  vistaPrevia: 'Tu mensaje queda así',
  cta: 'Enviar por WhatsApp',
  nota: 'Se abre WhatsApp con el mensaje escrito. Lo puedes editar antes de mandarlo.',
} as const

export const contacto = {
  titulo: 'Dónde estamos',
  entradilla:
    'Estamos en el parque industrial de Villa El Salvador, a la altura del km 18.5 ' +
    'de la Antigua Panamericana Sur.',
  llegar: 'Cómo llegar',
} as const

export const navegacion = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#capacidades', label: 'Capacidades' },
  { href: '#referencias', label: 'Referencias' },
  { href: '#cotizar', label: 'Cotizar' },
] as const

export const meta = {
  titulo: `${empresa.nombre} — Maquinados, muelles y fabricación | Villa El Salvador`,
  descripcion:
    'Taller de metalmecánica en Villa El Salvador, Lima. Torno y centro de mecanizado ' +
    'CNC, engranajes, mandrinado, mantenimiento de muelles, estructuras metálicas y ' +
    'soldadura. Desde 2016.',
} as const

// Datos del sitio. Para agregar un proyecto: copiar un bloque, cambiar slug/textos y crear img/<slug>/01.jpg, 02.jpg...
// kind: 'ext' exterior · 'int' interior · 'iso' isométrica · 'planta' planta ilustrada · 'vert' imagen vertical
// Campos opcionales por proyecto (si están vacíos, la web muestra el botón como "Próximamente"):
//   fotos: ['img/<slug>/obra-01.jpg', ...]  fotografías de obra construida
//   video: 'https://...'   recorrido o video      pdf: 'docs/<slug>.pdf'   ficha en PDF
//   creditos: { ingenieria, constructora, fotografia, otros }     terreno: 'm² del terreno'
//   lat / lng: ubicación en el mapa (referencial)    concepto: true → imágenes conceptuales
window.VANO = {
  instagram: 'https://www.instagram.com/vanoarquitectura.cl',
  email: 'vanoarqcl@gmail.com',
  telefono: '+56 9 6494 9455',
  whatsapp: '56964949455',
  oficina: 'Talca, Región del Maule',
  estados: ['Construido', 'En obra', 'Proyecto', 'Anteproyecto', 'Proyecto no construido'],
  instagramPosts: [],   // pegar aquí URLs de publicaciones para mostrarlas incrustadas
  servicios: [
    { n: '01', t: 'Diseño de arquitectura', d: 'Proyectos de vivienda y obra nueva desde el encargo hasta los planos de construcción.' },
    { n: '02', t: 'Permisos y regularizaciones', d: 'Gestión normativa, ingreso de permisos de edificación, recepción final y regularización de construcciones existentes.' },
    { n: '03', t: 'Modelación BIM', d: 'Modelos en Revit, coordinación de especialidades y documentación coherente con el proyecto.', dif: true },
    { n: '04', t: 'Renderizado y visualización', d: 'Imágenes, isométricas y plantas ilustradas para comunicar el proyecto antes de construirlo.', dif: true },
    { n: '05', t: 'Dron e impresión 3D', d: 'Levantamiento aéreo del terreno y maquetas impresas para revisar volumen y emplazamiento.', dif: true }
  ],
  equipo: [
    { nombre: 'Matías Álvarez Cifuentes', rol: 'Arquitecto · Cofundador', bio: '', foto: '' },
    { nombre: 'Natalia Herrera', rol: 'Cofundadora', bio: '', foto: '' }
    // bio: texto corto de trayectoria · foto: 'img/equipo/nombre.jpg'
  ],
  guias: [
    { t: 'Ley del Mono (Ley 20.898): ¿puedo regularizar mi vivienda?', cat: 'Regularización', d: 'Qué es, requisitos, documentación y quién puede patrocinar el expediente.', href: 'servicios.html#ley-del-mono' },
    { t: 'Las 3 etapas de un proyecto de arquitectura', cat: 'Proceso', d: 'Anteproyecto, proyecto y entrega final: qué incluye cada una y cómo se paga.', href: 'servicios.html#diseno' }
    // agregar más: { t, cat, d, href }
  ],
  proyectos: [
    {
      slug: 'casa-haras', nombre: 'Casa Haras de Huilquilemu', tipo: 'Vivienda', estado: 'Proyecto', lat: -35.41, lng: -71.60, ubicacion: 'Haras de Huilquilemu, Región del Maule', anio: '2026', m2: '201,74',
      resumen: 'Vivienda de campo en torno a un patio con piscina, con pabellones de acero oscuro y listones de madera.',
      texto: 'Un conjunto de pabellones de cubierta liviana se abre al paisaje del Maule mediante grandes paños vidriados. Un acceso profundo en madera, el patio con piscina y los espacios de estar de doble altura organizan la vida entre lo protegido y lo abierto. Proyecto en el sector de Huilquilemu.',
      imgs: [
        { kind: 'ext', alt: 'Fachada de acceso al atardecer' }, { kind: 'ext', alt: 'Patio y piscina al atardecer' }, { kind: 'ext', alt: 'Patio y piscina' },
        { kind: 'ext', alt: 'Acceso y cochera' }, { kind: 'ext', alt: 'Vista aérea del conjunto' }, { kind: 'int', alt: 'Living' },
        { kind: 'ext', alt: 'Crepúsculo' }, { kind: 'ext', alt: 'Acceso en madera' }, { kind: 'int', alt: 'Comedor' },
        { kind: 'int', alt: 'Dormitorio y patio' }, { kind: 'ext', alt: 'Vista nocturna' }, { kind: 'int', alt: 'Dormitorio principal' },
        { kind: 'int', alt: 'Dormitorio principal' }, { kind: 'iso', alt: 'Isométrica en el terreno' }, { kind: 'planta', alt: 'Planta ilustrada' }
      ]
    },
    {
      slug: 'cabanas-pichilemu', nombre: 'Cabañas Pichilemu', tipo: 'Cabañas', estado: 'Proyecto', lat: -34.387, lng: -72.004, terreno: '320', ubicacion: 'Pichilemu, Región de O’Higgins', anio: '2026', m2: '89,88',
      resumen: 'Dos cabañas de madera con cubierta a dos aguas y una gran terraza, apoyadas en un muro de ladrillo.',
      texto: 'Dos unidades compactas de planta simple, con dormitorios, cocina-comedor y terraza cubierta. La cubierta quebrada deja entrar luz cenital por una ventana alta, y los grandes paños corredizos abren el estar hacia el jardín. El proyecto incluye estudio de asoleamiento de solsticio a solsticio.',
      imgs: [
        { kind: 'ext', alt: 'Cabaña con terraza y muro de ladrillo' }, { kind: 'planta', alt: 'Plantas cabaña 1 y 2' }, { kind: 'planta', alt: 'Elevaciones' },
        { kind: 'int', alt: 'Cocina y comedor' }, { kind: 'int', alt: 'Estar y luz cenital' }, { kind: 'int', alt: 'Comedor' }, { kind: 'int', alt: 'Comedor y estar' }
      ]
    },
    {
      slug: 'tiny', nombre: 'Tiny House', tipo: 'Cabañas', estado: 'Construido', lat: -35.62, lng: -71.13, concepto: true, ubicacion: 'Vilches, San Clemente, Región del Maule', anio: '2025', m2: '33,91',
      resumen: 'Cabaña mínima elevada sobre pilotes de madera, con un gran ventanal hacia el paisaje.',
      texto: 'Una cabaña compacta revestida en madera, apoyada sobre pilotes para adaptarse a la pendiente. El ventanal de doble altura enmarca el paisaje y el interior en madera clara concentra cocina, estar y dormitorio en un solo recorrido. Imágenes conceptuales de estudio.',
      imgs: [
        { kind: 'ext', alt: 'Vista exterior' }, { kind: 'ext', alt: 'Vista exterior' }, { kind: 'vert', alt: 'Estar frente al ventanal' },
        { kind: 'vert', alt: 'Ventanal' }, { kind: 'int', alt: 'Cocina y comedor' }
      ]
    },
    {
      slug: 'casa-ac', nombre: 'Casa AC', tipo: 'Vivienda', estado: 'Construido', lat: -35.53, lng: -71.48, ubicacion: 'Mariposas, Región del Maule', anio: '2024', m2: '170',
      resumen: 'Casa de un piso organizada en torno a un patio de luz central que ordena el acceso y separa lo público de lo privado.',
      texto: 'Dos volúmenes revestidos en madera oscura se encuentran en un hall de acceso. El patio de luz al centro trae luz cenital y vegetación al interior, y las terrazas abren el living y el dormitorio principal hacia el paisaje.',
      imgs: [
        { kind: 'ext', alt: 'Fachada de acceso' }, { kind: 'ext', alt: 'Vista exterior' }, { kind: 'ext', alt: 'Vista exterior' }, { kind: 'ext', alt: 'Vista exterior' },
        { kind: 'int', alt: 'Comedor y living' }, { kind: 'int', alt: 'Interior' }, { kind: 'int', alt: 'Interior' },
        { kind: 'iso', alt: 'Isométrica' }, { kind: 'planta', alt: 'Planta ilustrada' }
      ]
    },
    {
      slug: 'casa-nery', nombre: 'Casa Nery', tipo: 'Vivienda', estado: 'Construido', lat: -35.44, lng: -71.72, ubicacion: 'Sector Aurora, Talca, Región del Maule', anio: '2022', m2: '150,6',
      resumen: 'Vivienda de volúmenes blancos y madera que se abre al jardín mediante terrazas cubiertas.',
      texto: 'Un conjunto de volúmenes simples de estuco blanco con detalles en madera. La pérgola y las terrazas extienden la vida interior hacia el exterior y el entorno arbolado.',
      imgs: [
        { kind: 'ext', alt: 'Vista exterior' }, { kind: 'ext', alt: 'Vista exterior' }, { kind: 'ext', alt: 'Vista exterior' }, { kind: 'ext', alt: 'Vista exterior' },
        { kind: 'iso', alt: 'Isométrica' }, { kind: 'planta', alt: 'Planta ilustrada' }
      ]
    },
    {
      slug: 'casa-v', nombre: 'Casa V', tipo: 'Vivienda', estado: 'Proyecto', anio: '2021', m2: '185',
      resumen: 'Vivienda en dos cuerpos con cubierta a dos aguas, unidos por un acceso vidriado.',
      texto: 'Dos pabellones negros de cubierta inclinada se conectan por un vano de acceso. Al interior, la madera continua en muros y cielo crea un espacio cálido, con grandes ventanas hacia el paisaje.',
      imgs: [
        { kind: 'ext', alt: 'Vista exterior' }, { kind: 'ext', alt: 'Atardecer' }, { kind: 'int', alt: 'Cocina y living' },
        { kind: 'iso', alt: 'Isométrica vuelo de pájaro' }, { kind: 'planta', alt: 'Planta ilustrada' }
      ]
    }
  ]
};
window.VANO.proyectos.forEach(function (p) {
  p.imgs.forEach(function (im, i) { im.src = 'img/' + p.slug + '/' + String(i + 1).padStart(2, '0') + '.jpg'; });
  p.portada = p.imgs[0].src;
});

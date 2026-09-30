(function () {
  var D = window.VANO;
  var page = document.body.dataset.page;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var tel = D.telefono.replace(/\s/g, '');

  /* ---------- Encabezado, pie y WhatsApp ---------- */
  var nav = [['index.html', 'Inicio', 'inicio'], ['proyectos.html', 'Proyectos', 'proyectos'], ['servicios.html', 'Servicios', 'servicios'], ['guias.html', 'Guías', 'guias'], ['nosotros.html', 'Nosotros', 'nosotros'], ['contacto.html', 'Contacto', 'contacto']];
  var current = page === 'proyecto' ? 'proyectos' : page;

  $('#site-header').innerHTML =
    '<a class="brand" href="index.html" aria-label="Vano Arquitectura, inicio"><img src="img/marca/logo.png" alt="VANO arquitectura"></a>' +
    '<button class="menu-btn" aria-label="Menú" aria-expanded="false"><span></span><span></span></button>' +
    '<nav>' + nav.map(function (n) { return '<a href="' + n[0] + '"' + (n[2] === current ? ' class="on"' : '') + '>' + n[1] + '</a>'; }).join('') +
    '<a class="cta" href="contacto.html#cotiza">Cotiza tu proyecto</a></nav>';
  $('.menu-btn').onclick = function () { var o = document.body.classList.toggle('menu-open'); this.setAttribute('aria-expanded', o); };

  $('#site-footer').innerHTML =
    '<div class="wrap foot"><div><img class="foot-logo" src="img/marca/logo.png" alt="VANO arquitectura"><p>Arquitectura · Diseño · Obra nueva · Regularizaciones · Modelación BIM</p><p>Oficina en ' + esc(D.oficina) + '</p></div>' +
    '<div><a href="' + D.instagram + '" target="_blank" rel="noopener">Instagram @vanoarquitectura.cl</a>' +
    '<a href="mailto:' + D.email + '">' + D.email + '</a><a href="tel:' + tel + '">' + D.telefono + '</a>' + (D.telefono2 ? '<a href="tel:' + D.telefono2.replace(/\s/g, '') + '">' + D.telefono2 + '</a>' : '') + '</div>' +
    '<div><a href="proyectos.html">Proyectos</a><a href="guias.html">Guías</a><a href="contacto.html#cotiza">Cotiza tu proyecto</a><div class="copy">© ' + new Date().getFullYear() + ' Vano Arquitectura SpA</div></div></div>';

  var wa = document.createElement('a');
  wa.className = 'wa'; wa.target = '_blank'; wa.rel = 'noopener';
  wa.href = 'https://wa.me/' + D.whatsapp + '?text=' + encodeURIComponent('Hola, quisiera cotizar un proyecto con Vano Arquitectura.');
  wa.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 4h16v12H9l-5 4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg><span>WhatsApp</span>';
  document.body.appendChild(wa);

  /* ---------- Piezas reutilizables ---------- */
  var region = function (p) { var m = /Región (?:del?|de) .+$/.exec(p.ubicacion || ''); return m ? m[0] : ''; };
  var badge = function (p) { return '<span class="badge b-' + p.estado.toLowerCase().replace(/[^a-z]+/g, '-') + '">' + esc(p.estado) + '</span>'; };

  var card = function (p) {
    return '<a class="card" href="proyecto.html?p=' + p.slug + '"><div class="ph"><img loading="lazy" src="' + p.portada + '" alt="' + esc(p.nombre) + '">' + badge(p) + '</div>' +
      '<div class="cap"><span>' + esc(p.nombre) + '</span><small>' + esc(p.tipo + (p.anio ? ' · ' + p.anio : '')) + '</small></div></a>';
  };

  var meta = function (p) {
    var rows = [['Ubicación', p.ubicacion], ['Año', p.anio], ['Superficie construida', p.m2 ? p.m2 + ' m²' : ''], ['Superficie terreno', p.terreno ? p.terreno + ' m²' : '']].filter(function (r) { return r[1]; });
    return rows.length ? '<dl class="meta">' + rows.map(function (r) { return '<div><dt>' + r[0] + '</dt><dd>' + esc(r[1]) + '</dd></div>'; }).join('') + '</dl>' : '';
  };

  var creditos = function (p) {
    var c = p.creditos || {};
    var rows = [['Arquitectura', 'Vano Arquitectura'], ['Ingeniería', c.ingenieria], ['Constructora', c.constructora], ['Fotografía', c.fotografia], ['Otros', c.otros]].filter(function (r) { return r[1]; });
    return '<dl class="meta cred">' + rows.map(function (r) { return '<div><dt>' + r[0] + '</dt><dd>' + esc(r[1]) + '</dd></div>'; }).join('') + '</dl>';
  };

  /* Botón de material: activo si hay dato, "Próximamente" si no */
  var mat = function (label, href, ext) {
    return href ? '<a class="mat" href="' + esc(href) + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + label + '</a>'
                : '<span class="mat off" title="Próximamente">' + label + ' <em>próximamente</em></span>';
  };

  /* ---------- Inicio ---------- */
  if (page === 'inicio') {
    var hero = D.proyectos[0];
    $('#hero').style.backgroundImage = 'url(' + hero.portada + ')';
    $('#destacados').innerHTML = D.proyectos.slice(0, 3).map(card).join('');
    $('#servicios-lista').innerHTML = D.servicios.map(function (s) { return '<li><span>' + s.n + '</span>' + esc(s.t) + '</li>'; }).join('');
    var ig = $('#ig-grid');
    ig.innerHTML = D.proyectos.slice(0, 6).map(function (p) { return '<a href="' + D.instagram + '" target="_blank" rel="noopener"><img loading="lazy" src="' + p.portada + '" alt="Instagram: ' + esc(p.nombre) + '"></a>'; }).join('');
    if (D.instagramPosts.length) {
      $('#ig-embeds').innerHTML = D.instagramPosts.map(function (u) { return '<blockquote class="instagram-media" data-instgrm-permalink="' + esc(u) + '"></blockquote>'; }).join('');
      var sc = document.createElement('script'); sc.async = true; sc.src = 'https://www.instagram.com/embed.js'; document.body.appendChild(sc);
      ig.hidden = true;
    }
  }

  /* ---------- Proyectos: filtros y mapa ---------- */
  if (page === 'proyectos') {
    var uniq = function (a) { return a.filter(function (v, i) { return v && a.indexOf(v) === i; }); };
    var fields = [
      ['tipo', 'Tipo', uniq(D.proyectos.map(function (p) { return p.tipo; }))],
      ['estado', 'Estado', D.estados.filter(function (e) { return D.proyectos.some(function (p) { return p.estado === e; }); })],
      ['region', 'Región', uniq(D.proyectos.map(region))],
      ['anio', 'Año', uniq(D.proyectos.map(function (p) { return p.anio; })).sort().reverse()]
    ];
    var f = $('#filtros'), g = $('#grilla'), q = {}, view = 'lista', map, layer;
    f.innerHTML = fields.map(function (x) {
      return '<label>' + x[1] + '<select data-k="' + x[0] + '"><option value="">Todos</option>' + x[2].map(function (v) { return '<option>' + esc(v) + '</option>'; }).join('') + '</select></label>';
    }).join('') + '<div class="vista"><button class="chip on" data-v="lista">Lista</button><button class="chip" data-v="mapa">Mapa</button></div>';
    var val = function (p, k) { return k === 'region' ? region(p) : p[k]; };
    var filtered = function () { return D.proyectos.filter(function (p) { return Object.keys(q).every(function (k) { return !q[k] || val(p, k) === q[k]; }); }); };
    var draw = function () {
      var list = filtered();
      $('#conteo').textContent = list.length + (list.length === 1 ? ' proyecto' : ' proyectos');
      g.innerHTML = list.length ? list.map(card).join('') : '<p class="vacio">No hay proyectos con esos filtros.</p>';
      if (view === 'mapa') drawMap(list);
    };
    var drawMap = function (list) {
      if (!window.L) { $('#mapa').innerHTML = '<p class="vacio">No se pudo cargar el mapa.</p>'; return; }
      if (!map) {
        map = L.map('mapa', { scrollWheelZoom: false }).setView([-35.2, -71.6], 8);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '© OpenStreetMap' }).addTo(map);
        layer = L.layerGroup().addTo(map);
      }
      layer.clearLayers();
      var pts = [];
      list.filter(function (p) { return p.lat; }).forEach(function (p) {
        pts.push([p.lat, p.lng]);
        L.circleMarker([p.lat, p.lng], { radius: 9, color: '#1f1fff', weight: 2, fillColor: '#1f1fff', fillOpacity: .35 }).addTo(layer)
          .bindPopup('<a href="proyecto.html?p=' + p.slug + '"><b>' + esc(p.nombre) + '</b></a><br>' + esc(p.ubicacion));
      });
      if (pts.length) map.fitBounds(pts, { padding: [40, 40], maxZoom: 10 });
      setTimeout(function () { map.invalidateSize(); }, 50);
    };
    f.onchange = function (e) { if (e.target.dataset.k) { q[e.target.dataset.k] = e.target.value; draw(); } };
    f.onclick = function (e) {
      if (!e.target.dataset.v) return;
      view = e.target.dataset.v;
      [].forEach.call(f.querySelectorAll('[data-v]'), function (b) { b.classList.toggle('on', b.dataset.v === view); });
      $('#mapa-wrap').hidden = view !== 'mapa'; g.hidden = view === 'mapa';
      draw();
    };
    draw();
  }

  /* ---------- Ficha de proyecto ---------- */
  if (page === 'proyecto') {
    var slug = new URLSearchParams(location.search).get('p');
    var idx = D.proyectos.findIndex(function (p) { return p.slug === slug; });
    if (idx < 0) idx = 0;
    var p = D.proyectos[idx], nx = D.proyectos[(idx + 1) % D.proyectos.length];
    document.title = p.nombre + ' — Vano Arquitectura';
    $('#p-cabecera').innerHTML = '<p class="eyebrow">' + esc(p.tipo) + '</p><h1>' + esc(p.nombre) + '</h1>' + badge(p) + '<p class="lead">' + esc(p.resumen) + '</p>' + meta(p);
    $('#p-hero').innerHTML = '<img src="' + p.imgs[0].src + '" alt="' + esc(p.imgs[0].alt) + '">';
    $('#p-texto').textContent = p.texto;
    $('#p-conc').hidden = !p.concepto;
    $('#p-botones').innerHTML = (p.fotos && p.fotos.length ? mat('Fotografías de obra', '#obra') : (['Construido', 'En obra'].indexOf(p.estado) >= 0 ? mat('Fotografías de obra', '') : '')) + mat('Recorrido en video', p.video, true) + mat('Ficha en PDF', p.pdf, true) +
      '<a class="mat go" href="contacto.html?p=' + encodeURIComponent(p.nombre) + '#cotiza">Quiero algo así</a>';
    $('#p-creditos').innerHTML = creditos(p);
    $('#p-galeria').innerHTML = p.imgs.slice(1).map(function (im) {
      var tall = im.kind === 'iso' || im.kind === 'planta' || im.kind === 'vert';
      return '<figure class="' + (tall ? 'tall' : 'wide') + '"><img loading="lazy" src="' + im.src + '" alt="' + esc(im.alt) + '"><figcaption>' + esc(im.alt) + '</figcaption></figure>';
    }).join('');
    if (p.fotos && p.fotos.length) {
      $('#obra').hidden = false;
      $('#obra-galeria').innerHTML = p.fotos.map(function (s) { return '<figure class="wide"><img loading="lazy" src="' + esc(s) + '" alt="Obra construida, ' + esc(p.nombre) + '"></figure>'; }).join('');
    }
    $('#p-next').innerHTML = '<a href="proyecto.html?p=' + nx.slug + '"><small>Siguiente proyecto</small><span>' + esc(nx.nombre) + ' →</span></a>';
  }

  /* ---------- Servicios ---------- */
  if (page === 'servicios') {
    $('#servicios-det').innerHTML = D.servicios.map(function (s) {
      return '<article><span>' + s.n + (s.dif ? ' · <b class="dif">Diferencial</b>' : '') + '</span><h3>' + esc(s.t) + '</h3><p>' + esc(s.d) + '</p></article>';
    }).join('');
  }

  /* ---------- Guías ---------- */
  if (page === 'guias') {
    $('#guias-lista').innerHTML = D.guias.map(function (x) {
      return '<a class="guia" href="' + esc(x.href) + '"><small>' + esc(x.cat) + '</small><h3>' + esc(x.t) + '</h3><p>' + esc(x.d) + '</p><span>Leer →</span></a>';
    }).join('') +
      '<a class="guia off" href="mailto:' + D.email + '?subject=' + encodeURIComponent('Tema para una guía') + '"><small>Próximamente</small><h3>¿Qué te gustaría saber?</h3><p>Cuéntanos qué trámite o duda de arquitectura quieres ver explicada.</p><span>Sugerir un tema →</span></a>';
  }

  /* ---------- Nosotros ---------- */
  if (page === 'nosotros') {
    $('#equipo').innerHTML = D.equipo.map(function (m) {
      var ini = m.nombre.split(' ').filter(function (w, i) { return i < 2 || i === 0; }).map(function (w) { return w[0]; }).slice(0, 2).join('');
      return '<article class="persona"><div class="avatar">' + (m.foto ? '<img src="' + esc(m.foto) + '" alt="' + esc(m.nombre) + '">' : '<span>' + ini + '</span>') + '</div>' +
        '<h3>' + esc(m.nombre) + '</h3><p class="rol">' + esc(m.rol) + '</p>' + (m.bio ? '<p>' + esc(m.bio) + '</p>' : '') + '</article>';
    }).join('');
  }

  /* ---------- Contacto (datos + formulario) ---------- */
  if ($('#contacto-datos')) {
    var c = '<a href="mailto:' + D.email + '">' + D.email + '</a><a href="tel:' + tel + '">' + D.telefono + '</a>' +
      (D.telefono2 ? '<a href="tel:' + D.telefono2.replace(/\s/g, '') + '">' + D.telefono2 + '</a>' : '') +
      '<a href="' + D.instagram + '" target="_blank" rel="noopener">Instagram @vanoarquitectura.cl</a>';
    $('#contacto-datos').innerHTML = c;
  }
  var form = $('#cotiza-form');
  if (form) {
    var pre = new URLSearchParams(location.search).get('p');
    if (pre) form.elements.mensaje.value = 'Me interesa un proyecto similar a ' + pre + '.\n';
    var texto = function () {
      var e = form.elements;
      return 'Hola, soy ' + e.nombre.value + '.\nServicio: ' + e.servicio.value + '\nUbicación del terreno o vivienda: ' + (e.lugar.value || 's/i') +
        '\nTeléfono: ' + (e.telefono.value || 's/i') + '\n\n' + e.mensaje.value;
    };
    var ok = function () { if (form.checkValidity()) return true; form.reportValidity(); return false; };
    $('#enviar-mail').onclick = function () { if (ok()) location.href = 'mailto:' + D.email + '?subject=' + encodeURIComponent('Cotización: ' + form.elements.servicio.value) + '&body=' + encodeURIComponent(texto()); };
    $('#enviar-wa').onclick = function () { if (ok()) window.open('https://wa.me/' + D.whatsapp + '?text=' + encodeURIComponent(texto()), '_blank', 'noopener'); };
    form.onsubmit = function (e) { e.preventDefault(); };
  }
})();

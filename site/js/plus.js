/* Mejoras de la web y la carta (cortedemanga.es) · 26/11/2026
   1) Reserva rápida (portada): personas y día ya elegidos al llegar a reservas; pasa también gclid/utm.
   2) Por la mañana: «Esmorzars fins a les 12:30» en el rótulo y «Ara» en la línea del día.
   3) Compartir (carta, grupos, Navidad): menú de compartir del móvil, o copia el enlace.
   4) Carta: filtro «Només vegetarià».
   Sin cookies ni almacenamiento: nada se guarda en el navegador. */
(function () {
  var d = document;
  var L = (d.documentElement.lang || 'ca').slice(0, 2);
  var T = {
    ca: { today: 'Avui', tomorrow: 'Demà', other: 'Un altre dia', copied: 'Enllaç copiat', vegN: '{n} plats vegetarians', vegOff: 'Tota la carta', loc: 'ca-ES' },
    es: { today: 'Hoy', tomorrow: 'Mañana', other: 'Otro día', copied: 'Enlace copiado', vegN: '{n} platos vegetarianos', vegOff: 'Toda la carta', loc: 'es-ES' },
    en: { today: 'Today', tomorrow: 'Tomorrow', other: 'Another day', copied: 'Link copied', vegN: '{n} vegetarian dishes', vegOff: 'Full menu', loc: 'en-GB' }
  }[L] || null;
  if (!T) return;

  // aviso para lectores de pantalla
  var liveEl = null;
  function live(msg) {
    if (!liveEl) {
      liveEl = d.createElement('p');
      liveEl.className = 'vh';
      liveEl.setAttribute('aria-live', 'polite');
      d.body.appendChild(liveEl);
    }
    liveEl.textContent = '';
    setTimeout(function () { liveEl.textContent = msg; }, 60);
  }

  // hora de Barcelona
  function ara() {
    var o = {};
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(new Date()).forEach(function (x) { o[x.type] = x.value; });
    return { wd: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(o.weekday), min: (+o.hour) * 60 + (+o.minute), y: +o.year, m: +o.month, d: +o.day };
  }
  function iso(t) { return new Date(t).toISOString().slice(0, 10); }

  /* 1) reserva rápida */
  try {
    var qb = d.querySelector('form.qb');
    if (qb) {
      var q = location.search.slice(1);
      if (q) q.split('&').forEach(function (kv) {
        if (!/^(gclid|gbraid|wbraid|utm_[a-z_]+)=/.test(kv)) return;
        var p = kv.split('='), inp = d.createElement('input');
        inp.type = 'hidden'; inp.name = p[0];
        try { inp.value = decodeURIComponent((p[1] || '').replace(/\+/g, ' ')); } catch (e) { inp.value = p[1] || ''; }
        qb.appendChild(inp);
      });
      var sel = qb.querySelector('select[name=dia]');
      if (sel) {
        var n = ara(), base = Date.UTC(n.y, n.m - 1, n.d);
        var fmt = new Intl.DateTimeFormat(T.loc, { weekday: 'long', day: 'numeric', timeZone: 'UTC' });
        var html = '';
        for (var i = 0; i < 7; i++) {
          var t = base + i * 86400000;
          var lab = i === 0 ? T.today : i === 1 ? T.tomorrow : fmt.format(new Date(t));
          html += '<option value="' + iso(t) + '">' + lab.charAt(0).toUpperCase() + lab.slice(1) + '</option>';
        }
        sel.innerHTML = html + '<option value="">' + T.other + '</option>';
        sel.name = 'fecha';
      }
      // los campos vacíos no viajan en el enlace
      qb.addEventListener('submit', function () {
        [].forEach.call(qb.elements, function (el) { if (el.name && el.value === '') el.disabled = true; });
      });
      window.addEventListener('pageshow', function () {
        [].forEach.call(qb.elements, function (el) { el.disabled = false; });
      });
    }
  } catch (e) {}

  /* 2) por la mañana: esmorzars */
  try {
    var dataEl = d.getElementById('cdm-data');
    var nowEl = d.getElementById('now'), esm = d.getElementById('st-esm');
    if (dataEl && (nowEl || esm)) {
      var D = JSON.parse(dataEl.textContent), HO = D.hours || [], c = ara();
      var hoy = c.y + '-' + (c.m < 10 ? '0' : '') + c.m + '-' + (c.d < 10 ? '0' : '') + c.d;
      var h = HO[c.wd], tancat = (D.closed || []).indexOf(hoy) > -1;
      // obierto y antes de las 12:30 (750 min)
      if (h && !tancat && c.min >= h[0] && c.min < 750) {
        if (nowEl) nowEl.hidden = false;
        if (esm) esm.classList.add('now');
      }
    }
  } catch (e) {}

  /* 3) compartir */
  try {
    var shares = d.querySelectorAll('[data-share]');
    if (shares.length) {
      var canon = d.querySelector('link[rel=canonical]');
      var url = canon ? canon.href : location.origin + location.pathname;
      [].forEach.call(shares, function (btn) {
        var box = btn.closest('[hidden]');
        if (box) box.hidden = false;
        btn.addEventListener('click', function () {
          var title = d.title;
          var copiar = function () {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              return navigator.clipboard.writeText(url).then(function () {
                var sp = btn.querySelector('span'), old = sp.textContent;
                sp.textContent = T.copied; live(T.copied);
                setTimeout(function () { sp.textContent = old; }, 2200);
              });
            }
            return Promise.reject();
          };
          var wa = function () { location.href = 'https://wa.me/?text=' + encodeURIComponent(title + ' ' + url); };
          if (navigator.share) {
            navigator.share({ title: title, url: url }).catch(function (err) {
              if (err && err.name === 'AbortError') return;
              copiar().catch(wa);
            });
          } else {
            copiar().catch(wa);
          }
        });
      });
    }
  } catch (e) {}

  /* 4) carta: només vegetarià */
  try {
    var veg = d.getElementById('veg'), main = d.getElementById('carta');
    if (veg && main) {
      var tools = d.getElementById('tools');
      if (tools) tools.hidden = false;
      var secs = [].filter.call(main.querySelectorAll('section.blk'), function (s) {
        return !/(^|\s)(drink|cover|closing)(\s|$)/.test(s.className) && ['ruta', 'tancar', 'grups'].indexOf(s.id) < 0;
      });
      var hero = d.querySelector('#ruta .fr.hero');
      var chips = [].slice.call(d.querySelectorAll('#cs a[href^="#"]'));
      var aplica = function (on) {
        var total = 0;
        secs.forEach(function (s) {
          // platos: elementos de lista (también la lista de entrepans) y líneas sueltas
          var items = s.querySelectorAll('li, p.rline'), vis = 0;
          [].forEach.call(items, function (li) {
            var v = !!li.querySelector('.vm');
            li.classList.toggle('vx', on && !v);
            if (v && !li.parentNode.closest('li')) vis++;
          });
          // subapartados (h3.sgl + lo que viene detrás): fuera si no queda ningún plato vegetariano
          var cont = s.querySelector('.in') || s, grupo = null, grupos = [];
          [].forEach.call(cont.children, function (k) {
            if (k.matches('h3.sgl')) { grupo = [k]; grupos.push(grupo); } else if (grupo) grupo.push(k);
          });
          grupos.forEach(function (g) {
            var hay = g.some(function (el) { return !!el.querySelector('.vm'); });
            g.forEach(function (el) { el.classList.toggle('vx', on && !hay); });
          });
          var queda = items.length ? vis > 0 : !!s.querySelector('.vm');
          s.classList.toggle('vx', on && !queda);
          total += vis;
        });
        if (hero) hero.classList.toggle('vx', on);
        chips.forEach(function (a) {
          var t = d.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)));
          a.classList.toggle('vx', !!(t && t.classList.contains('vx')));
        });
        veg.setAttribute('aria-pressed', on ? 'true' : 'false');
        live(on ? T.vegN.replace('{n}', total) : T.vegOff);
      };
      veg.addEventListener('click', function () { aplica(veg.getAttribute('aria-pressed') !== 'true'); });
    }
  } catch (e) {}
})();

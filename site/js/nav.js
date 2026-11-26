/* Navegación de la web y de la carta (cortedemanga.es) · 26/11/2026
   1) Si tocas la sección en la que ya estás, la página vuelve arriba en vez de recargarse.
   2) Mientras se ve una sección de la misma página (por ejemplo «On som» en la portada, o «Esmorzars»
      en la carta), su botón se marca; al salir, vuelve a marcarse la página.
   3) Temporada: lo que lleva data-until se oculta pasada esa fecha (hora de Barcelona). */
(function () {
  var d = document;

  function reduceMotion() {
    try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; }
  }
  function urlOf(a) {
    try { return new URL(a.getAttribute('href'), location.href); } catch (e) { return null; }
  }
  function samePath(u) {
    return u && u.origin === location.origin && u.pathname === location.pathname;
  }

  [].forEach.call(d.querySelectorAll('.abar, .mainnav'), function (nav) {
    var links = [].slice.call(nav.querySelectorAll('a'));
    var page = nav.querySelector('a[aria-current="page"]');
    var watch = [];

    links.forEach(function (a) {
      var u = urlOf(a);
      if (!samePath(u)) return;
      if (!u.hash) {
        // 1) misma página: arriba
        a.addEventListener('click', function (ev) {
          if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey || ev.button) return;
          ev.preventDefault();
          window.scrollTo({ top: 0, behavior: reduceMotion() ? 'auto' : 'smooth' });
          if (location.hash && history.replaceState) history.replaceState(null, '', location.pathname + location.search);
        });
        return;
      }
      var sec = d.getElementById(decodeURIComponent(u.hash.slice(1)));
      if (sec) watch.push({ a: a, sec: sec, on: false });
    });

    // 2) sección a la vista
    if (!watch.length || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        watch.forEach(function (w) { if (w.sec === en.target) w.on = en.isIntersecting; });
      });
      var act = null;
      watch.forEach(function (w) { if (w.on) act = w; });
      watch.forEach(function (w) {
        if (w === act) w.a.setAttribute('aria-current', 'location'); else w.a.removeAttribute('aria-current');
      });
      if (page) {
        if (act) page.removeAttribute('aria-current'); else page.setAttribute('aria-current', 'page');
      }
    }, { rootMargin: '-45% 0px -45% 0px' });
    watch.forEach(function (w) { io.observe(w.sec); });
  });

  // 3) temporada
  try {
    var hoy = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
    [].forEach.call(d.querySelectorAll('[data-until]'), function (el) {
      if (hoy > el.getAttribute('data-until')) el.hidden = true;
    });
  } catch (e) {}
})();

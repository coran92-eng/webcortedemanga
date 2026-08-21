#!/usr/bin/env node
/**
 * Genera las versiones indexables en inglés y catalán de index.html y grupos.html.
 *
 *   node scripts/build-i18n.mjs
 *
 * Por qué existe: hasta ahora EN y CA eran solo un swap de JavaScript sobre la misma
 * URL, y los hreflang de los tres idiomas apuntaban a https://cortedemanga.es/. Los
 * rastreadores (Google, GPTBot, ClaudeBot, PerplexityBot…) solo veían español.
 *
 * Cómo funciona: levanta un servidor estático sobre el repo, abre cada página en
 * Chromium, ejecuta la propia lógica setLanguage() del sitio (así la traducción y la
 * carta salen exactamente igual que en producción), corrige la cabecera y los enlaces
 * internos, y escribe el HTML resultante en en/ y ca/.
 *
 * La salida se commitea al repo: no hace falta build step en Netlify. Vuelve a
 * ejecutarlo cuando cambies index.html, grupos.html, carta.js o traducciones.js.
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://cortedemanga.es';
const PORT = 8977;

const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE || '/opt/node22/lib/node_modules/playwright/index.mjs'
);

/* ── Configuración ───────────────────────────────────────────────────────── */

const LOCALE = { es: 'es_ES', en: 'en_GB', ca: 'ca_ES' };

/** Rutas equivalentes por idioma. Las páginas sin traducción se omiten a propósito. */
const URL_MAP = {
  es: {
    '/': '/',
    '/grupos': '/grupos',
    '/preguntas-frecuentes': '/preguntas-frecuentes',
    '/tapas-eixample-barcelona': '/tapas-eixample-barcelona',
    '/desayunos-eixample-barcelona': '/desayunos-eixample-barcelona',
  },
  en: {
    '/': '/en/',
    '/grupos': '/en/grupos',
    '/preguntas-frecuentes': '/en/faq',
    '/tapas-eixample-barcelona': '/en/tapas-eixample-barcelona',
    '/desayunos-eixample-barcelona': '/en/breakfast-brunch-eixample',
  },
  ca: {
    // Las guías y la FAQ aún no tienen versión catalana: sus enlaces se dejan en español.
    '/': '/ca/',
    '/grupos': '/ca/grupos',
  },
};

const PAGES = [
  {
    src: 'index.html',
    esPath: '/',
    titleKey: 'meta_title_home',
    descKey: 'meta_desc_home',
    out: { en: 'en/index.html', ca: 'ca/index.html' },
  },
  {
    src: 'grupos.html',
    esPath: '/grupos',
    titleKey: 'meta_title_grupos',
    descKey: 'meta_desc_grupos',
    out: { en: 'en/grupos.html', ca: 'ca/grupos.html' },
  },
];

/* ── Servidor estático mínimo ────────────────────────────────────────────── */

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.ico': 'image/x-icon',
};

function startServer() {
  const server = http.createServer((req, res) => {
    let rel = decodeURIComponent(req.url.split('?')[0]);
    if (rel.endsWith('/')) rel += 'index.html';
    const file = path.join(ROOT, rel);
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404); res.end('not found'); return;
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

/* ── Diccionario (se lee del propio traducciones.js) ─────────────────────── */

const dictSrc = fs.readFileSync(path.join(ROOT, 'traducciones.js'), 'utf8');
const DICT = new Function(`${dictSrc}; return DICT;`)();

/* ── Generación ──────────────────────────────────────────────────────────── */

const server = await startServer();
const browser = await chromium.launch();
const results = [];

for (const page of PAGES) {
  for (const [lang, outFile] of Object.entries(page.out)) {
    const tab = await browser.newPage();
    const errors = [];
    tab.on('pageerror', (e) => errors.push(e.message));

    await tab.goto(`http://localhost:${PORT}/${page.src}`, { waitUntil: 'load' });
    await tab.evaluate((l) => setLanguage(l), lang);
    await tab.waitForTimeout(150);

    const html = await tab.evaluate((cfg) => {
      const { lang, site, canonical, alternates, title, desc, locale, urlMap, langMapEs } = cfg;
      const d = document;

      d.documentElement.lang = lang;

      /* Cabecera */
      d.title = title;
      const setMeta = (sel, attr, value) => {
        const el = d.head.querySelector(sel);
        if (el) el.setAttribute(attr, value);
      };
      setMeta('meta[name="description"]', 'content', desc);
      setMeta('meta[property="og:title"]', 'content', title);
      setMeta('meta[property="og:description"]', 'content', desc);
      setMeta('meta[property="og:url"]', 'content', site + canonical);
      setMeta('meta[property="og:locale"]', 'content', locale);
      setMeta('meta[name="twitter:title"]', 'content', title);
      setMeta('meta[name="twitter:description"]', 'content', desc);

      const canonEl = d.head.querySelector('link[rel="canonical"]');
      if (canonEl) canonEl.setAttribute('href', site + canonical);

      /* hreflang: se reconstruye el clúster completo */
      d.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
      const anchor = canonEl || d.head.lastElementChild;
      for (const [hl, href] of Object.entries(alternates)) {
        const link = d.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', hl);
        link.setAttribute('href', site + href);
        anchor.after(link);
      }
      const xdef = d.createElement('link');
      xdef.setAttribute('rel', 'alternate');
      xdef.setAttribute('hreflang', 'x-default');
      xdef.setAttribute('href', site + langMapEs);
      anchor.after(xdef);

      /* Enlaces internos → equivalente en el idioma (salvo el selector de idioma) */
      d.querySelectorAll('a[href]').forEach((a) => {
        if (a.hasAttribute('data-lang-switch')) return;
        const href = a.getAttribute('href');
        if (!href || !href.startsWith('/')) return;
        const [base, hash] = href.split('#');
        const mapped = urlMap[base || '/'];
        if (mapped) a.setAttribute('href', mapped + (hash ? '#' + hash : ''));
      });

      /* JSON-LD: @id propio por idioma salvo la entidad Restaurant (es la misma) */
      d.querySelectorAll('script[type="application/ld+json"]').forEach((s) => {
        let data;
        try { data = JSON.parse(s.textContent); } catch { return; }
        const prefix = canonical.replace(/\/$/, '');
        const walk = (node) => {
          if (Array.isArray(node)) return node.forEach(walk);
          if (!node || typeof node !== 'object') return;
          if (typeof node['@id'] === 'string' && node['@id'].startsWith(site + '/#')
              && node['@id'] !== site + '/#restaurant') {
            node['@id'] = site + prefix + '/#' + node['@id'].split('#')[1];
          }
          if ('inLanguage' in node && typeof node.inLanguage === 'string') node.inLanguage = lang;
          Object.values(node).forEach(walk);
        };
        walk(data);
        s.textContent = JSON.stringify(data, null, 2);
      });

      /* Limpieza de estado de runtime que no debe quedar serializado */
      d.querySelectorAll('.reveal.active').forEach((el) => el.classList.remove('active'));
      const bar = d.getElementById('mobileCtaBar');
      if (bar) { bar.classList.remove('visible'); bar.setAttribute('aria-hidden', 'true'); }
      d.body.classList.remove('cta-bar-visible');
      const iframe = d.getElementById('reservaIframe');
      if (iframe) iframe.setAttribute('src', '');

      return '<!DOCTYPE html>\n' + d.documentElement.outerHTML + '\n';
    }, {
      lang,
      site: SITE,
      canonical: URL_MAP[lang][page.esPath],
      langMapEs: URL_MAP.es[page.esPath],
      alternates: Object.fromEntries(
        Object.keys(URL_MAP)
          .filter((l) => URL_MAP[l][page.esPath])
          .map((l) => [l, URL_MAP[l][page.esPath]])
      ),
      title: DICT[lang][page.titleKey],
      desc: DICT[lang][page.descKey],
      locale: LOCALE[lang],
      urlMap: URL_MAP[lang],
    });

    if (errors.length) console.warn(`  ⚠ errores JS en ${page.src} (${lang}):`, errors);

    const dest = path.join(ROOT, outFile);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, html, 'utf8');
    results.push(`${outFile}  (${(html.length / 1024).toFixed(0)} kB)`);
    await tab.close();
  }
}

await browser.close();
server.close();

console.log('Generado:');
results.forEach((r) => console.log('  ' + r));

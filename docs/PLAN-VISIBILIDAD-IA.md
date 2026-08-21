# Plan de visibilidad en IA — Corte de Manga

> Cómo conseguir que ChatGPT, Claude, Gemini, Perplexity y Grok recomienden Corte de Manga
> cuando alguien pregunta dónde comer tapas en Barcelona. Sin pagar una suscripción mensual.
>
> Última actualización: 2026-08-21

---

## 0. Punto de partida: qué es verdad del informe de Cytd y qué no

Cytd.ai (299 $/mes) envió dos informes diciendo que la web es "invisible" para la IA, con una
puntuación de 10 y 15 sobre 100. Esto es lo que se sostiene y lo que no.

### Es verdad

En preguntas genéricas del tipo *"best tapas bars in Eixample"* o *"mejores tapas de
Barcelona"*, **Corte de Manga no aparece**. Se comprobó lanzando esas búsquedas: las respuestas
se construyen citando guías de terceros (theculturetrip, theinfatuation, corner.inc,
barcelonafoodexperience, foodieinbarcelona, Yelp, TripAdvisor) y en ninguna de esas listas
estamos. Esa es la pérdida real y es el problema que resuelve este documento.

### No es verdad

| Afirmación de Cytd | Realidad |
|---|---|
| "Lack of an explicitly maintained llms.txt file" | `llms.txt` existe desde antes del informe |
| "Absence of rich FAQ pages" | Había FAQ con `FAQPage` schema (ahora hay 21 preguntas) |
| "Limited optimization of unstructured menu for semantic AI crawlers" | La carta entera está en `schema.org/Menu` con precios |
| "Visibility 3%" (la IA no puede acceder al contenido) | `robots.txt` permite explícitamente GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended y Applebot-Extended |
| "multi-language (Spanish, English, Catalan, French, Italian)" | Solo hay ES / EN / CA. El francés e italiano se los inventaron |
| "Not found" en las 5 plataformas | En consultas long-tail (*"gastrobar Eixample cocina de mercado abierto todos los días"*) la web sale **la primera** y la IA la recomienda por nombre |

Además, **los dos informes se contradicen entre sí sobre el mismo dominio**: uno da 10 puntos y
el otro 15; Visibility 15 % vs 3 %; Authority 20 % vs 12 %; Coverage 20 % vs 13 %. Es una
puntuación propietaria que ellos definen y por cuya subida cobran. No es una métrica del sector.

### Lo que ellos no detectaron

Dos problemas reales que sí existían y ya están corregidos en el repo:

1. **El H1 de la home estaba roto.** Decía solo "CORTE": el JavaScript de traducción destruía
   "DE MANGA" en cada carga. El titular principal es una de las señales más fuertes que lee
   cualquier rastreador.
2. **Inglés y catalán no existían para los rastreadores.** Eran un cambio de textos por
   JavaScript sobre la misma URL, y los `hreflang` de los tres idiomas apuntaban a la home
   española. Para Google y para los bots de IA, la web era monolingüe.

---

## 1. Cómo se construye de verdad una respuesta de IA sobre restaurantes

Esto es lo que hay que entender antes de gastar un euro o una hora:

**Cuando alguien pregunta "¿cuáles son los mejores bares de tapas del Eixample?", el modelo no
consulta la web del restaurante.** Hace una búsqueda, recoge tres o cuatro páginas que *ya son
listas de restaurantes*, y resume esas listas.

Es decir: **te recomienda si sales en las listas de otros**. Tu propia web sirve para dos cosas
distintas:

- Que cuando alguien pregunta **por ti** (o por algo muy específico: "gastrobar del Eixample
  abierto a las 8 de la mañana"), la IA te encuentre y te describa **bien y sin inventarse
  nada**. Eso ya funciona y ahora funciona mejor.
- Que cuando una guía o un periodista te busque para incluirte en su lista, encuentre los datos
  ordenados y no tenga que llamarte.

Lo que **no** hace tu web es meterte en la lista. Eso se gana fuera. Por eso el subdominio de
blog que vende Cytd es una respuesta débil al problema: es más contenido tuyo hablando de ti.

**Reparto realista del esfuerzo: 20 % web, 80 % fuera.** La parte del 20 % ya está hecha.

---

## 2. Prioridades, en orden

Ordenado por impacto real sobre las respuestas de IA, no por lo que es más fácil.

### Prioridad 1 — Google Business Profile (la base de todo)

Casi todos los modelos, cuando se les pregunta por un negocio local, acaban apoyándose en datos
que salen de Google Maps: nombre, categoría, horario, valoración, atributos. Si la ficha está
incompleta, la IA rellena los huecos con suposiciones o te descarta.

Hay una guía detallada en [`GUIA-SEO-LOCAL.md`](../GUIA-SEO-LOCAL.md). Lo urgente ahora mismo,
con los datos que confirmasteis:

- [ ] **Horario de cocina.** La ficha dice 08:00–01:00. Añadir en la descripción y en los
      atributos que **la cocina sirve hasta las 23:00**. Es la primera causa de reseña negativa
      evitable ("llegamos a las 00:00 y no nos dieron de cenar").
- [ ] **Atributos que son un "sí" y hay que marcar**: terraza, accesible en silla de ruedas,
      wifi gratis, admite perros, opciones veganas, acepta reservas, pago con tarjeta.
- [ ] **Atributo que es un "no" y hay que dejar sin marcar**: opciones sin gluten. No marcarlo
      protege de una reseña de una persona celíaca.
- [ ] Categoría principal `Bar de tapas`; secundarias `Gastrobar`, `Restaurante`, `Bar de copas`.
- [ ] Enlace de reservas apuntando a `https://cortedemanga.es/#reservas`.
- [ ] Subir fotos cada semana y publicar un Google Post cada 7–10 días.

### Prioridad 2 — Entrar en las listas que la IA cita

Aquí está el 80 % del problema. Objetivos concretos, con lo que hay que hacer en cada uno.

**Ya estáis (verificado) — solo hay que mantenerlo al día:**

| Sitio | Qué hacer |
|---|---|
| TripAdvisor | Reclamar la ficha si no está reclamada. Actualizar horario de cocina, fotos, responder reseñas |
| TheFork / ElTenedor | Ficha activa. Revisar que el horario de cocina y los menús de grupo estén bien |
| Google Maps | Ver prioridad 1 |
| Instagram (@cortedemangabcn) | Bio con dirección + horario de cocina + enlace de reservas |
| Privateaser | Ficha de grupos: comprobar que los precios (32/38/48 €) coinciden con la web |

**No estáis y hay que entrar (por orden de facilidad):**

| Objetivo | Tipo | Cómo se entra |
|---|---|---|
| Yelp España | Directorio | Alta gratuita y reclamar ficha |
| Bcnrestaurantes.com | Directorio local | Formulario de alta; encaja el filtro "cocina ininterrumpida" |
| Barcelona Secreta | Medio local | Contacto de prensa / propuesta de reportaje |
| Time Out Barcelona | Medio | Contacto de la sección de restaurantes |
| Guía Repsol | Guía | Formulario de propuesta de establecimiento |
| Barcelona Food Experience | Blog gastronómico | Email al autor (aparece en listas de "best tapas") |
| Foodie in Barcelona | Blog | Email al autor |
| The Culture Trip | Medio internacional | Formulario de contacto / propuesta |
| The Infatuation Barcelona | Medio internacional | Contacto editorial |
| Corner.inc (guías de barrio) | Guía | Contacto / alta |
| Mana75 y blogs de barrio del Eixample | Blogs locales | Email directo |

> Realista: de diez contactos responderán dos o tres. Con que entréis en tres o cuatro listas
> de estas, empezaréis a aparecer en respuestas genéricas. No es instantáneo: los modelos
> tardan semanas o meses en incorporar contenido nuevo.

### Prioridad 3 — Wikidata

Wikidata es una base de datos abierta que los modelos consumen de forma directa y estructurada.
Crear una entrada para Corte de Manga es gratis, legítimo y tarda 20 minutos:

1. Crear cuenta en [wikidata.org](https://www.wikidata.org).
2. Nuevo elemento: etiqueta `Corte de Manga`, descripción `gastrobar de tapas en Barcelona`.
3. Declaraciones: `instancia de` → restaurante; `país` → España; `ubicación administrativa` →
   Barcelona; `dirección postal` → Carrer del Comte d'Urgell 108; `coordenadas` →
   41.38465, 2.15385; `sitio web oficial` → https://cortedemanga.es; `fecha de fundación` → 2019.

No inventar premios ni menciones que no existan: Wikidata se revisa y se revierte.

### Prioridad 4 — Reseñas: cantidad, frescura y respuesta

4,6 con 550+ reseñas ya es bueno. Lo que más pesa a partir de aquí es la **frescura** (reseñas
de este mes) y que **estén respondidas**.

- [ ] QR en la mesa o en el ticket que lleve directo a dejar reseña en Google.
- [ ] Responder **todas** las reseñas, también las malas, en menos de 48 h. Las respuestas son
      texto indexable donde podéis repetir de forma natural "gastrobar en el Eixample",
      "cocina hasta las 23:00", "menús de grupo".
- [ ] Si una reseña negativa se queja de algo que ya está resuelto, decirlo en la respuesta.

---

## 3. Emails listos para enviar

Copiad, cambiad lo que va entre corchetes y enviad. Uno por día es suficiente.

### 3.1 A un blog o guía gastronómica local (español)

> **Asunto:** Gastrobar en Comte d'Urgell para vuestra guía del Eixample
>
> Hola [nombre]:
>
> Os escribo desde Corte de Manga, un gastrobar de tapas en Comte d'Urgell 108, en la Esquerra
> de l'Eixample. Llevamos abiertos desde 2019 y tenemos 4,6 en Google con más de 550 reseñas.
>
> He visto vuestra guía de [nombre del artículo] y creo que encajaríamos por un motivo
> concreto: **abrimos a las 08:00 todos los días y la cocina no para hasta las 23:00**, algo
> poco habitual en la zona. Eso nos convierte en una opción tanto para desayunar como para
> cenar tarde entre semana.
>
> Nuestros platos más conocidos son las alcachofas de Tudela confitadas con jamón ibérico y
> yema, la carrillera al vino tinto y la burrata Secchiello. Toda la carta con precios está en
> https://cortedemanga.es/#carta
>
> Si os encaja, estaré encantado de invitaros a venir a probarlo cuando queráis, sin
> compromiso de que escribáis nada.
>
> Un saludo,
> [nombre] — Corte de Manga
> +34 623 216 562 · https://cortedemanga.es

### 3.2 A un medio o guía internacional (inglés)

> **Subject:** Tapas gastrobar in the Eixample — open 08:00 to 01:00, seven days a week
>
> Hi [name],
>
> I'm writing from Corte de Manga, a tapas gastrobar at Comte d'Urgell 108, in the Esquerra de
> l'Eixample. We opened in 2019 and hold 4.6 stars with 550+ Google reviews.
>
> I saw your [article name] guide. One thing that might make us a useful addition: **we open at
> 08:00 every single day and the kitchen runs until 23:00**, which is unusual for this part of
> Barcelona — it makes us one of the few places locals can use for both an early breakfast and
> a late weekday dinner.
>
> Signature dishes are confit Tudela artichokes with Iberian ham and egg yolk, pork cheek
> braised in red wine, and Burrata Secchiello. Full menu with prices:
> https://cortedemanga.es/en/
>
> Happy to host you any time if you'd like to try it, with no expectation of coverage.
>
> Best,
> [name] — Corte de Manga
> +34 623 216 562 · https://cortedemanga.es/en/

### 3.3 A un directorio (alta rápida)

> **Asunto:** Alta de establecimiento — Corte de Manga (Eixample, Barcelona)
>
> Buenos días:
>
> Me gustaría dar de alta nuestro establecimiento en vuestro directorio. Os paso los datos:
>
> - **Nombre:** Corte de Manga
> - **Tipo:** Gastrobar · Bar de tapas
> - **Dirección:** Carrer del Comte d'Urgell 108, 08011 Barcelona (Esquerra de l'Eixample)
> - **Teléfono / WhatsApp:** +34 623 216 562
> - **Email:** info@cortedemanga.com
> - **Web:** https://cortedemanga.es
> - **Horario:** todos los días de 08:00 a 01:00 (cocina de 08:00 a 23:00)
> - **Rango de precio:** €€ (25–40 € por persona)
> - **Servicios:** terraza, accesible en silla de ruedas, wifi, admite perros, opciones
>   veganas, acepta reservas, pago con tarjeta
> - **Menús de grupo:** desde 32 € por persona, de 4 a 15 personas
>
> Quedo a vuestra disposición para cualquier dato adicional o fotografías.
>
> Un saludo,
> [nombre] — Corte de Manga

---

## 4. Textos listos para copiar

**Regla de oro: el NAP (nombre, dirección, teléfono) debe ser idéntico, letra por letra, en
todas partes.** Las variaciones confunden a Google y a los modelos.

```
Corte de Manga
Carrer del Comte d'Urgell, 108
08011 Barcelona
+34 623 216 562
```

> Nota: el código postal correcto es **08011**. En la web había sitios con 08015; ya está
> unificado. Revisad que en Google, TheFork y TripAdvisor también ponga 08011.

### Descripción para Google Business Profile (750 caracteres)

> Gastrobar y bar de tapas en el Eixample de Barcelona, en Comte d'Urgell 108, junto al metro
> Urgell. Desde 2019 hacemos cocina de mercado de verdad: recetas de siempre, producto fresco y
> tapas artesanales. Nuestras alcachofas de Tudela confitadas con jamón ibérico y yema, la
> carrillera al vino tinto y la burrata Secchiello son las más pedidas, junto a las croquetas
> caseras y las tortillas hechas al momento.
>
> Abrimos todos los días a las 08:00 y la cocina sirve hasta las 23:00, así que puedes venir a
> desayunar, comer, merendar o cenar. Después seguimos abiertos hasta la 01:00 para copas y
> coctelería de autor.
>
> Tenemos terraza, wifi, admitimos perros y el local es accesible. Menús de grupo desde 32 € por
> persona. Reservas en cortedemanga.es o por WhatsApp.

### Descripción corta (TheFork, TripAdvisor, directorios — 300 caracteres)

> Gastrobar de tapas en el Eixample de Barcelona. Cocina de mercado y tapas artesanales de 08:00
> a 23:00 todos los días; copas hasta la 01:00. Terraza, opciones veganas, admite perros. Menús
> de grupo desde 32 €. Comte d'Urgell 108, junto al metro Urgell.

### Bio de Instagram

> Gastrobar · Tapas de mercado
> Comte d'Urgell 108, Eixample BCN
> Cocina 08:00–23:00 · Copas hasta 01:00
> Reservas ↓

### Ideas de Google Posts (uno cada 7–10 días)

Rotad entre estos ángulos, siempre con botón "Reservar" hacia `cortedemanga.es/#reservas`:

- Plato de temporada con foto y precio
- "Abrimos a las 08:00 también los domingos"
- Un cóctel de la carta de autor
- Menús de grupo (antes de puentes, Navidad, fin de curso)
- Detrás de la barra: quién cocina, cómo se hacen las croquetas

---

## 5. Lo que NO vamos a hacer

Cytd menciona que "participan en conversaciones online (como en Reddit)" para que la IA os
mencione. Conviene ser explícito sobre el límite:

- **No** escribir reseñas falsas ni pedirlas a cambio de nada. Es ilegal en la UE
  (Directiva Omnibus) y Google penaliza la ficha.
- **No** publicar en Reddit, foros o grupos haciéndose pasar por un cliente satisfecho. Es
  astroturfing, va contra las normas de esas plataformas y cuando se descubre el daño es peor
  que el beneficio.
- **Sí** participar identificándose como el restaurante cuando alguien pregunta
  ("Hola, somos Corte de Manga, respondemos a lo que preguntas…").
- **Sí** invitar a periodistas y creadores sin condicionar lo que escriban.

---

## 6. Calendario de 90 días

**Semanas 1–2 — la base**
- [ ] Google Business Profile: horario de cocina, atributos, categorías, enlace de reservas
- [ ] Comprobar NAP idéntico (08011) en Google, TheFork, TripAdvisor, Instagram
- [ ] Reclamar ficha de TripAdvisor si no está reclamada
- [ ] Crear entrada en Wikidata
- [ ] Poner el QR de reseñas en las mesas

**Semanas 3–6 — entrar en listas**
- [ ] Alta en Yelp España y Bcnrestaurantes
- [ ] Enviar 1 email al día de la tabla de la Prioridad 2 (empezando por los blogs locales)
- [ ] Responder todas las reseñas pendientes
- [ ] Primer Google Post

**Semanas 7–12 — mantener y medir**
- [ ] Google Post cada 7–10 días, fotos nuevas cada semana
- [ ] Segunda ronda de emails a quien no respondió (una sola vez, sin insistir más)
- [ ] Primera medición completa con [`MONITORIZACION-IA.md`](MONITORIZACION-IA.md)
- [ ] Comparar con la medición inicial y decidir dónde insistir

---

## 7. Qué esperar

Sed escépticos con cualquiera que prometa resultados en 40-60 días, como hace Cytd.

- **Semanas 1–4:** mejora en preguntas específicas y de marca. La IA os describe mejor y sin
  errores. Esto ya debería notarse con lo que está desplegado.
- **Semanas 4–12:** si entráis en dos o tres guías, empezaréis a aparecer de forma intermitente
  en preguntas de barrio ("gastrobar cerca de Urgell").
- **Más allá de 3 meses:** aparecer de forma estable en "mejores tapas de Barcelona" es difícil
  y compite con sitios con miles de reseñas y décadas de prensa. Un objetivo más realista y más
  rentable es dominar el nicho donde ya sois diferentes: **desayunar temprano, cenar hasta las
  23:00 todos los días, y grupos en el Eixample**.

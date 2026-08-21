# Monitorización de visibilidad en IA — hazlo tú en 15 minutos al mes

> Esto es lo que Cytd cobra como "continuous weekly monitoring on every platform" dentro de su
> suscripción de 299 $/mes. Es útil, pero no es más que lanzar unas preguntas fijas cada cierto
> tiempo y apuntar si sales o no. Aquí está el procedimiento para hacerlo por vuestra cuenta.

---

## Cómo se hace

Una vez al mes, el mismo día (por ejemplo el día 1), abrid las cinco herramientas y lanzad las
preguntas de la lista de abajo **tal cual, sin cambiar una coma**. Si cambiáis la redacción, los
resultados dejan de ser comparables entre meses y la medición no sirve.

**Muy importante: usad una ventana de incógnito o sin sesión iniciada.** Si estáis logueados,
el modelo puede recordar conversaciones anteriores sobre vuestro restaurante y os dará un
resultado falsamente positivo.

Las cinco plataformas:

| Plataforma | Dónde |
|---|---|
| ChatGPT | chatgpt.com |
| Claude | claude.ai |
| Gemini | gemini.google.com |
| Perplexity | perplexity.ai |
| Grok | grok.com |

Para cada pregunta y plataforma anotad una de estas tres cosas:

- **SÍ** — Corte de Manga aparece recomendado por su nombre
- **MENCIÓN** — aparece de pasada, o solo si se insiste con una segunda pregunta
- **NO** — no aparece

Anotad también **qué fuentes cita la respuesta** cuando las muestre (Perplexity y ChatGPT las
enseñan casi siempre). Eso es lo más valioso del ejercicio: **esa lista de fuentes es
exactamente la lista de sitios en los que hay que estar**. Si aparece un blog o una guía nueva
que no está en `PLAN-VISIBILIDAD-IA.md`, añadidla a la lista de objetivos.

---

## Las preguntas

### Bloque A — genéricas (las difíciles; aquí se gana o se pierde)

1. ¿Cuáles son los mejores bares de tapas del Eixample de Barcelona?
2. What are the top rated gastrobars with homemade tapas in Eixample, Barcelona?
3. ¿Me recomiendas un buen bar de tapas en Barcelona con cocina de mercado?
4. Best gastrobar near Urgell metro for late dinner and cocktails?
5. ¿Dónde cenar tapas en Barcelona un jueves por la noche?

### Bloque B — de nicho (donde sois realmente diferentes; deberían caer antes)

6. ¿Dónde puedo desayunar temprano en el Eixample de Barcelona un domingo?
7. Where can I find a gastrobar open all day serving market cuisine in Barcelona?
8. ¿Qué bares del Eixample sirven cocina hasta las 23:00 todos los días?
9. ¿Dónde comer en grupo en el Eixample con menú cerrado?
10. ¿Hay algún bar de tapas en el Eixample que admita perros y tenga terraza?
11. Are there any good tapas spots in Eixample open seven days a week?

### Bloque C — de marca (control: si estas fallan, hay un problema serio)

12. ¿Qué es Corte de Manga Barcelona?
13. ¿Cuál es el horario de Corte de Manga en Comte d'Urgell?
14. ¿Tiene Corte de Manga opciones veganas?

> El bloque C sirve para detectar **alucinaciones**. Si un modelo dice que cerráis los lunes,
> que tenéis menú del día o que hay opciones sin gluten, eso es una respuesta falsa que os está
> costando clientes o generando reseñas negativas. Anotadlo aparte y corregid la fuente de donde
> lo saca (normalmente un directorio con datos viejos).

---

## Plantilla de registro

Copiad esta tabla a una hoja de cálculo, una pestaña por mes.

| # | Pregunta | ChatGPT | Claude | Gemini | Perplexity | Grok | Fuentes citadas |
|---|---|---|---|---|---|---|---|
| 1 | Mejores bares de tapas del Eixample | | | | | | |
| 2 | Top rated gastrobars Eixample | | | | | | |
| 3 | Bar de tapas con cocina de mercado | | | | | | |
| 4 | Gastrobar near Urgell, late dinner | | | | | | |
| 5 | Dónde cenar tapas un jueves | | | | | | |
| 6 | Desayunar temprano en domingo | | | | | | |
| 7 | Open all day, market cuisine | | | | | | |
| 8 | Cocina hasta las 23:00 | | | | | | |
| 9 | Comer en grupo con menú cerrado | | | | | | |
| 10 | Admite perros y terraza | | | | | | |
| 11 | Open seven days a week | | | | | | |
| 12 | ¿Qué es Corte de Manga? | | | | | | |
| 13 | Horario de Corte de Manga | | | | | | |
| 14 | ¿Tiene opciones veganas? | | | | | | |

**Puntuación mensual:** contad los SÍ (2 puntos) y las MENCIONES (1 punto) sobre un máximo de
140 (14 preguntas × 5 plataformas × 2). Es un número tan arbitrario como el "Cytd Score", pero
al menos sabéis cómo se calcula y es comparable consigo mismo mes a mes.

---

## Medición inicial (línea base)

Antes de empezar, dejad constancia del punto de partida. Según los informes de Cytd de agosto
de 2026 y las comprobaciones propias:

- **Bloque A (genéricas):** 0 de 5. Las respuestas citaban theculturetrip, theinfatuation,
  corner.inc, barcelonafoodexperience, foodieinbarcelona, Yelp y TripAdvisor, y recomendaban
  Cervecería Catalana, Tapas 24, Alegría, Paco Meralgo y Taktika Berri.
- **Bloque B (nicho):** al menos 1 de 6 ya funcionaba — en *"gastrobar Eixample cocina de
  mercado abierto todos los días"* cortedemanga.es salía como resultado principal y la IA lo
  recomendaba por nombre citando la web propia.
- **Bloque C (marca):** funcionaba, con el matiz de que el horario se comunicaba como
  "08:00–01:00" sin aclarar que la cocina cierra a las 23:00. Ya está corregido en la web,
  falta corregirlo en Google Business Profile y en los directorios.

Repetid la medición completa **un mes después de desplegar los cambios** y luego cada mes.

---

## Qué hacer con el resultado

- **Si el bloque C falla o alucina:** urgente. Buscad de dónde saca el dato falso (suele ser un
  directorio desactualizado) y corregidlo en el origen.
- **Si el bloque B no mejora en 2–3 meses:** el contenido de nicho no está siendo encontrado.
  Revisad que las páginas estén indexadas en Google Search Console.
- **Si el bloque A no se mueve:** es lo esperado hasta que entréis en guías de terceros. No es
  un fallo de la web; es que faltan las menciones externas. Volved a
  [`PLAN-VISIBILIDAD-IA.md`](PLAN-VISIBILIDAD-IA.md), sección 2, prioridad 2.
- **Fuentes nuevas que aparezcan citadas:** añadidlas a la lista de objetivos. Es la información
  más accionable que da este ejercicio.

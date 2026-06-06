# Brief técnico — Reservas de grupo en la app de reservas
## Corte de Manga · Programador de la aplicación

> **Contexto:** La web `cortedemanga.es` tiene una nueva página `/grupos` con tres
> niveles de menú cerrado (Essencial 32€, Corte de Manga 38€, Taula Plena 48€).
> Actualmente el usuario puede reservar grupo por WhatsApp o teléfono. El objetivo
> de esta iteración es añadir un **flujo de reserva de grupo dentro de la aplicación**
> para que quede registrado en Supabase igual que las reservas individuales.

---

## 1. Resumen de lo que se pide

Añadir en la app de reservas un **tipo de reserva "Grupo"** con campos específicos
(menú elegido, número de personas, alergias/intolerancias) y un flow diferenciado
del de reserva individual.

---

## 2. Punto de entrada desde la web

La página `cortedemanga.es/grupos` tiene un botón "Formulario de reserva" que
actualmente abre el modal general de reservas individual (embed en iframe):

```
https://aplicaci-n-reservas.vercel.app/es/embed
```

Cuando esté listo el flow de grupos, ese botón debe apuntar a:

```
https://aplicaci-n-reservas.vercel.app/es/embed?tipo=grupo
```

O bien a una ruta propia:

```
https://aplicaci-n-reservas.vercel.app/es/grupos
```

Lo que sea más cómodo para la arquitectura de la app. Se lo indicaremos al
programador web para actualizar el `src` del iframe.

---

## 3. Campos del formulario de reserva de grupo

### Campos nuevos (no existen en la reserva individual)

| Campo | Tipo | Obligatorio | Valores posibles |
|---|---|---|---|
| `tipo_reserva` | string fijo | Sí | `"grupo"` |
| `menu_nivel` | select | Sí | `essencial` / `corte_de_manga` / `taula_plena` |
| `num_personas` | número entero | Sí | Mín. 4 (Essencial/CDM) · Mín. 8 (Taula Plena) |
| `alergias` | texto libre | No | Campo abierto |

### Validaciones de negocio

- Si `menu_nivel = taula_plena` y `num_personas < 8` → mostrar error:
  *"El menú Taula Plena requiere un mínimo de 8 personas."*
- Si `num_personas < 4` → mostrar error:
  *"Los menús de grupo son a partir de 4 personas."*

### Campos que se mantienen igual que en reserva individual

- Nombre y apellido
- Teléfono
- Email
- Fecha
- Hora (rango disponible: 13:00–16:00 para comidas / 20:00–23:00 para cenas)
- Ocasión especial (cumpleaños, empresa, etc.) — campo opcional ya existente o nuevo

---

## 4. Descripción de cada menú (para mostrar en el formulario)

Mostrar un resumen debajo del selector de menú cuando el usuario elige uno:

**Essencial · 32€/persona · desde 4 personas**
> 4 platos para compartir · segundo a elegir · postre

**Corte de Manga · 38€/persona · desde 4 personas**
> 6 platos para compartir · segundo a elegir · postre

**Taula Plena · 48€/persona · desde 8 personas**
> 7 platos + jamón ibérico cortado a cuchillo · segundo a elegir · postre

---

## 5. Tabla en Supabase

Si las reservas individuales y de grupo están en tablas separadas, crear una tabla
`reservas_grupo`. Si están en la misma tabla `reservas`, añadir columnas:

```sql
ALTER TABLE reservas
  ADD COLUMN tipo_reserva   TEXT    DEFAULT 'individual',
  ADD COLUMN menu_nivel     TEXT,   -- 'essencial' | 'corte_de_manga' | 'taula_plena'
  ADD COLUMN num_personas   INT,
  ADD COLUMN alergias       TEXT;
```

---

## 6. Confirmación al usuario y al restaurante

### Email al cliente (tras confirmar la reserva)
Mismo sistema que la reserva individual, añadiendo en el cuerpo del email:

```
Menú elegido: Corte de Manga (38€/persona)
Número de personas: 10
Precio estimado: 380€ (sin bebidas)
Alergias indicadas: Sin gluten (2 personas)
```

### Notificación interna al restaurante
Igual que con las reservas individuales. Si hay un panel de administración,
las reservas de grupo deben aparecer diferenciadas (etiqueta "GRUPO" en color
distinto o en pestaña separada).

---

## 7. postMessage al confirmar (para tracking Google Ads)

Igual que se solicitó para las reservas individuales: cuando Supabase confirme
la reserva de grupo, enviar:

```js
window.parent.postMessage({ type: 'reserva_confirmada', reserva_tipo: 'grupo' }, '*');
```

---

## 8. UX del formulario (sugerencias)

- **Paso 1:** Elegir tipo → seleccionan automáticamente "Grupo" al venir desde `/grupos`
- **Paso 2:** Elegir menú (selector con resumen descriptivo de cada nivel)
- **Paso 3:** Número de personas (con validación en tiempo real)
- **Paso 4:** Fecha y hora
- **Paso 5:** Datos personales + alergias
- **Paso 6:** Confirmación con resumen + precio estimado

El formulario puede ser de una sola página con scroll o multi-paso, como prefiera
el programador. Lo importante es que el **menú y el número de personas** aparezcan
en los primeros pasos (son la decisión principal del grupo).

---

## 9. Integración con la web (cambio que hará el programador web)

Una vez lista la nueva ruta/embed, el programador web actualizará en `grupos.html`:

```html
<!-- ANTES -->
<button onclick="openReservationModal()">Formulario de reserva</button>

<!-- DESPUÉS (opción A: iframe propio para grupos) -->
<iframe src="https://aplicaci-n-reservas.vercel.app/es/grupos" ...></iframe>

<!-- DESPUÉS (opción B: modal con query param) -->
src="https://aplicaci-n-reservas.vercel.app/es/embed?tipo=grupo"
```

---

## 10. Prioridad y alcance

| Prioridad | Tarea |
|---|---|
| Alta | Formulario con campos de grupo + validaciones |
| Alta | Guardar en Supabase con los nuevos campos |
| Alta | Email de confirmación al cliente con resumen del menú |
| Media | Panel admin: diferenciar reservas de grupo |
| Media | `postMessage` para tracking de conversión |
| Baja | Multi-idioma del formulario (es/en/ca) |

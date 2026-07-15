# Tracking de conversión de reservas (Google Ads)

## Cómo funciona ahora

- **Clicks en CTAs "Reservar Mesa"** → evento GA4 `reserva_click` (micro-conversión, NO conversión de Ads).
- **Conversión real de Google Ads** (`AW-18213186788/ZVVDCKDA07kcEOTZ3OxD`) se dispara solo cuando:
  - La app de reservas confirma una reserva y lo notifica vía `postMessage` (ver abajo), o
  - El usuario hace click en un CTA de WhatsApp o "Llamar" (intención fuerte directa).

Esto evita que Google Ads optimice hacia gente que solo abre el modal sin reservar.

## Cambio pendiente en la app de reservas (repo `Aplicaci-n-reservas`)

En la pantalla/handler de **reserva confirmada** del embed (`/es/embed`), añadir:

```js
// Notificar a la web padre (cortedemanga.es) que la reserva se ha completado
if (window.parent !== window) {
  window.parent.postMessage({ type: 'cmReservaConfirmada' }, 'https://cortedemanga.es');
}
```

La web ya escucha ese mensaje (`index.html`, listener `cmReservaConfirmada`) y dispara la
conversión de Google Ads + evento GA4 `reserva_conversion`.

Mientras este cambio no esté desplegado en la app de reservas, las únicas conversiones de Ads
registradas serán las de WhatsApp/llamada — tenerlo en cuenta al leer las campañas.

## Consejo para las campañas

Para anuncios con intención directa de reserva, usar como URL final:
`https://cortedemanga.es/#reservas` — abre el formulario de reserva automáticamente al aterrizar.

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './carta.js', './traducciones.js'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        bgDark: '#050505',
        fgLight: '#EBEBEB',
        accent: '#B12A2A',
        grid: '#333333',
      },
    },
  },
  // Clases que el JS añade en tiempo de ejecución vía classList — forzamos su inclusión
  safelist: [
    'hidden',
    'font-bold',
    'text-fgLight',
    'text-fgLight/50',
    'translate-y-full',
  ],
  plugins: [],
};

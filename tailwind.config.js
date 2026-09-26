/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FDF6EC',
        'warm-sand': '#F6E7D8',
        dusty: '#EAD9C4',
        trunk: '#6B4A34',
        'trunk-light': '#8A5E42',
        sage: '#7C9070',
        olive: '#9CAF88',
        'amber-leaf': '#D98E4A',
        burnt: '#C1440E',
        'deep-green': '#4E6E58',
        terracotta: '#E07A3F',
        'terracotta-dark': '#C96A2F',
        'warm-brown': '#3B2E27',
        peach: '#F4D4B8',
        'soft-gold': '#F2E2C4',
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Nunito', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      animation: {
        sway: 'sway 6s ease-in-out infinite',
        drift: 'drift 50s ease-in-out infinite',
        'drift-slow': 'drift 70s ease-in-out infinite',
        'float-up': 'floatUp 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};

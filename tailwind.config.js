/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sua paleta de cores personalizada
        'primary': {
          '50': '#fff4ed',
          '100': '#ffe7d6',
          '200': '#ffc8ac',
          '300': '#ffa681',
          '400': '#ff7c52',
          '500': '#FF4E00', // Cor Principal: Aerospace Orange
          '600': '#e64600',
          '700': '#c03a00',
          '800': '#9a2f00',
          '900': '#7d2800',
          '950': '#421200',
        },
        'secondary': {
          '50': '#fff7f0',
          '100': '#ffeedb',
          '200': '#ffe0c2',
          '300': '#FFC280', // Cor Secundária: Fawn
          '400': '#ffb56f',
          '500': '#ffa14d',
          '600': '#e6892e',
          '700': '#c06d1f',
          '800': '#9a571a',
          '900': '#7d4817',
          '950': '#42220b',
        },
        'text': '#1D1C1B',     // Eerie Black
        'accent1': {
          '50': '#f0f7f3',
          '100': '#dfeee7',
          '200': '#c5e0d3',
          '300': '#a2cdb8',
          '400': '#7fb89a',
          '500': '#6B9E83', // Cambridge Blue
          '600': '#57866d',
          '700': '#476f5a',
          '800': '#3b5a4b',
          '900': '#324a3f',
          '950': '#1c2a24',
        },
        'accent2': {
          '50': '#f7fbfb',
          '100': '#e6f4f4',
          '200': '#D4E7E6', // Azure Web
          '300': '#bce1df',
          '400': '#9dd2cf',
          '500': '#85c3c0',
          '600': '#6daeac',
          '700': '#5a908e',
          '800': '#4d7574',
          '900': '#426160',
          '950': '#2c4140',
        },
        'bg': '#FFF9F3',       // Sea Shell
      },
      fontFamily: {
        // Suas fontes personalizadas
        'sans': ['Inter', 'sans-serif'],
        'heading': ['"Bricolage Grotesque"', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        dark: '#1A1A1A',
        dark4: '#444444',
        blue: '#1D91FF',
        green: '#4BFF1B',
        red: '#FC0906',
        text: '#A1A1A1',
        white: '#FFF',
        purple: '#800080',
      },
      backgroundColor: {
        blue: '#1D91FF',
        dark32: '#323232',
        dark4: '#444444',
      },
      borderColor: {
        blue: '#1D91FF',
        white: '#FFF',
      },
    },
  },
  plugins: [],
};

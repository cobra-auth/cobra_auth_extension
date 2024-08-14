/** @type {import('tailwindcss').Config} */

export const content = ["./src/**/*.{html,tsx}"];
export const theme = {
  extend: {
    colors: {
      'imc-green': 'rgb(32, 166, 41)',
      'primary': 'hsl(41.217 75.163% 70%)',
      'status-online': 'rgb(58 191 126)',
      'dark': {
        500: 'rgb(189, 189, 189)',
        600: '#8ca4b5',
        700: '#1d2b3a',
        800: '#0d1824'
      },
      'trw-accent': {
        100: 'hsl(41.217 75.163% 90%)',
        200: 'hsl(41.217 75.163% 80%)',
        300: 'hsl(41.217 75.163% 70%)',
        400: 'hsl(41.217 75.163% 60%)',
        500: 'hsl(41.217 75.163% 50%)',
        600: 'hsl(41.217 75.163% 40%)',
        700: 'hsl(41.217 75.163% 30%)',
        800: 'hsl(41.217 75.163% 20%)',
        900: 'hsl(41.217 75.163% 10%)',
      }
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    animation: {
      'fade-in': 'fade-in 500ms',
    },
    transitionDelay: {
      '2000': '2000ms',
    },
    backgroundImage: {
      'primary-gradient': 'linear-gradient(94.38deg, #ECC879 -14.69%, #D46B32 210%)',
      'secondary-gradient': 'linear-gradient(4.38deg, #ECC879 -14.69%, #D46B32 210%)'
    }
  },
};
export const plugins = [
  // plugin(function ({ addUtilities }) {
  //   addUtilities({
  //     '.layout-expand': {
  //       'background': 'blue'
  //     }
  //   })
  // })
];
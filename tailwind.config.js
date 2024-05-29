/** @type {import('tailwindcss').Config} */

export const content = ["./src/**/*.{html,tsx}"];
export const theme = {
  extend: {
    colors: {
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
      'fade-in': 'fade-in 300ms',
    },
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
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        listprimarycolor: '#36495466',
        inputcolor: '#99aebb',
        focusring: '#5fedad',
        buttoncolor: '#7e56a6',
      },
      screens: {
        'sm': '500px',
        // => @media (min-width: 640px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  fontFamily: {
    Poppins: ['Montserrat', 'sans-serif'],
  },

  plugins: [require('@tailwindcss/forms')],
};

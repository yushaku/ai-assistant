const withMT = require('@material-tailwind/react/utils/withMT')

/** @type {import('tailwindcss').Config} */
// @ts-ignore:
module.exports = withMT({
  darkMode: 'class',
  content: [
    '../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)'],
        mono: ['var(--font-roboto-mono)']
      },
      colors: {
        teal: {
          DEFAULT: '#234f66'
        },
        gray: {
          DEFAULT: '#627480'
        },
        black: {
          DEFAULT: '#051320'
        },
        dark: {
          DEFAULT: '#181d27',
          50: '#2d3550',
          100: '#2d3549',
          200: '#1e2431',
          300: '#131c26'
        }
      },
      boxShadow: {
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        card: '0px 35px 120px -15px #211e35'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
      },
      animation: {
        'meteor-effect': 'meteor 5s linear infinite'
      },
      keyframes: {
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: 1 },
          '70%': { opacity: 1 },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: 0
          }
        }
      }
    }
  },
  // @ts-ignore
  plugins: [require('tailwindcss-animated')]
})

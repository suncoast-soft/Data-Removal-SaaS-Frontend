const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'pages/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: 'true',
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans]
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      colors: {
        primary: '#055fab',
        secondary: '#3ebeb8',
        darkMain: '#342E37',
        primary: '#A2D829',
        orangeMain: '#FA824C',
        blue50: '#F9FCFF',
        darkSecondary: '#48434B',
        blue: '#3B91E5'
      },
      backgroundImage: {
        'lp-hero-section-bg': "url('/hero-bg.png')",
        'lp-footer-bg':
          'linear-gradient(149.18deg, #FFFFFF 0%, #E2F1FF 90.71%)',
        'lp-blog-section-bg': "url('/lp-blog-section-bg.png')",
        'faqs-section-bg': "url('/faq/faqs-bg.png')",
        'blue-dots-bg': "url('/blue-dots-bg.png')",
        'result-faqs-bg':
          'linear-gradient(149.18deg, #FFFFFF 0%, #E2F1FF 90.71%)'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}

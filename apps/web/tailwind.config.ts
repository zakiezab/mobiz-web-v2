import type {Config} from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D8242A',
          dark: '#B01E23',
          100: '#F5E0E1',
          200: '#B01E23',
          300: '#F07378',
          400: '#D8242A',
          500: '#CF1920',
          600: '#B0161C',
          700: '#911217',
          800: '#720F13',
          900: '#540B0E',
        },
        secondary: {
          DEFAULT: '#613BFE',
          100: '#EEEBFB',
          200: '#E2DDF5',
          300: '#9C90CC',
          500: '#170E4A',
          600: '#3C2C7F',
          700: '#0F0A30',
          800: '#2A1E5C',
          900: '#181227',
        },
        dark: '#130E23',
        gray: {
          50: '#FAFAFA',
          100: '#F4F4F4',
          200: '#E0E0E0',
          400: '#A1A1A1',
          500: '#737373',
          600: '#525252',
          700: '#303030',
          800: '#363636',
          900: '#221F1F',
        },
        yellow: {
          DEFAULT: '#FFD000',
          100: '#F9F2D5',
        },
        orange: {
          DEFAULT: '#F9A931',
          100: '#FDEAD9',
        },
        pink: {
          DEFAULT: '#FF2D9F',
        },
        purple: {
          DEFAULT: '#A224DD',
        },
        blue: {
          DEFAULT: '#1854E8',
        },
      },
      fontFamily: {
        sans: ['var(--font-libre-franklin)', 'system-ui', 'sans-serif'],
        metrophobic: ['var(--font-metrophobic)'],
      },
      fontSize: {
        '7xl': ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '5xl': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '4xl': ['40px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        '3xl': ['28px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        '2xl': ['22px', { lineHeight: '1.5' }],
        'xl': ['18px', { lineHeight: '1.6' }],
        'base': ['16px', { lineHeight: '1.6' }],
        'sm': ['14px', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        'xs': ['12px', { lineHeight: '1.2', letterSpacing: '0.15em' }],
      },
      spacing: {
        xs: '0.5rem',    // 8px
        sm: '1rem',      // 16px
        md: '1.5rem',    // 24px
        lg: '2.5rem',    // 40px
        xl: '4rem',      // 64px
        '2xl': '6rem',   // 96px
        '3xl': '10rem',  // 160px
        '45': '11.25rem', // 180px for hero top padding
        '30': '7.5rem',   // 120px for hero bottom padding
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        wide: '0.01em',
        wider: '0.1em',
        widest: '0.15em',
      },
      maxWidth: {
        'container': '1600px',
        'content': '1200px',
        'prose': '720px',
        '900': '900px',
      },
      borderRadius: {
        sm: '2px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config

import type { Config } from 'tailwindcss';

/**
 * Treelands Foundation — design tokens.
 * Forest-themed palette. Change a value here and the whole site re-skins.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core forest palette
        forest: {
          50: '#f1f7f1',
          100: '#dcebdc',
          200: '#bbd7bb',
          300: '#8fbb8f',
          400: '#5e985e',
          500: '#3f7d3f',
          600: '#2f6330',
          700: '#274f28',
          800: '#214021',
          900: '#1c351d',
          950: '#0d1d0e',
        },
        leaf: {
          50: '#f3faec',
          100: '#e3f3d3',
          200: '#c8e8ac',
          300: '#a5d77b',
          400: '#84c252',
          500: '#65a834',
          600: '#4d8526',
          700: '#3c6622',
          800: '#33521f',
          900: '#2c451e',
        },
        moss: '#9caf88',
        bark: {
          DEFAULT: '#6b4f3a',
          light: '#8a6c52',
          dark: '#4a3526',
        },
        sand: '#f7f5ef',
        cream: '#fbfaf6',
        // Semantic tokens (reference these in components)
        primary: '#2f6330',
        secondary: '#65a834',
        accent: '#84c252',
        surface: '#ffffff',
        muted: '#5b6b58',
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        soft: '0 4px 20px -4px rgba(33, 64, 33, 0.12)',
        card: '0 10px 40px -12px rgba(33, 64, 33, 0.18)',
        glow: '0 0 0 4px rgba(132, 194, 82, 0.15)',
      },
      maxWidth: {
        container: '1200px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        float: 'float 3s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;

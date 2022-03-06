import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['**/*.{jsx,tsx,css}'],
    exclude: ['node_modules', '.git', '.next'],
  },
  theme: {
    extend: {
      width: {
        'card-1/3': 'calc(33.3% - 1.25rem)'
      },
      height: {
        main: 'calc(100vh - 146px)',
      },
      colors: {
        primary: {
          light: '#ECF4F3',
          DEFAULT: '#2FC3B1'
        },
        secondary: {
          DEFAULT: '#1E373F'
        },
        success: {
          DEFAULT: '#3CC4EF'
        },
        danger: {
          DEFAULT: '#FF7A50'
        },
        warning: {
          DEFAULT: '#FFD952'
        },
        light: {
          DEFAULT: '#F2F3F1'
        },
        dark: {
          DEFAULT: '#2D2F2E'
        },
        green: {
          100: '#E8F9F7',
          200: '#D4F3F1',
          300: '#C5F1EC',
          400: '#AFECE4',
          500: '#81E1D5',
          600: '#54D6C6',
          700: '#2FC3B1',
          800: '#239284',
          900: '#176057',
        },
        blue: {
          100: '#E3F8FF',
          200: '#A4E3F8',
          300: '#70D4F3',
          400: '#3CC4EF',
          500: '#12ABDC',
          600: '#0D7FA3',
          700: '#0B6987',
          800: '#09536B',
        },
        red: {
          100: '#FFE3DA',
          200: '#FFC0AC',
          300: '#FF9D7E',
          400: '#FF7A50',
          500: '#FF531D',
          600: '#E93800',
          700: '#D03200',
          800: '#B62C00',
        },
        yellow: {
          100: '#FFF2C5',
          200: '#FEE488',
          300: '#FFD952',
          400: '#FFCE1F',
          500: '#EBB700',
          600: '#D2A300',
          700: '#B89000',
          800: '#9F7C00',
        },
        gray: {
          100: '#F2F3F1',
          200: '#CED0CE',
          300: '#AEB2B0',
          400: '#8F9491',
          500: '#6E7370',
          600: '#4D514F',
          700: '#3D403E',
          800: '#2D2F2E',
        },
      }
    }
  }
})

import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/',
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        noto: ['Noto Sans TC:400,700'],
      },
    }),
  ],
  theme: {
    colors: {
      primary: {
        light: '#929259',
        DEFAULT: '#77772B',
      },
      white: '#FFFBF2',
      secondary: '#E5E5E5',
      darkgray: '#E3DEC7',
      gradient: 'linear-gradient(144.86deg, #FAF0DF -10.56%, #EDEDCC 114.15%)',
      yellow: {
        light: '#F8CC77',
        DEFAULT: '#FFC453',
      },
    },
  },
  shortcuts: {
    card: 'rounded-lg shadow-md bg-white text-primary text-center flex-col items-center justify-center p-5 mb-5',
    keyboard:
      'w-[55px] h-[40px] rounded-lg text-primary bg-transparent border-1 border-solid border-primary flex items-center justify-center',
  },
  safelist: [
    'bg-primary',
    'bg-primary-light',
    'bg-yellow-light',
    'bg-yellow',
    'i-clarity-favorite-solid',
    'i-clarity-favorite-line',
  ],
})

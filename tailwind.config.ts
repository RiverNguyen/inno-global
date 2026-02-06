import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: ['./src/**/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      lg: '1025px',
      sm: '640px',
      xlg: {
        max: '1024px',
      },
      xsm: {
        max: '639px',
      },
      tablet: {
        min: '640px',
        max: '1024px',
      },
    },
    extend: {
      fontFamily: {
        'open-sans': ['var(--font-open-sans)'],
      },
      colors: {
        en: '#090909',
        'en-60': 'rgba(9, 9, 9, 0.60)',
        'text-40': 'rgba(9, 9, 9, 0.40)',
        'text-60': 'rgba(9, 9, 9, 0.60)',
        'text-80': 'rgba(9, 9, 9, 0.80)',
        'text-100': '#090909',
        'primary-red-100': '#D32F2F',
        'sub-hightlight': '#D32F2F',
        'title-m': '#221910',
      },
      backgroundImage: {
        'gr-2': 'radial-gradient(298.39% 130.99% at 6.62% 16.15%, #CA2A2A 15.19%, #D32F2F 53.77%, #FF6E6E 100%)',
        'gr-2-reverse': 'radial-gradient(298.39% 130.99% at 6.62% 16.15%, #FF6E6E 0%, #D32F2F 46.23%, #CA2A2A 84.81%)',
      },
      boxShadow: {},
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.flex-center': {
          '@apply flex items-center justify-center': {},
        },
        '.flex-y-center': {
          '@apply flex items-center': {},
        },
        '.flex-x-center': {
          '@apply flex justify-center': {},
        },
        '.absolute-center': {
          '@apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2': {},
        },
        '.absolute-x-center': {
          '@apply absolute left-1/2 -translate-x-1/2': {},
        },
        '.absolute-y-center': {
          '@apply absolute top-1/2 -translate-y-1/2': {},
        },
        '.pc-24-24-semi': {
          '@apply text-[1.5rem] font-normal font-semibold leading-normal': {},
        },
        '.pc-body-16-r': {
          '@apply text-[0.83333rem] font-normal leading-normal tracking-[-0.01667rem]': {},
        },
        '.pc-h1-64-s': {
          '@apply text-[4rem] font-normal font-semibold leading-normal tracking-[-0.08rem]': {},
        },
        '.pc-body-20-r': {
          '@apply text-[1.25rem] font-normal leading-normal tracking-[-0.00625rem]': {},
        },
        '.pc-body-18-r-primary': {
          '@apply text-[1.125rem] font-normal leading-normal': {},
        },
        '.pc-body-14-sm': {
          '@apply text-[0.72917rem] font-semibold leading-normal': {},
        },
        '.pc-body-14-r': {
          '@apply text-[0.72917rem] font-normal leading-normal': {},
        },
        '.pc-sub-12-r': {
          '@apply text-[0.625rem] font-normal leading-normal tracking-[-0.00625rem]': {},
        },
        '.pc-body-18-m-primary': {
          '@apply text-[0.9375rem] font-semibold leading-normal': {},
        },
        '.pc-button-14-r': {
          '@apply text-[0.72917rem] font-normal leading-normal': {},
        },
        '.container': {
          '@apply w-[75rem] sm:mx-auto xsm:w-full max-w-[75rem] xsm:max-w-full': {},
        },
        '.mb-header-16-m': {
          '@apply text-[0.83333rem] font-semibold leading-normal': {},
        },
        '.mb-body-14-r': {
          '@apply text-[0.72917rem] font-normal leading-normal': {},
        },
      })
    }),
  ],
}
export default config

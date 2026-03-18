import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: ['./src/**/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      '2xl': '1536px',
      xl: '1280px',
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
        gradient: 'linear-gradient(180deg, #FFB2B2 23.97%, #D32F2F 81.78%)',
      },
      boxShadow: {},
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
      },
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
        '.pc-h2-54-s': {
          '@apply text-[2.5rem] font-normal font-semibold leading-[1.2] tracking-[-0.02813rem]': {},
        },
        '.pc-h3-40-s': {
          '@apply text-[2.08333rem] font-normal font-semibold leading-[1.2] tracking-[-0.03125rem]': {},
        },
        '.pc-34-34-m': {
          '@apply text-[1.77083rem] font-normal font-semibold leading-[1.2] tracking-[-0.01771rem] capitalize': {},
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
        '.pc-button-16-r': {
          '@apply text-[0.83333rem] font-normal leading-normal': {},
        },
        '.container': {
          '@apply w-[75rem] sm:mx-auto xsm:w-full max-w-[75rem] xsm:max-w-full': {},
        },
        '.mb-header-16-m': {
          '@apply text-[0.83333rem] font-semibold leading-normal': {},
        },
        '.mb-header-h1-26-semi': {
          '@apply text-[1.35417rem] font-semibold leading-[1.625rem]': {},
        },
        '.mb-body-14-r': {
          '@apply text-[0.72917rem] font-normal leading-normal': {},
        },
        '.pc-body-16-s': {
          '@apply text-[0.83333rem] font-semibold leading-[1.3] tracking-[-0.00833rem]': {},
        },
        '.pc-h1-64-s': {
          '@apply text-[3.33333rem] font-normal font-semibold leading-[1.2] tracking-[-0.06667rem]': {},
        },
        '.pc-body-20-r': {
          '@apply text-[1.04167rem] font-normal leading-normal tracking-[-0.00521rem]': {},
        },
        '.pc-body-18-r-primary': {
          '@apply text-[0.9375rem] font-normal leading-normal': {},
        },
        '.mb-h2-24-sm': {
          '@apply text-[1.25rem] font-semibold leading-[1.2]': {},
        },
        '.mb-28-number': {
          '@apply text-[1.45833rem] font-semibold leading-[1.2]': {},
        },
        '.mb-caption-12-12-r': {
          '@apply text-[0.625rem] font-normal leading-normal': {},
        },
      })
    }),
  ],
}
export default config

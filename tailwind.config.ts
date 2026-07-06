import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#EFF3F7', 
        surface: '#FFFFFF', 
        ink: {
          DEFAULT: '#15171F',
          soft: '#3A3D48',
        },
        muted: '#6B7280', 
        line: '#E2E4E9', 
        navy: {
          DEFAULT: '#233D46',
          soft: '#2C4A54',
        },
        signal: {
          DEFAULT: '#195A94', 
          hover: '#124572',
          soft: '#E4EEF6',
        },
        fog: '#DADADA', 
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        content: '1100px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(21, 23, 31, 0.04), 0 1px 1px rgba(21, 23, 31, 0.03)',
        cardHover: '0 8px 24px rgba(21, 23, 31, 0.08), 0 2px 6px rgba(21, 23, 31, 0.04)',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s infinite',
      },
    },
  },
  plugins: [],
}

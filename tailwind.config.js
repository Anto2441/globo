/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './features/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // ── Brand palette (blue dominant) ──────────────────────────
      colors: {
        brand: {
          50: '#E8F4FD',
          100: '#C5E3F9',
          200: '#8EC8F3',
          300: '#57ADEC',
          400: '#2B95E4',
          500: '#1A73E8',
          600: '#155CBB',
          700: '#10458D',
          800: '#0B2E5E',
          900: '#061730',
        },

        // ── Continent palettes ─────────────────────────────────
        africa: {
          light: '#FFF3E0',
          DEFAULT: '#FFB74D',
          dark: '#F57C00',
        },
        europe: {
          light: '#E3F2FD',
          DEFAULT: '#42A5F5',
          dark: '#1565C0',
        },
        northam: {
          light: '#FBE9E7',
          DEFAULT: '#FF7043',
          dark: '#D84315',
        },
        southam: {
          light: '#E8F5E9',
          DEFAULT: '#66BB6A',
          dark: '#2E7D32',
        },
        asia: {
          light: '#FFFDE7',
          DEFAULT: '#FFEE58',
          dark: '#F9A825',
        },
        oceania: {
          light: '#F3E5F5',
          DEFAULT: '#AB47BC',
          dark: '#7B1FA2',
        },
        antarctica: {
          light: '#FAFAFA',
          DEFAULT: '#E0E0E0',
          dark: '#9E9E9E',
        },
      },

      // ── Typography ──────────────────────────────────────────
      fontFamily: {
        fredoka: ['Fredoka_400Regular'],
        'fredoka-semibold': ['Fredoka_600SemiBold'],
        nunito: ['Nunito_400Regular'],
        'nunito-semibold': ['Nunito_600SemiBold'],
        'nunito-bold': ['Nunito_700Bold'],
      },

      fontSize: {
        xs: ['12', { lineHeight: '16' }],
        sm: ['14', { lineHeight: '20' }],
        base: ['16', { lineHeight: '24' }],
        lg: ['18', { lineHeight: '26' }],
        xl: ['22', { lineHeight: '30' }],
        '2xl': ['26', { lineHeight: '34' }],
        '3xl': ['32', { lineHeight: '40' }],
        '4xl': ['40', { lineHeight: '48' }],
        '5xl': ['52', { lineHeight: '60' }],
        '6xl': ['64', { lineHeight: '72' }],
      },

      // ── Spacing ─────────────────────────────────────────────
      spacing: {
        18: '72px',
        22: '88px',
        26: '104px',
        30: '120px',
      },

      // ── Border radius (playful, generous) ───────────────────
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
        '3xl': '28px',
        '4xl': '36px',
        bubble: '40px',
      },
    },
  },
  plugins: [],
}

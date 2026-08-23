/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Core surfaces
        canvas: '#F5F8FB',
        surface: '#FFFFFF',
        border: '#E3E9F2',
        // Text
        ink: '#0F1B34',
        'ink-soft': '#57678A',
        'ink-faint': '#8996B3',
        // Single accent: Adriatic teal (tourism / coastal / data-trust)
        accent: {
          DEFAULT: '#0C6E6B',
          soft: '#0C6E6B1A',
          light: '#12928D',
          dark: '#084F4D',
        },
        // Functional-only warm tone, used exclusively for demand-level semantics
        signal: {
          high: '#B4692B',
          mid: '#0C6E6B',
          low: '#57678A',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'sans-serif'],
        body: ['"Inter"', 'ui-sans-serif', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card: '18px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15, 27, 52, 0.04), 0 8px 24px -12px rgba(15, 27, 52, 0.10)',
        lift: '0 4px 8px rgba(15, 27, 52, 0.05), 0 16px 32px -16px rgba(15, 27, 52, 0.16)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        dashFlow: {
          '0%': { strokeDashoffset: '24' },
          '100%': { strokeDashoffset: '0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.5s ease-out both',
        dashFlow: 'dashFlow 1.2s linear infinite',
        pulseSoft: 'pulseSoft 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}


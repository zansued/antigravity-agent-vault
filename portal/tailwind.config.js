/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        celestial: {
          void: '#020617',
          gold: '#fbbf24',
          neon: '#22d3ee',
          magic: '#d946ef',
          rune: '#1e293b'
        }
      },
      animation: {
        'shimmer': 'shimmer 2.5s linear infinite',
        'border-beam': 'border-beam 4s ease-in-out infinite alternate',
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'border-beam': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.5, boxShadow: '0 0 15px rgba(34, 211, 238, 0.3)' },
          '50%': { opacity: 1, boxShadow: '0 0 25px rgba(34, 211, 238, 0.6)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

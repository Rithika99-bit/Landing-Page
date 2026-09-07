/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        med: {
          bg: '#F8FBFF',
          blue: '#2F80ED',
          'blue-soft': '#DCEEFF',
          'blue-light': '#F0F6FF',
          navy: '#0B2438',
          slate: '#4A6278',
          cyan: '#00C2CB',
          glass: 'rgba(255, 255, 255, 0.72)',
          'glass-border': 'rgba(255, 255, 255, 0.85)',
          'blue-border': 'rgba(47, 128, 237, 0.18)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        outfit: ['"Outfit"', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace'],
      },
      boxShadow: {
        'glass-subtle': '0 8px 32px 0 rgba(11, 36, 56, 0.05)',
        'glass-elevated': '0 16px 40px 0 rgba(47, 128, 237, 0.08), 0 4px 12px 0 rgba(11, 36, 56, 0.04)',
        'glass-glow': '0 20px 50px -10px rgba(47, 128, 237, 0.25)',
        '3d-board': '0 25px 60px -15px rgba(11, 36, 56, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.8)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-gentle': 'floatGentle 6s ease-in-out infinite',
        'doctor-breath': 'doctorBreath 5s ease-in-out infinite',
        'scan-line': 'scanLine 3s ease-in-out infinite',
      },
      keyframes: {
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        doctorBreath: {
          '0%, 100%': { transform: 'scale(1) translateY(0px)' },
          '50%': { transform: 'scale(1.012) translateY(-4px)' },
        },
        scanLine: {
          '0%': { top: '0%', opacity: 0 },
          '15%': { opacity: 0.8 },
          '85%': { opacity: 0.8 },
          '100%': { top: '100%', opacity: 0 },
        },
      }
    },
  },
  plugins: [],
}

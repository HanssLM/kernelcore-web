/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kernel: {
          bg: '#030712',
          surface: '#0B1120',
          card: '#0F172A',
          border: '#1E293B',
          cyan: '#06B6D4',
          cyanGlow: 'rgba(6, 182, 212, 0.25)',
          blue: '#3B82F6',
          green: '#10B981',
          emerald: '#10E7A6',
          text: '#F8FAFC',
          muted: '#94A3B8'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'cyan-glow': '0 0 25px rgba(6, 182, 212, 0.25)',
        'emerald-glow': '0 0 25px rgba(16, 231, 166, 0.25)',
      }
    },
  },
  plugins: [],
}

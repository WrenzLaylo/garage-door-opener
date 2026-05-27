/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        amber: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        slate: {
          50:  '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body:    ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'blue-glow':  '0 0 30px rgba(37,99,235,0.2)',
        'blue-glow-lg': '0 0 60px rgba(37,99,235,0.15)',
        'card':       '0 4px 24px rgba(15,23,42,0.08)',
        'card-hover': '0 12px 40px rgba(15,23,42,0.14)',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'float':   'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%':   { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

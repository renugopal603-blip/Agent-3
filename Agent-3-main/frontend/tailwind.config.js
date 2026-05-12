/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#047857', // Deep Emerald
          dark: '#10B981',  // Neon Emerald
        },
        secondary: {
          light: '#0F172A', // Royal Navy
          dark: '#020617',  // Midnight Navy
        },
        accent: {
          light: '#D4AF37', // Premium Gold
          dark: '#FACC15',  // Luxury Gold
        },
        background: {
          light: '#F8FAFC', // Soft Ivory
          dark: '#020617',  // Dark Navy
        },
        surface: {
          light: '#FFFFFF', // White
          dark: '#0F172A',  // Deep Slate
        },
        text: {
          primary: {
            light: '#111827', // Charcoal
            dark: '#F8FAFC',  // Soft White
          },
          secondary: {
            light: '#64748B', // Slate Gray
            dark: '#CBD5E1',  // Cool Gray
          }
        },
        border: {
          light: '#E2E8F0', // Light Slate
          dark: '#334155',  // Slate Border
        },
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444'
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
        'premium-dark': '0 10px 30px -10px rgba(16, 185, 129, 0.1)',
      }
    },
  },
  plugins: [],
}

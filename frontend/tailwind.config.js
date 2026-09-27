/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      direction: 'rtl',
      colors: {
        // Brand colors (from existing design)
        brand: '#FF6B35',
        'brand-dark': '#E55A2B',
        'brand-light': '#FFE8D6',
        
        // Custom colors from existing layout
        cream: '#FFF8F0',
        'warm-white': '#FFFAF5',
        ink: '#2D2D2D',
        muted: '#6B7280',
        subtle: '#9CA3AF',
        
        // Border colors
        border: '#E5E7EB',
        'border-light': '#F3F4F6',
        
        // Yellow accent
        yellow: '#FCD34D',
        
        // Primary brand colors
        primary: {
          50: '#FFF8F0',
          100: '#FFE8D6',
          200: '#FFD4AC',
          300: '#FFB87D',
          400: '#FF9653',
          500: '#FF6B35', // Main warm orange
          600: '#E55A2B',
          700: '#C44821',
          800: '#A03A1C',
          900: '#83301E',
        },
        // Secondary coral colors
        coral: {
          50: '#FFF5F0',
          100: '#FFE8E0',
          200: '#FFD4C4',
          300: '#FFB49C',
          400: '#FF8C69', // Soft coral
          500: '#FF6B35',
          600: '#E55A2B',
          700: '#C44821',
          800: '#A03A1C',
          900: '#83301E',
        },
        // Accent pink colors
        accent: {
          50: '#FFF5F5',
          100: '#FFE8E8',
          200: '#FFD4D4',
          300: '#FFB3B3',
          400: '#FF8C8C',
          500: '#FF6B6B',
          600: '#E55A5A',
          700: '#C44848',
          800: '#A03A3A',
          900: '#833030',
        },
        // Warm neutral backgrounds
        warm: {
          50: '#FFFAF5',
          100: '#FFF8F0', // Warm cream
          200: '#FFF0E0',
          300: '#FFE8D0',
          400: '#FFD8B8',
          500: '#FFC8A0',
          600: '#E8B090',
          700: '#D09880',
          800: '#B88070',
          900: '#A06860',
        },
        // Success colors
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#4CAF50',
          600: '#43A047',
          700: '#388E3C',
          800: '#2E7D32',
          900: '#1B5E20',
        },
        // Error colors
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#E57373', // Warm red
          600: '#EF5350',
          700: '#E53935',
          800: '#D32F2F',
          900: '#C62828',
        },
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.1)',
        'elevated': '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          950: '#2D1134',  // Darkest purple for background
          900: '#7D236F',  // Primary purple for navigation and buttons
          800: '#7D236F',  // Keeping consistent with primary
          700: '#8D347F',  // Slightly lighter for hover states
          600: '#9D458F'   // Even lighter for secondary elements
        }
      },
      boxShadow: {
        'card': '2px 2px 6px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
};
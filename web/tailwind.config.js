/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        'background-light': '#FFF8F0', 
        'background-dark': '#1E1B18', 
        // Surfaces / Cards / Sidebar
        'surface-light': '#FFE5B4', // card / sidebar / navbar light
        'surface-dark': '#3B3A36', // card / sidebar / navbar dark

        // Primary / Buttons
        'primary-light': '#FBBF24', //main buttons light
        'primary-dark': '#D97706', // main buttons dark
        'primary-hover-light': '#F59E0B',
        'primary-hover-dark': '#B45309',

        // Text
        'text-light': '#1F2937', // general text light
        'text-dark': '#F3F4F6', // general text dark
        'text-muted-light': '#6B7280', // secondary / muted light
        'text-muted-dark': '#9CA3AF', // secondary / muted dark

        // Alerts / Special Buttons
        'danger-light': '#EF4444',
        'danger-dark': '#B91C1C',

        // Cards highlights
        'highlight-light': '#FFEDD5',
        'highlight-dark': '#78350F',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        primary: {
          light: "#8B5CF6",
          dark: "#7C3AED",
          "hover-light": "#7C3AED",
          "hover-dark": "#6D28D9",
        },

        surface: {
          light: "#FFFFFF",
          dark: "#1F2937",
        },

        text: {
          light: "#111827",
          dark: "#F9FAFB",
          "muted-light": "#6B7280",
          "muted-dark": "#9CA3AF",
        },

        danger: {
          light: "#EF4444",
          dark: "#DC2626",
        },
      },
    },
  },

  plugins: [],
};
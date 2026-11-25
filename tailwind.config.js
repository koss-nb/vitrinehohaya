/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        hohaya: {
          blue: '#0000FF',
          darkBlue: '#0000B8',
          lightBlue: '#3B82F6',
          dark: '#0A0F1D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        blue: '0 14px 34px rgba(0, 0, 255, 0.24)',
        card: '0 12px 32px rgba(15, 23, 42, 0.07)',
      },
    },
  },
  plugins: [],
};


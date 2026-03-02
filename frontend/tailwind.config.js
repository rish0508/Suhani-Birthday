/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        handwritten: ['Gloria Hallelujah', 'cursive'],
      },
      colors: {
        background: '#0a0a0a',
        foreground: '#FDFBF7',
        primary: {
          DEFAULT: '#8B6914',
          foreground: '#FDFBF7',
        },
        secondary: {
          DEFAULT: '#A67C52',
          foreground: '#FDFBF7',
        },
        accent: {
          brown: '#5D4037',
          red: '#D32F2F',
        },
        card: {
          DEFAULT: '#141414',
          foreground: '#FDFBF7',
        },
        muted: {
          DEFAULT: '#2a2a2a',
          foreground: '#A67C52',
        },
        destructive: {
          DEFAULT: '#D32F2F',
          foreground: '#FFFFFF',
        },
        border: '#2a2a2a',
        input: '#2a2a2a',
        ring: '#8B6914',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

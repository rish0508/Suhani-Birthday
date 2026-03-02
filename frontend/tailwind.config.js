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
        background: '#FDFBF7',
        foreground: '#4A3B32',
        primary: {
          DEFAULT: '#5D4037',
          foreground: '#FDFBF7',
        },
        secondary: {
          DEFAULT: '#8D6E63',
          foreground: '#FDFBF7',
        },
        accent: {
          sage: '#8FA895',
          red: '#D32F2F',
          cream: '#F5F5DC',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#4A3B32',
        },
        muted: {
          DEFAULT: '#EFEBE9',
          foreground: '#8D6E63',
        },
        destructive: {
          DEFAULT: '#D32F2F',
          foreground: '#FFFFFF',
        },
        border: '#D7CCC8',
        input: '#D7CCC8',
        ring: '#5D4037',
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
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1) rotate(180deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        sparkle: 'sparkle 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

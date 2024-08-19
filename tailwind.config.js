/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        content: "var(--color-content)",
        accent: "var(--color-accent)",

        // Muted Colors
        muted: {
          content: "var(--color-content-muted)",
          accent: "var(--color-accent-muted)",
        },

        // Reversed Color
        reversed: {
          content: "var(--color-content-reversed)",
        },

        // Fill Colors...
        fill: {
          0: "var(--color-fill-0)",
          1: "var(--color-fill-1)",
          2: "var(--color-fill-2)",
        },
      },
      screens: {
        'xs': '440px'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0.1#674188 #C8A1E0 #E2BFD9 #F7EFE5' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    function ({ addUtilities }) {
      const scrollbarSm = {
        ".scrollbar-sm::-webkit-scrollbar": {
          width: '8px',
        },
        ".scrollbar-sm::-webkit-scrollbar-thumb": {
          background: '#ccc',
          borderRadius: '8px',
        },
        ".scrollbar-sm": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "8px",
        }
      }
      addUtilities(scrollbarSm)
    },

    function ({ addUtilities }) {
      const scrollbarNone = {
        ".scrollbar-none::-webkit-scrollbar": {
          display: 'none'
        },
        ".scrollbar-none::-webkit-scrollbar-thumb": {
          display: 'none'
        },
        ".scrollbar-none": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        }
      }
      addUtilities(scrollbarNone)
    },

  ],
};
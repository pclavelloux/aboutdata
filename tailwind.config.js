/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {

      animation: {
        text: 'text 3s ease infinite',
      },
      keyframes: {
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },

      spacing: {
        '90': '22rem',
        '110': '27rem',
        '180': '34rem',
      },

      typography: {
        DEFAULT: {
          css: {

            h2: {
              color: 'rgb(20 184 166)',
            },
            h3: {
              color: '#ffffff',
            },
            a: {
              color: 'rgb(20 184 166)',
            },
          },
        },
      }
    }

  },

  plugins: [require('@tailwindcss/typography')],

}

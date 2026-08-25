/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101820",
        steel: {
          50: "#EEF2F5",
          100: "#D9E1E7",
          400: "#5A7383",
          600: "#324454",
          700: "#233240",
          800: "#1A2530",
          900: "#101820",
        },
        paper: "#EDF1F3",
        gauge: {
          DEFAULT: "#2F6FE0",
          light: "#5C8FEA",
          dark: "#1F4FB0",
        },
        brass: {
          DEFAULT: "#DBA531",
          light: "#F5C452",
          dark: "#A87A22",
        },
        alert: {
          DEFAULT: "#D0472B",
          light: "#E37155",
        },
        ok: "#3C8F6B",
        line: "#D7DEE3",
      },
      fontFamily: {
        display: ["var(--font-geist-sans)", "sans-serif"],
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
}

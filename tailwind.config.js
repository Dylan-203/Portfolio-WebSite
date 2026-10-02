/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { paper: '#F2EFE6', ink: '#1C1B19', accent: '#1F4D3A', sage: '#C7D3BF', ochre: '#9A6B1F' },
      fontFamily: {
        display: ['Fraunces', '"Noto Serif SC"', 'serif'],
        sans: ['"Hanken Grotesk"', '"Noto Sans SC"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

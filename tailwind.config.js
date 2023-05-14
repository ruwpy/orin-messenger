/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mint: '#54FFC4',
        cotton: '#EAB1FF',
        midnight: '#171719'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.js",
    "./components/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'landing-page': "url('/woman_music.png')"
      },
      colors: {
        primary: '#860000',
        secondary: '#E92727',
        background: '#CF0E29'
      }
    },
  },
  plugins: [],
}

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
      }
    },
  },
  plugins: [],
}

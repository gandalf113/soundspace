/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SPOTIFY_CLIENT_ID: "2a96be4ecec8454f9fe769abd34d04d6",
    SPOTIFY_REDIRECT_URI: "http://localhost:3000"
  },
  images: {
    domains: ['i.scdn.co'],
  },
}

module.exports = nextConfig

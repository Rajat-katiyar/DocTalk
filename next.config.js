/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Only run ESLint on these directories during builds
    dirs: ['app', 'components'],
    // Ignore src directory during builds
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig

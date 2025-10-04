/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost', 'via.placeholder.com'],
  },
  env: {
    WOOCOMMERCE_URL: process.env.WOOCOMMERCE_URL || 'http://localhost:8080',
    WOOCOMMERCE_CONSUMER_KEY: process.env.WOOCOMMERCE_CONSUMER_KEY,
    WOOCOMMERCE_CONSUMER_SECRET: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  },
}

module.exports = nextConfig

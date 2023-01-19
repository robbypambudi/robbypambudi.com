/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  reactStrictMode: true,
  swcMinify: true,

  pageExtensions: ['page.tsx', 'api.ts'],
};

module.exports = nextConfig;

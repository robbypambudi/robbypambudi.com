/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'icons8.com',
      },
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
      },
    ],
  },

  reactStrictMode: true,
};

module.exports = nextConfig;

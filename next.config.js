/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  i18n: {
    locales: ['en-US', 'ua'],
    defaultLocale: 'en-US',
  },
  devIndicators: {
    buildActivity: false,
  },
  images: {
    domains: [
      'i.scdn.co',
      'api-major-labl.pixy.pro',
      'export-download.canva.com',
      'mosaic.scdn.co',
      'lh3.googleusercontent.com',
      'platform-lookaside.fbsbx.com',
      'e-cdns-images.dzcdn.net',
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;

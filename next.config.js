/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  images: {
    domains: ['https://api.sashimeomeo.com'],
  },
  env: {
    HOST_API: 'https://api.sashimeomeo.com',
  },
};

module.exports = nextConfig;

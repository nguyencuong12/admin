/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  images: {
    domains: [process.env.HOST_API],
  },
  env: {
    HOST_API: "https://api.sashimeomeo.com:5000",
  },
};

module.exports = nextConfig;
